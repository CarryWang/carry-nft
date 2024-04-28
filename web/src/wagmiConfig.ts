import { http, createConfig } from "wagmi";
import { base, mainnet, optimism, sepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

export const projectId = "40d5aa2363a8d574f9ab09635df7ac75";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, base],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
  },
});
