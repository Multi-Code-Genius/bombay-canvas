import Shadow from "imports/core/ui/atoms/Shadow";
import ProviderLayout from "/lib/ProviderLayout";
import StyledComponentsRegistry from "/lib/StyledComponentsRegistry";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="./fonts/HelveticaNowDisplay-Light.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="./fonts/HelveticaNowDisplay-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="./fonts/HelveticaNowDisplay-Medium.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="./fonts/HelveticaNowDisplay-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="./fonts/HelveticaNowDisplay-ExtraBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <ProviderLayout>
            <Shadow />

            {children}
          </ProviderLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
