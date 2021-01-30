import { Component, OnInit } from '@angular/core';
import { FileHandleEvent, FileHandleType } from '../file-tree/filehandler';
import { URLs } from '../../common/const';
// import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { editor } from 'monaco-editor';
import { listen } from 'vscode-ws-jsonrpc';
import { MessageConnection } from 'vscode-jsonrpc';
import {
  MonacoLanguageClient,
  CloseAction,
  ErrorAction,
  MonacoServices,
  createConnection
} from "monaco-languageclient";

const ReconnectingWebSocket = require('reconnecting-websocket');

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.scss']
})
export class FileEditorComponent implements OnInit {

  index = 0;
  tabs = [];
  editor: editor.ICodeEditor | editor.IEditor;

  constructor() { }

  ngOnInit(): void {
  }

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  onEditorInit(e: editor.ICodeEditor | editor.IEditor): void {
    this.editor = e;
    MonacoServices.install(<any>this.editor);
    const webSocket = this.createWebSocket(URLs.PYTHON_WS);
    listen({
      webSocket,
      onConnection: (connection: MessageConnection) => {
        const languageClient = this.createLanguageClient(connection);
        const disposable = languageClient.start();
        connection.onClose(() => disposable.dispose());
      }
    });
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

  /**
   * 响应 FileTree 上的操作，后续优化为 Event 方式。
   * @param event 
   */
  handleTab(event: FileHandleEvent): void {
    if (event.type === FileHandleType.Open) {
      // if open
      const index = this.tabs.findIndex(tab => tab.path === event.filePath);
      if (index > -1) {
        this.index = index;
        return;
      }
      this.tabs.push({
        name: event.fileName,
        path: event.filePath,
        content: event.content
      });
      this.index = this.tabs.length - 1;
    }
  }

  /**
   * select tab view
   * @param tab 
   */
  selectTab(tab) {
    console.log("====");
  }

}
