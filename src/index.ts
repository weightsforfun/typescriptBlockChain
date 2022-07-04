import crypto from "crypto";
interface BlockShape {
  height: number;
  hash: string;
  prevHash: string;
  data: string;
}
class Block implements BlockShape {
  public hash: string;
  constructor(
    public height: number,
    public data: string,
    public prevHash: string
  ) {
    this.hash = Block.makeHash(this.height, this.prevHash, this.data);
  }
  static makeHash(height: number, data: string, prevHash: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const block = new Block(this.blocks.length + 1, data, this.getPrevHash());
    this.blocks[this.blocks.length] = block;
  }
  public getBlocks() {
    return [...this.blocks];
  }
}
const blockChain = new BlockChain();
blockChain.addBlock("first");
blockChain.addBlock("seconde");
blockChain.addBlock("third");
console.log(blockChain.getBlocks());
