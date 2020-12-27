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
      this.projects = await this.projectService.getProjects();
      this.loading = false;
    }, 500)

  }


  public deleteProject(name: string) {
    this.projectService.deleteProject(name)
      .then((res) => {
        this.nzMessageService.info('Delete project ' + name + ' successfully!');
        const index = this.projects.findIndex(p => p.name === name);
        delete this.projects[index];
      })
      .catch(erro => {
        console.log(erro);
      })
      .finally();
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

}
