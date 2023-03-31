import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* <script src="https://www.bing.com/api/maps/mapcontrol?key=AqZRa0FXlQBCUTxt0faLA6w9bfzdLnT5_HvyPiRVGKJzNyKhn37rD8_jpppGJ6mU"  async></script> */}
        <script type='text/javascript' src='https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AqZRa0FXlQBCUTxt0faLA6w9bfzdLnT5_HvyPiRVGKJzNyKhn37rD8_jpppGJ6mU' async defer></script>
      </body>
    </Html>
  )
}
