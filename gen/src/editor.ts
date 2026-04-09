import { compressString, decompressString, getFormatTime } from "./lib/utils";
import "./editor.css";

import { javascript } from "@codemirror/lang-javascript";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { Vim, vim } from "@replit/codemirror-vim";

import Split from 'split.js'
Split(['#inputs', '#outputs'])

let editor: EditorView;
async function initEditor() {
  const editorWrapper = document.getElementById("editor-wrapper");

  const isVim = new URL(window.location.toString()).searchParams.get('v') === "1"

  const editorExtensions = [
    basicSetup,
    javascript(),
    EditorView.lineWrapping,
    keymap.of([
      // ...defaultKeymap,
      // ...historyKeymap,
      // ...searchKeymap,
      indentWithTab
    ]),
  ];

  if (isVim) {
    try {
      editorExtensions.push(vim());

      Vim.defineEx('write', 'w', saveData);
      Vim.defineEx('apply', 'a', runCode);
      Vim.defineEx('export', 'e', shareData);
    } catch (err) {
      log(err, "ERROR");
    }
  }

  editor = new EditorView({
    doc: "loading...",
    extensions: editorExtensions,
    parent: editorWrapper,
  });

  let code = ""
  try {
    code = decodeURIComponent(await decompressString(new URL(window.location.toString()).searchParams.get("c")));
  } catch(err) {
    log(err, "ERROR");
    code = `const board = JXG.JSXGraph.initBoard(
  BOX_ID,
  {
    boundingbox: [-4, 4, 4, -4],
    axis: true,
    showCopyright: false,
  }
);

`;
  }

  setEditorContent(code);
}

const applyBtn = document.getElementById("apply-btn");
const saveBtn = document.getElementById("save-btn");
const shareBtn = document.getElementById("share-btn");
const helpBtn = document.getElementById("help-btn");
const dialog = document.getElementById("dialog") as HTMLDialogElement;
const logsElement = document.getElementById("logs");

document.addEventListener("DOMContentLoaded", async () => {
  await initEditor();

  runCode();
});

function setEditorContent(content: string) {
  editor.dispatch({ changes: { 
    from: 0,
    to: editor.state.doc.length, 
    insert: content,
  }});
}

applyBtn.addEventListener("click", runCode);
saveBtn.addEventListener("click", saveData);
shareBtn.addEventListener("click", shareData);
helpBtn.addEventListener("click", ()=>dialog.showModal());

async function shareData() {
  const data = await compressString(editor.state.doc.toString());
  const url = new URL(window.location.toString());
  const newUrl = `${url.origin}/gen/index.html?c=${encodeURIComponent(data)}`
  navigator.clipboard.writeText(newUrl);
  log(`Sharable URL copied to clipboard: <a href="${newUrl}" target="_blank">${newUrl.slice(0, 60)}${newUrl.length > 60 ? "..." : ""}</a>`);
}

async function saveData() {
  const url = new URL(window.location.toString());
  const params = url.searchParams;
  const data = await compressString(editor.state.doc.toString());
  params.set("c", encodeURIComponent(data));
  window.history.pushState({}, "", url);
}

function runCode() {
  try {
    log("Running code...", "INFO");
    new Function('const BOX_ID = "jxgbox"; ' + editor.state.doc.toString())();
  } catch (err) {
    log(err, "ERROR");
  }
}

function log(content: string, logType: string = "INFO") {
  const colors = {
    "ERROR": "red",
    "INFO": "green",
  };
  logsElement.innerHTML += `${getFormatTime(new Date())} ${logType}: <span style="color:${colors[logType] ?? logType};">${content}</span><br>`;
  logsElement.scrollTo({
    top: logsElement.scrollHeight,
    behavior: 'smooth'
  });
}
