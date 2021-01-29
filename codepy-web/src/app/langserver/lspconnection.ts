// // import { listen, MessageConnection } from "vscode-ws-jsonrpc";
// import { listen } from '@codingame/monaco-jsonrpc';
// import { MessageConnection } from 'vscode-jsonrpc';
// import {
//     MonacoLanguageClient,
//     CloseAction,
//     ErrorAction,
//     MonacoServices,
//     createConnection
// } from "monaco-languageclient";
// const ReconnectingWebSocket = require("reconnecting-websocket")
// // import ReconnectingWebSocket from "reconnecting-websocket";
// const normalizeUrl = require("normalize-url")
// // import * as normalizeUrl from "normalize-url";

// export class LSPConnection {

//     constructor() {
//         this.initEditor();
//     }

//     private initEditor() {
//         // 注册语言
//         monaco.languages.register({
//             id: "python",
//             extensions: [".py", ".pyc", ".pyw", "pyo", "pyd"],
//             aliases: ["python", "py"]
//         })
//     }

//     public createEditor(editorElement: HTMLElement, value: string): monaco.editor.IStandaloneCodeEditor {
//         const editor = monaco.editor.create(editorElement, {
//             model: monaco.editor.createModel(
//                 value,
//                 "python",
//                 monaco.Uri.parse("inmemory://model.py")
//             ),
//             glyphMargin: true,
//             lightbulb: {
//                 enabled: true
//             }
//         })
//         // install Monaco language client services
//         MonacoServices.install(editor)
//         return editor;
//     }

//     public connect(editor: monaco.editor.IStandaloneCodeEditor) {
//         // create the web socket
//         const url = this.createUrl("/python");
//         const webSocket = this.createWebSocket(url);
//         // listen when the web socket is opened
//         listen({
//             webSocket,
//             onConnection: connection => {
//                 // create and start the language client
//                 const languageClient = this.createLanguageClient(connection)
//                 const disposable = languageClient.start()
//                 connection.onClose(() => disposable.dispose())
//             }
//         });


//         window.addEventListener("message", function (event: MessageEvent) {
//             if (event.data === "UPDATE-CODE") {
//                 parent.postMessage(editor.getModel().getValue(), "*")
//             }
//             if (event.data === "INIT-AUTOSAVE") {
//                 setInterval(function () {
//                     parent.postMessage(editor.getModel().getValue(), "*")
//                 }, 5000);
//             }
//             if (event.data === "STOP-AUTOSAVE") {
//                 clearInterval();
//             }
//         })


//     }

//     private createUrl(path: string): string {
//         const protocol = location.protocol === "https:" ? "wss" : "ws";
//         return normalizeUrl(`${protocol}://localhost:4201${location.pathname}${path}`);
//     }

//     private createWebSocket(url: string): WebSocket {
//         const socketOptions = {
//             maxReconnectionDelay: 10000,
//             minReconnectionDelay: 1000,
//             reconnectionDelayGrowFactor: 1.3,
//             connectionTimeout: 10000,
//             maxRetries: Infinity,
//             debug: false
//         };
//         return new ReconnectingWebSocket(url, undefined, socketOptions);
//     }


//     private createLanguageClient(connection: MessageConnection): MonacoLanguageClient {
//         return new MonacoLanguageClient({
//             name: "Python Language Client",
//             clientOptions: {
//                 // use a language id as a document selector
//                 documentSelector: ["python"],
//                 // disable the default error handler
//                 errorHandler: {
//                     error: () => ErrorAction.Continue,
//                     closed: () => CloseAction.DoNotRestart
//                 }
//             },
//             // create a language client connection from the JSON RPC connection on demand
//             connectionProvider: {
//                 get: (errorHandler, closeHandler) => {
//                     return Promise.resolve(
//                         createConnection(connection, errorHandler, closeHandler)
//                     )
//                 }
//             }
//         })
//     }


// //     public disConnect() {

// //     }
//  }

