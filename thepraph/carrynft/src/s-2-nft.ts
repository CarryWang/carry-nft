import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Transfer as TransferEvent,
  S2NFT,
} from "../generated/S2NFT/S2NFT";
import {
  Approval,
  ApprovalForAll,
  Transfer,
  TokenInfo,
} from "../generated/schema";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  updateTokenInfo(event);
}

export function updateTokenInfo(event: TransferEvent): void {
  const id = `${event.address.toHexString()}#${event.params.tokenId.toHexString()}`;
  let tokenInfo = TokenInfo.load(id);

  if (!tokenInfo) {
    tokenInfo = new TokenInfo(id);

    const contract = S2NFT.bind(event.address);

    tokenInfo.name = contract.name();
    tokenInfo.tokenURL = contract.tokenURI(event.params.tokenId);
    tokenInfo.tokenId = event.params.tokenId;
    tokenInfo.ca = event.address;
  }

  tokenInfo.owner = event.params.to;
  tokenInfo.blockNumber = event.block.number;
  tokenInfo.blockTimestamp = event.block.timestamp;
  tokenInfo.transactionHash = event.transaction.hash;
  tokenInfo.save();
}
