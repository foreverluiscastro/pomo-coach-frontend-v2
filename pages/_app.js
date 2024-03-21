import { AppProvider } from "@/components/providers/AppProvider";
import { Layout } from "@/components/core/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
