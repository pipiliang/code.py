import { Component, Input, OnInit } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { FileService } from './../../service/file.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';
import { FileEventHub, FileTreeOperateTopic, FileTreeOperateType } from '../../core/file.eventhub';

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

  /**
   * 点击文件
   * @param data 文件信息
   */
  clickFile(data: FileTreeNode): void {
    FileEventHub.emit(FileTreeOperateTopic, {
      type: FileTreeOperateType.Open,
      name: data.name,
      path: data.path,
      projectName: this.projectName
    });
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
      // 通过接口创建
      this.dataSource.setData(this.files);
      // 通知创建了文件
    }
  }

  createFolder(node: FileTreeNode): void {

  }

  rename(node: FileTreeNode): void {

  }

  delete(node: FileTreeNode): void {

  }
}
