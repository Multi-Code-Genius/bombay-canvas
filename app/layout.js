import ProviderLayout from "/lib/ProviderLayout";
import StyledComponentsRegistry from "/lib/StyledComponentsRegistry";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <ProviderLayout>{children}</ProviderLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
