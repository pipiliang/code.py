import { Component, OnInit } from '@angular/core';
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

  projectService: ProjectService
  constructor(projectService: ProjectService) {
    this.projectService = projectService;
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

  public addProject() {
    alert('OK');
  }

}
