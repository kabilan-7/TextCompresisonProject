import React, { useState } from 'react';
import HuffmanCoder from './huffman'
import './App.css'
function App() {
  const [text,setText]=useState('');
  const [encodedText,setEncodedText]=useState('')
  const [decodedText,setDecodedText]=useState('')
  const [compressionRatio,setCompressionRatio]=useState('')
  const handleCompress = ()=>{
    const coder=new HuffmanCoder(text)
    const encoded=coder.encode(text)
    const decoded=coder.decode(encoded)
    const ratio=calculateCompressionRatio(text,encoded)
    setEncodedText(encoded)
    setDecodedText(decoded)
    setCompressionRatio(`${ratio.toFixed(2)}%`)
  }
  const calculateCompressionRatio = (originalText, encodedText) => {
    const originalSize = originalText.length * 8; // assuming ASCII
    const compressedSize = encodedText.length;
    return ((originalSize - compressedSize) / originalSize) * 100;
  };
  return(
    <div className="App">
    <header>
      <h1>Text Compression Using Huffman Coding Algorithm</h1>
    </header>
    <main>
      <section >
        <textarea
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
        />
        <button onClick={handleCompress}>Compress</button>
      </section>
      <section>
        <h3>Encoded Text</h3>
        <textarea
          rows="5"
          value={encodedText}
          readOnly
          placeholder="Encoded text will appear here..."
        />
      </section>
      <section>
        <h3>Decoded Text</h3>
        <textarea
          rows="5"
          value={decodedText}
          readOnly
          placeholder="Decoded text will appear here..."
        />
      </section>
      <section>
        <h3>Compression Ratio</h3>
        <p>{compressionRatio}</p>
      </section>
    </main>
    
  </div>
  )
}

export default App;

