import { decompressString } from "./lib/utils";
import "./index.css";

const editBtn = document.getElementById("edit-btn");
const code = document.getElementById("code");
const error = document.getElementById("error");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    code.innerText = decodeURIComponent(await decompressString(new URL(window.location.toString()).searchParams.get("c")));
  } catch(err) {
    code.innerText = err;
  }

  runCode();
});


editBtn.addEventListener("click", async ()=>{
  const url = new URL(window.location.toString());
  const params = url.searchParams;
  const data = params.get("c");

  const newUrl = `${url.origin}/gen/editor/index.html?c=${data}`;
  window.open(newUrl, "_blank");
});

async function runCode() {
  try {
    const data = decodeURIComponent(await decompressString(new URL(window.location.toString()).searchParams.get("c")));
    new Function('const BOX_ID = "jxgbox"; ' + data)();
  } catch (err) {
    error.innerText = err;
  }
}
