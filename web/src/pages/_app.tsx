"use client";

import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { WagmiProvider } from "wagmi";

// import { wagmiConfig } from "@/config/wagmi-config";
import { config, projectId } from "@/config";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
