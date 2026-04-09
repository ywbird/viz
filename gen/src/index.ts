import { decompressString } from "./lib/utils";
import "./index.css";

const box = document.getElementById("jxgbox");
const editBtn = document.getElementById("edit-btn");
const code = document.getElementById("code");
const error = document.getElementById("error");

document.addEventListener("DOMContentLoaded", async () => {

  const s = new URL(window.location.toString()).searchParams

  try {
    code.innerText = decodeURIComponent(await decompressString(s.get("c")));
  } catch(err) {
    code.innerText = err;
  }

  try {
    if (s.get("e") === "1") {
      document.body.classList.add("embed");
    }
    const width = s.get("w");
    if (width !== undefined)
      jxgbox.style.width = `${width}px`;

    const height = s.get("h");
    if (height !== undefined) {
      jxgbox.style.height = `${height}px`;
      jxgbox.style.aspectRatio = `unset`;
    }
  } catch (err) {
    code.innerText = err;
  }

  runCode();
});


editBtn.addEventListener("click", () => {
  const url = new URL(window.location.href);
  const data = url.searchParams.get("c"); // 여기서 이미 브라우저가 공백 처리를 했을 수 있음

  if (!data) return;

  // 새 URL 생성
  const newTarget = new URL(`${window.location.origin}/gen/editor/index.html`);
  
  // set 메서드를 사용하면 'data' 내의 +, /, = 기호가 
  // URL 안전 형태(%2B, %2F, %3D)로 자동 인코딩됩니다.
  newTarget.searchParams.set("c", data);

  window.open(newTarget.toString(), "_blank");
});

async function runCode() {
  try {
    const data = decodeURIComponent(await decompressString(new URL(window.location.toString()).searchParams.get("c")));
    new Function('const BOX_ID = "jxgbox"; ' + data)();
  } catch (err) {
    error.innerText = err;
  }
}
