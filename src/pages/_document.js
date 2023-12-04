import { Html, Head, Main, NextScript } from "next/document";
import images from "@/assets/images";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/next.svg" type="image/svg+xml" />
      </Head>
      <body className="mg-0">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
