import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagementComponent } from './ui/project/project-management/project-management.component';
import { ProjectCreatorComponent } from './ui/project/project-creator/project-creator.component';
import { MainComponent } from './ui/main/main.component';
import { WorkbenchComponent } from './workbench/workbench.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: ProjectManagementComponent },
      { path: 'project', component: ProjectManagementComponent },
      { path: 'project-create', component: ProjectCreatorComponent },
    ]
  },
  { path: 'workbench/:projectName', component: WorkbenchComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
