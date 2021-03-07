import { Component, OnDestroy, OnInit } from '@angular/core';
import { LSPClient } from '../../langclient/lspclient';
import { editor } from 'monaco-editor';
import { FileEventHub, FileTreeOperateTopic, FileTreeOperateType, FileTreeOperateEvent } from '../../core/file.eventhub';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.less']
})
export class FileEditorComponent implements OnInit, OnDestroy {

  index = 0;
  // 定义 tab 数据结构
  tabs = [];
  editorHeight = 358;
  tabHeight = 42;
  editor: editor.ICodeEditor | editor.IEditor;

  constructor(private fileService: FileService) { }

  /**
   * 响应 FileTree 上的操作。
   * @param event 文件事件
   */
  handleFileTreeOperate = (data: FileTreeOperateEvent): void => {
    console.log('data', data);
    // 文件打开
    if (data.type === FileTreeOperateType.Open) {
      const index = this.tabs.findIndex(tab => tab.path === data.path);
      // 如果已经打开则返回
      if (index > -1) {
        this.index = index;
        return;
      }
      // 查询文件内容，再渲染
      this.fileService.handleFile(data).then(resp => {
        this.addTab({
          name: data.name,
          path: data.path,
          content: resp.content
        });
      });
    }
  }

  ngOnInit(): void {
    FileEventHub.on(FileTreeOperateTopic, this.handleFileTreeOperate);
  }

  ngOnDestroy(): void {
    FileEventHub.off(FileTreeOperateTopic, this.handleFileTreeOperate);
  }

  addTab(data: any): void {
    this.tabs.push(data);
    this.index = this.tabs.length - 1;
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
   * 刷新 editor 大小
   * @param height 编辑区实时高度
   */
  resize(height: number): void {
    this.editorHeight = Math.round(height - this.tabHeight);
  }

}
