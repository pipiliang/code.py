import { Component, OnInit } from '@angular/core';
import { FileHandleEvent, FileHandleType } from '../filehandler';
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
  editorHeight = 358;
  tabHeight = 42;
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
   * select tab view
   * @param tab 选中的tab页
   */
  selectTab(tab): void {

  }

  /**
   * 响应 FileTree 上的操作，后续优化为 Event 方式。
   * @param event 文件事件
   */
  handleTab(event: FileHandleEvent): void {
    // 文件打开
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
   * 刷新 editor 大小
   * @param height 编辑区实时高度
   */
  resize(height: number): void {
    this.editorHeight = Math.round(height - this.tabHeight);
  }

}
