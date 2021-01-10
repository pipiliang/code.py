import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.scss']
})
export class WorkbenchComponent implements OnInit {
  projectName = '';
  projectDescription = '';
  nodes =  [];
  
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
      this.nodes = p.files;
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

}
