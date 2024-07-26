
import { FrameMetadata } from "@coinbase/onchainkit/frame";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {

  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon.png"></link>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta property="og:title" content="Colo Punks" />
        <meta property="og:description" content="1,000 unique ColorPunks brought to life with Base Colors." />
        <meta property="og:image" content="/images/og.jpeg" />
        <meta property="og:url" content="https://colorpunks.com" />
        <FrameMetadata
          buttons={[
          {
            action: 'link',
            label: 'Visit',
            target: 'https://colorpunks.com'
          },
        ]}
        image={{
          src: 'https://images.pexels.com/photos/1564506/pexels-photo-1564506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          aspectRatio: '1:1'
        }}
        />
      </Head>
      <body className="font-brand">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}