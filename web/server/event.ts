import { createPublicClient, http, parseAbi, parseAbiItem } from "viem";
import { mainnet } from "viem/chains";

const abi = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
]);

const client = createPublicClient({
  chain: mainnet,
  transport: http(
    "https://rpc.particle.network/evm-chain?chainId=1&projectUuid=c8036f73-ee6d-4dd8-8ecd-e8009fe07ab4&projectKey=clwo7Hyz4sVTSw5BWz5jYzkYxt5VrqzSOEpWq3br"
  ),
});

async function main() {
  const blockNumber = await client.getBlockNumber();
  console.log(blockNumber);

  const filter = await client.createEventFilter({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    event: parseAbiItem(
      "event Transfer(address indexed from, address indexed to, uint256 value)"
    ),
    fromBlock: BigInt(Number(blockNumber) - 100),
    toBlock: BigInt(blockNumber),
  });

  const logs = await client.getFilterLogs({ filter });

  logs.forEach((log) => {
    console.log(
      `从${log.args.from}转账给${log.args.to} ${
        log.args.value! / BigInt(1e6)
      }USDC, https://etherscan.io/tx/${log.transactionHash}`
    );
  });
}

main().catch((err) => {
  console.log(err);
});
