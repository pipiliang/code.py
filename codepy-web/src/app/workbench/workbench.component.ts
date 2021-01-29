import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { ProjectService } from '../service/project.service';
import { FileEditorComponent } from './file-editor/file-editor.component';
import { FileHandleEvent } from './file-tree/filehandler';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.scss']
})
export class WorkbenchComponent implements OnInit {
  projectName = '';
  projectDescription = '';
  files = [];
  @ViewChild(FileEditorComponent) fileEditor: FileEditorComponent;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectName = this.activateRoute.snapshot.paramMap.get('projectName');
    setTimeout(async () => {
      const p = await this.projectService.getProjectByName(this.projectName);
      this.projectDescription = p.project.description;
      this.files = p.files;
    }, 500)
  }

  onBack() {
    this.router.navigate(['/project']);
  }

  siderWidth = 300;
  contentHeight = 400;
  id = -1;

  onSideResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.siderWidth = width!;
    });
  }

  onContentResize({ height }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.contentHeight = height!;
    });
  }

  /**
   * 资源管理(tree)的回调事件
   * @param event 
   */
  fileHandle(event: FileHandleEvent) {
    this.fileEditor.handleTab(event);
  }
}
