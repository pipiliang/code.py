import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';
import { FileService } from './../../service/file.service'
import { FileHandleEvent, FileHandleType } from './filehandler'

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent implements OnInit {
  activatedNode?: NzTreeNode;
  @Input() files = [];
  @Input() projectName = ''
  @Output() fileHandleEvent = new EventEmitter<FileHandleEvent>();


  constructor(private nzContextMenuService: NzContextMenuService,
    private fileService: FileService) { }

  ngOnInit(): void {
  }

  async activeNode(data: NzFormatEmitEvent) {
    this.activatedNode = data.node!;
    console.log(data);
    if (data.node.isLeaf) {
      // 打开文件
      const resp = await this.fileService.getFile({
        projectName: this.projectName,
        path: data.node.origin.path
      });
      console.log(resp);
      this.fileHandleEvent.emit(
        {
          type: FileHandleType.Open,
          fileName: data.node.title,
          filePath: resp.path,
          content: resp.content
        }
      );
    } else {
      this.openFolder(data);
    }
  }

  private openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }
}
