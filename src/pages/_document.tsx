
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {

  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon.png"></link>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta property="og:title" content="Color Punks" />
        <meta property="og:description" content="1,000 unique ColorPunks brought to life with Base Colors." />
        <meta property="og:image" content="/images/og.jpg" />
        <meta property="og:url" content="https://colorpunks.com" />
      </Head>
      <body className="font-brand">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}