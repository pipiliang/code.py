import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectManagementComponent } from './project/project-management/project-management.component';
import { ProjectCreatorComponent } from './project/project-creator/project-creator.component';
import { MainComponent } from './main/main.component';
import { WorkbenchComponent } from './workbench/workbench.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'project', component: ProjectManagementComponent },
      { path: 'project-create', component: ProjectCreatorComponent },
    ]
  },
  { path: 'workbench', component: WorkbenchComponent }
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
