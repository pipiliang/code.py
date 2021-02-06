import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';
import { FileService } from './../../service/file.service';
import { FileHandleEvent, FileHandleType } from '../filehandler';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

interface FileTreeNode {
  expandable: boolean;
  name: string;
  path: string;
  level: number;
}

interface FileNode {
  children?: FileNode[];
  path: string;
  title: string;
}

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent implements OnInit {

  @Input() files = [];
  @Input() projectName = '';
  @Output() fileHandleEvent = new EventEmitter<FileHandleEvent>();

  selectListSelection = new SelectionModel<FileTreeNode>();

  treeControl = new FlatTreeControl<FileTreeNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new NzTreeFlattener((node: FileNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.title,
      path: node.path,
      level
    };
  },
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    setTimeout(async () => {
      console.log(this.files);
      this.dataSource.setData(this.files);
    }, 500);
  }

  async clickFile(data: FileTreeNode): Promise<void> {
    console.log(data);
    const resp = await this.fileService.getFile({
      projectName: this.projectName,
      path: data.path
    });
    console.log(resp);
    this.fileHandleEvent.emit(
      {
        type: FileHandleType.Open,
        fileName: data.name,
        filePath: resp.path,
        content: resp.content
      }
    );
  }

  clickFolder(node: FileTreeNode): void {
    const isExpand = this.treeControl.isExpanded(node);
    if (isExpand) {
      this.treeControl.collapse(node);
    } else {
      this.treeControl.expand(node);
    }
  }

  hasChild = (_: number, node: FileTreeNode) => node.expandable;

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }
}
