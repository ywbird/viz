import { decodeBase64UTF8, encodeBase64UTF8, compressString, decompressString } from "./utils.js";

const applyBtn = document.getElementById("apply-btn");
const saveBtn = document.getElementById("save-btn");
const code = document.getElementById("code");
const error = document.getElementById("error");

const BOX_ID = "jxgbox";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    code.value = await decompressString(new URL(window.location).searchParams.get("c"));
  } catch {
    code.value = `
const board = JXG.JSXGraph.initBoard(
  'jxgbox',
  {
    boundingbox: [-4, 4, 4, -4],
    axis: true,
    showCopyright: false,
  }
);
  `;
  }

  runCode();
});


applyBtn.addEventListener("click", ()=>{
  runCode();
});

saveBtn.addEventListener("click", async ()=>{
  const url = new URL(window.location);
  const params = url.searchParams;
  params.set("c", await compressString(code.value));
  window.history.pushState({}, "", url);
});

function runCode() {
  try {
    new Function(code.value)();
  } catch (err) {
    error.innerText = err;
  }
}
