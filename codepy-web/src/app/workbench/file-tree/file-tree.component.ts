import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';
import { FileService } from './../../service/file.service';
import { FileHandleEvent, FileHandleType } from '../filehandler';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

/**
 * 树上的数据结构
 */
interface FileTreeNode {
  expandable: boolean;
  name: string;
  path: string;
  level: number;
}

/**
 * 原始文件节点
 */
interface FileNode {
  children?: FileNode[];
  path: string;
  title: string;
}

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.less']
})
export class FileTreeComponent implements OnInit {

  @Input() files = [];
  @Input() projectName = '';
  @Output() fileHandleEvent = new EventEmitter<FileHandleEvent>();

  flatNodeMap = new Map<FileTreeNode, FileNode>();
  nestedNodeMap = new Map<FileNode, FileTreeNode>();
  selectListSelection = new SelectionModel<FileTreeNode>();

  treeControl = new FlatTreeControl<FileTreeNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new NzTreeFlattener((node: FileNode, level: number) => {
    const existingFileTreeNode = this.nestedNodeMap.get(node);
    const flatNode = existingFileTreeNode && existingFileTreeNode.path === node.path
      ? existingFileTreeNode
      : {
        expandable: !!node.children && node.children.length > 0,
        name: node.title,
        path: node.path,
        level
      };

    flatNode.name = node.title;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  },
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: FileTreeNode) => node.expandable;
  hasNoContent = (_: number, node: FileTreeNode) => node.name === '';
  // trackBy = (_: number, node: FileTreeNode) => `${node.path}-${node.name}`;

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

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }

  createFile(node: FileTreeNode): void {
    const parentNode = this.flatNodeMap.get(node);
    if (parentNode) {
      parentNode.children = parentNode.children || [];
      parentNode.children.push({
        title: '',
        path: parentNode.path
      });
      this.dataSource.setData(this.files);
      this.treeControl.expand(node);
    }
  }

  saveNode(node: FileTreeNode, value: string): void {
    const nestedNode = this.flatNodeMap.get(node);
    if (nestedNode) {
      nestedNode.title = value;
      nestedNode.path = nestedNode.path + '/' + value;
      this.dataSource.setData(this.files);
    }
  }

  createFolder(node: FileTreeNode): void {

  }

  rename(node: FileTreeNode): void {

  }

  delete(node: FileTreeNode): void {

  }
}
