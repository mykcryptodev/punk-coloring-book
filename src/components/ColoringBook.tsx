import React, { useRef, useState, useEffect, type MouseEvent, type FC } from 'react';
import { createThirdwebClient } from 'thirdweb';
import { useAccount } from 'wagmi';
import { signMessage } from '@wagmi/core';
import { env } from '~/env';
import { type NFT } from '~/types/simplehash';
import { upload } from "thirdweb/storage";
import { api } from '~/utils/api';
import { config } from '~/config/wagmi';

type Props = {
  color: string | null;
  punk: NFT | null;
  onPunkColored: (punk: NFT) => void;
}

const ColoringBook: FC<Props> = ({ color, punk, onPunkColored }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setImage] = useState<HTMLImageElement | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);
  const account = useAccount();
  const { mutateAsync: updateMetadata } = api.nft.updateMetadata.useMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = punk?.image_url ?? '/select.png'; // Replace with your image path
    img.onload = () => {
      setImage(img);
      context.imageSmoothingEnabled = false;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      // Save the initial state
      setHistory([context.getImageData(0, 0, canvas.width, canvas.height)]);
    };
  }, [punk?.image_url]);

  const fillArea = (x: number, y: number, fillColor: Uint8ClampedArray) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const targetColor = getColorAtPixel(data, x, y);

    if (!colorsMatch(targetColor, fillColor)) {
      // Save the current state before making changes
      setHistory((prevHistory) => [...prevHistory, imageData]);
      floodFill(data, x, y, targetColor, fillColor, canvas.width, canvas.height);
      context.putImageData(imageData, 0, 0);
    }
  };

  const getColorAtPixel = (data: Uint8ClampedArray, x: number, y: number) => {
    const index = (y * canvasRef.current!.width + x) * 4;
    return data.slice(index, index + 4);
  };

  const colorsMatch = (color1: Uint8ClampedArray, color2: Uint8ClampedArray) => {
    return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
  };

  const floodFill = (
    data: Uint8ClampedArray,
    x: number,
    y: number,
    targetColor: Uint8ClampedArray,
    fillColor: Uint8ClampedArray,
    width: number,
    height: number
  ) => {
    const stack = [[x, y]];

    while (stack.length > 0) {
      const [currentX, currentY] = stack.pop()!;
      if (!currentX || !currentY) continue;
      const currentIndex = (currentY * width + currentX) * 4;
      if (colorsMatch(data.slice(currentIndex, currentIndex + 4), targetColor)) {
        data[currentIndex] = fillColor[0] ?? 0;
        data[currentIndex + 1] = fillColor[1] ?? 0;
        data[currentIndex + 2] = fillColor[2] ?? 0;
        data[currentIndex + 3] = fillColor[3] ?? 0;

        if (currentX + 1 < width) stack.push([currentX + 1, currentY]);
        if (currentX - 1 >= 0) stack.push([currentX - 1, currentY]);
        if (currentY + 1 < height) stack.push([currentX, currentY + 1]);
        if (currentY - 1 >= 0) stack.push([currentX, currentY - 1]);
      }
    }
  };

  const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const fillColor = hexToRgba(color ?? '#000000');
    fillArea(Math.floor(x), Math.floor(y), fillColor);
  };

  const hexToRgba = (hex: string): Uint8ClampedArray => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return new Uint8ClampedArray([r, g, b, 255]);
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      const lastImageData = newHistory[newHistory.length - 1];
      if (lastImageData) {
        context.putImageData(lastImageData, 0, 0);
      }
    }
  }

  const dataURLtoBlob = (dataurl: string) => {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0]?.match(/:(.*?);/);
    if (!mimeMatch || !arr[1]) {
      throw new Error('Invalid data URL');
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1] ?? '');
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleUpdateMetadata = async () => {
    if (!account?.address || !punk) return;
    const client = createThirdwebClient({
      clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    });
    const image = canvasRef.current?.toDataURL('image/png');
    if (!image) return;
    const imageBlob = dataURLtoBlob(image);
    let imageUri = '';
    try {
      setIsLoading(true);
      imageUri = await upload({
        client,
        files: [new File([imageBlob], 'image.png')],
      });
      const message = `Update token id ${punk.token_id} image to ${imageUri}`;
      const signedMessage = await signMessage(config, {
        account: account.address,
        message,
      });
      await updateMetadata({
        nftOwner: account?.address ?? '',
        imageUri,
        tokenId: punk?.token_id ?? '',
        signedMessage,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      onPunkColored({
        ...punk,
        image_url: imageUri,
      });
    }
  }

  return (
    <div className="mt-8 flex flex-col justify-center">
      {punk && (
        <button onClick={handleUndo} className="flex items-center gap-2 px-4 my-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          Undo
        </button>
      )}
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        onClick={handleCanvasClick}
        className="cursor-crosshair border-2 border-black"
      />
      <div className="text-center mt-1">{punk?.name}</div>
      {punk ? (
        <button 
          className="mt-4 flex items-center gap-2 justify-center w-full px-4 py-2 bg-primary rounded text-inverse hover:bg-primary-hover active:bg-primary-active disabled:opacity-50" 
          onClick={handleUpdateMetadata}
          disabled={isLoading}
        >
          {isLoading && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 animate-spin">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          )}
          Save
        </button>
      ) : (
        <span className="text-center text-xs mt-2">Click on one of your Punks above or get a punk to color it!</span>
      )}
    </div>
  )
};
export default ColoringBook;
