
import { FrameMetadata } from "@coinbase/onchainkit/frame";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {

  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon.png"></link>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta property="og:title" content="Onchain Kit Test" />
        <meta property="og:description" content="Testing onchain kit" />
        <meta property="og:image" content="/images/lockup.webp" />
        <meta property="og:url" content="https://basetokenstore.com" />
        <FrameMetadata
          buttons={[
          {
            label: 'Tell me the story',
          },
          {
            action: 'link',
            label: 'Link to Google',
            target: 'https://www.google.com'
          },
          {
            action: 'post_redirect',
            label: 'Redirect to cute pictures',
          },
        ]}
        image={{
          src: 'https://images.pexels.com/photos/1564506/pexels-photo-1564506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          aspectRatio: '1:1'
        }}
        input={{
          text: 'Tell me a boat story',
        }}
        state={{
          counter: 1,
        }}
        postUrl="https://zizzamia.xyz/api/frame"
        />
      </Head>
      <body className="font-brand">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}