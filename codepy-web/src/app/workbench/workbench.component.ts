import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { ProjectService } from '../service/project.service';
import { FileEditorComponent } from './file-editor/file-editor.component';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.less']
})
export class WorkbenchComponent implements OnInit {
  projectName = '';
  projectDescription = '';
  files = [];
  siderWidth = 300;
  contentHeight = 400;
  id = -1;
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
    }, 0);
  }

  onBack(): void {
    this.router.navigate(['/project']);
  }

  onSideResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.siderWidth = width!;
    });
  }

  onEditorResize({ height }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.contentHeight = height!;
      this.fileEditor.resize(height);
    });
  }
}
