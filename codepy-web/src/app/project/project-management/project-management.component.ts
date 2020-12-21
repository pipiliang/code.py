import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProjectService } from './../../service/project.service'


@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {
  loading = false;
  projects = [];
  gridStyle = {
    width: '100%',
    textAlign: 'center'
  };

  constructor(private projectService: ProjectService, private nzMessageService: NzMessageService) {
  }

  ngOnInit(): void {
    setTimeout(async () => {
      this.loading = true;
      const projects = await this.projectService.getProjects();
      projects.forEach(project => {
        this.projects.push({
          name: project.name,
          description: project.description
        });
      });
      this.loading = false;
    }, 500)

  }


  public deleteProject(name: string) {
    console.log('name', name);
    this.projectService.deleteProject(name);
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

}
