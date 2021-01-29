import { Component, OnInit } from '@angular/core';
import { FileHandleEvent, FileHandleType } from '../file-tree/filehandler';
// import { LSPConnection } from '../../langserver/lspconnection';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"

import { listen } from 'vscode-ws-jsonrpc';

// import { listen } from '@codingame/monaco-jsonrpc';
import { MessageConnection } from 'vscode-jsonrpc';
import {
  MonacoLanguageClient,
  CloseAction,
  ErrorAction,
  MonacoServices,
  createConnection
} from "monaco-languageclient";

const ReconnectingWebSocket = require('reconnecting-websocket');

import { editor } from 'monaco-editor';
// declare const monaco: any;

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.scss']
})
export class FileEditorComponent implements OnInit {

  index = 0;
  tabs = [];
  // lspConnection: LSPConnection;
  editor;

  constructor() { }

  ngOnInit(): void {
    // this.lspConnection = new LSPConnection();
  }

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  onEditorInit(e: editor.ICodeEditor | editor.IEditor): void {
    this.editor = e;
    // const content = this.tabs[this.index].content;
    // this.editor.setModel(monaco.editor.createModel(content, 'python', monaco.Uri.parse("inmemory://model.py")));
    MonacoServices.install(this.editor);
    const url = this.createUrl();
    const webSocket = this.createWebSocket(url);
    listen({
      webSocket,
      onConnection: (connection: MessageConnection) => {
        const languageClient = this.createLanguageClient(connection);
        const disposable = languageClient.start();
        connection.onClose(() => disposable.dispose());
      }
    });
  }

  public createUrl(): string {
      return 'ws://localhost:4201/python';
  }

  public createLanguageClient(connection: MessageConnection): MonacoLanguageClient {
    return new MonacoLanguageClient({
      name: `pythong Client`,
      clientOptions: {
      
        documentSelector: ['python'],
       
        errorHandler: {
          error: () => ErrorAction.Continue,
          closed: () => CloseAction.DoNotRestart
        }
      },
     
      connectionProvider: {
        get: (errorHandler, closeHandler) => {
          return Promise.resolve(createConnection(<any>connection, errorHandler, closeHandler));
        }
      }
    });
  }

  public createWebSocket(socketUrl: string): WebSocket {
    const socketOptions = {
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000,
      reconnectionDelayGrowFactor: 1.3,
      connectionTimeout: 10000,
      maxRetries: Infinity,
      debug: false
    };
    return new ReconnectingWebSocket.default(socketUrl, [], socketOptions);    
  }

  handleTab(event: FileHandleEvent): void {
    if (event.type === FileHandleType.Open) {
      const some = this.tabs.some(tab => tab.fileName === event.fileName);
      if (some) {

      } else {
        this.tabs.push({
          name: event.fileName,
          content: event.content
        });
        this.index = this.tabs.length - 1;


        // const editor = monaco.editor.create(document.getElementById(event.fileName), {
        //   model: monaco.editor.createModel(
        //     event.content,
        //     "python",
        //     monaco.Uri.parse("inmemory://model.py")
        //   ),
        //   glyphMargin: true,
        //   lightbulb: {
        //     enabled: true
        //   }
        // })

        // const editor = this.lspConnection.createEditor(document.getElementById("container")! , event.content);
        // this.lspConnection.connect(editor);
      }
    }
  }

  selectTab(tab) {
    console.log("====");
    // setTimeout(() => {
    //   console.log(document.getElementById(tab.name));
    //   this.initEditor(tab);
    // }, 1);
  }

  private initEditor(tab) {
    const uri = monaco.Uri.parse("inmemory://model.py");
    let model = monaco.editor.getModel(uri);
    if (!model) {
      model = monaco.editor.createModel(
        '',
        "python",
        monaco.Uri.parse("inmemory://model.py")
      );
    }
    const editor = monaco.editor.create(document.getElementById(tab.name), {
      model: model,
      glyphMargin: true,
      lightbulb: {
        enabled: true
      }
    });

    editor.setValue(tab.content);

    // const editor = this.lspConnection.createEditor(document.getElementById("container")!, tab.content);
    // this.lspConnection.connect(editor);
  }

}
