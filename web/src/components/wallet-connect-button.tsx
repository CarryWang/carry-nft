export default function WalletConnectButton() {
  return (
    <div className="flex gap-x-2">
      <div>
        <w3m-network-button />
      </div>
      <div>
        <w3m-button />
      </div>
    </div>
  );
}
