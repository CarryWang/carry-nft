import { http, createConfig } from "wagmi";
import { base, mainnet, optimism, sepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, base],
  connectors: [
    injected(),
    walletConnect({ projectId: projectId! }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
  },
});
