import { Component, OnInit } from '@angular/core';
import { FileHandleEvent, FileHandleType } from '../file-tree/filehandler';

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.scss']
})
export class FileEditorComponent implements OnInit {

  index = 0;
  tabs = [];

  constructor() { }

  ngOnInit(): void {
  }

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    this.tabs.push('New Tab');
  }

  handleTab(event: FileHandleEvent): void {
    if (event.type === FileHandleType.Open) {
      const some = this.tabs.some(tab => tab.fileName === event.fileName);
      if (some) {

      } else {
        this.tabs.push({
          name: event.fileName,
          content : event.content
        });
        this.index = this.tabs.length - 1;
      }
    }
  }

}
