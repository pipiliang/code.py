import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProjectService } from './../../../service/project.service'


@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html'
})
export class ProjectManagementComponent implements OnInit {
  loading = true;
  projects = [];
  gridStyle = {
    width: '100%',
    textAlign: 'center'
  };

  constructor(
    private projectService: ProjectService,
    private nzMessageService: NzMessageService) {
  }

  ngOnInit(): void {
    setTimeout(async () => {
      this.loading = true;
      this.projects = await this.projectService.getProjects();
      this.loading = false;
    }, 500);

  }

  public async deleteProject(name: string) {
    try {
      await this.projectService.deleteProject(name);
      this.nzMessageService.success('Delete project ' + name + ' successfully!');
      const index = this.projects.findIndex(p => p.name === name);
      delete this.projects[index];
      this.projects.splice(index, 1);
    } catch (error) {
      console.log(error);
    }
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

}
