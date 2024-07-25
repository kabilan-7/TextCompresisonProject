// src/HuffmanCoding.js

class HuffmanCoder {
    constructor(feeder) {
      this.encoder = new Map();
      this.decoder = new Map();
      this.buildHuffmanTree(feeder);
    }
  
    buildHuffmanTree(feeder) {
      const fmap = new Map();
      for (let char of feeder) {
        fmap.set(char, (fmap.get(char) || 0) + 1);
      }
  
      const minHeap = [...fmap.entries()].map(([char, freq]) => ({ char, freq }));
      minHeap.sort((a, b) => a.freq - b.freq);
  
      while (minHeap.length > 1) {
        const first = minHeap.shift();
        const second = minHeap.shift();
        const newNode = { char: null, freq: first.freq + second.freq, left: first, right: second };
        let i = 0;
        while (i < minHeap.length && minHeap[i].freq < newNode.freq) {
          i++;
        }
        minHeap.splice(i, 0, newNode);
      }
  
      this.initEncoderDecoder(minHeap[0], "");
    }
  
    initEncoderDecoder(node, output) {
      if (!node) return;
      if (!node.left && !node.right) {
        this.encoder.set(node.char, output);
        this.decoder.set(output, node.char);
      }
      this.initEncoderDecoder(node.left, output + "0");
      this.initEncoderDecoder(node.right, output + "1");
    }
  
    encode(source) {
      return source.split("").map(char => this.encoder.get(char)).join("");
    }
  
    decode(codedString) {
      let key = "";
      const ans = [];
      for (let i = 0; i < codedString.length; i++) {
        key += codedString[i];
        if (this.decoder.has(key)) {
          ans.push(this.decoder.get(key));
          key = "";
        }
      }
      return ans.join("");
    }
  }
  
  export default HuffmanCoder;
  