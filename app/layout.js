import Header from "imports/core/ui/atoms/Header";
import ProviderLayout from "/lib/ProviderLayout";
import StyledComponentsRegistry from "/lib/StyledComponentsRegistry";
import Shadow from "imports/core/ui/atoms/Shadow";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <ProviderLayout>
            <Header />
            {children}
          </ProviderLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
