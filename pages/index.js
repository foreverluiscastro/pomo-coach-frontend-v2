import { Inter } from "next/font/google";
import Timer from "@/components/core/Timer";
import { Page } from "@/components/core/Page";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Page>
      <Timer />
    </Page>
  );
}
