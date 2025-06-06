import SearchModal from "@/components/SearchModal";
import config from "@/config/config.json";
import theme from "@/config/theme.json";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import "@/styles/main.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  return (
    <html suppressHydrationWarning={true} lang="pt-br">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        <link rel="shortcut icon" href={config.site.favicon} />
        <meta name="theme-name" content="Academia do Conhecimento" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning={true}>
        <Providers>
          <Header />
          <SearchModal />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
