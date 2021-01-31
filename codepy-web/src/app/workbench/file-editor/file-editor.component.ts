import { Component, OnInit } from '@angular/core';
import { FileHandleEvent, FileHandleType } from '../file-tree/filehandler';
import { LSPClient } from '../../langclient/lspclient';
import { editor } from 'monaco-editor';

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

  onEditorInit(e: editor.ICodeEditor | editor.IEditor, name: string): void {
    LSPClient.connect(e, name);
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
