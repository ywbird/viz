const BASE64_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
  * @param {string} str
  * @return {string}
  */
export function encodeBase64UTF8(str) {
  // Encode bytes
  const bytes = new TextEncoder().encode(str);
  // Concat bytes creating whole bigint
  const binary = Array.from(bytes).map(c=>(c >>> 0).toString(2).padStart(8,"0")).join("");

  let result = ""
  for (let i=0; i<binary.length; i+=6) {
    result += BASE64_CHARSET[parseInt(binary.slice(i,i+6).padEnd(6,"0"), 2)];
  }

  result += "=".repeat((4 - result.length % 4)%4);
  
  return result;
}

/**
  * @param {string} str
  * @return {string | boolean}
  */
export function decodeBase64UTF8(str) {
  const neededPadding = (4 - str.length % 4)%4;
  str += "=".repeat(neededPadding);

  let padding = 0;
  for (;str[str.length-1-padding] === "=";padding++) {}
  if (padding !== 0) str = str.slice(0,-padding);

  let binary = "";
  for (const chr of str.split("")) {
    const i = BASE64_CHARSET.indexOf(chr);

    // if (i == -1) return false;
    if (i == -1) continue;

    binary += i.toString(2).padStart(6,"0");
  }

  if (padding !== 0) binary = binary.slice(0,-padding*2);

  const bytes = [];
  for (let i=0; i<binary.length; i+=8) {
    bytes.push(parseInt(binary.slice(i,i+8), 2));
  }

  return new TextDecoder().decode(new Uint8Array(bytes));
}

/* ==========================================================================*/

export async function compressString(text) {
  const stream = new Blob([text]).stream();
  const compressedStream = stream.pipeThrough(new CompressionStream('gzip'));
  const chunks = [];
  for await (const chunk of compressedStream) {
    chunks.push(chunk);
  }
  const compressedBlob = new Blob(chunks);
  const arrayBuffer = await compressedBlob.arrayBuffer();
  
  // Convert to Base64 to keep it as "text"
  return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
}

export async function decompressString(base64Text) {
  const bytes = Uint8Array.from(atob(base64Text), c => c.charCodeAt(0));
  const stream = new Blob([bytes]).stream();
  const decompressedStream = stream.pipeThrough(new DecompressionStream('gzip'));
  const chunks = [];
  for await (const chunk of decompressedStream) {
    chunks.push(chunk);
  }
  const decompressedBlob = new Blob(chunks);
  return await decompressedBlob.text();
}

/* ==========================================================================*/

export function getFormatTime(date: Date): string {
    const hh = date.getHours(); // 시간
    const h = hh >= 10 ? hh : '0' + hh ;
    const mm = date.getMinutes(); // 분
    const m = mm >= 10 ? mm : '0' + mm ;
    const ss = date.getSeconds(); // 초
    const s = ss >= 10 ? ss : '0' + ss ;
    return `${h}:${m}:${s}`;
}
