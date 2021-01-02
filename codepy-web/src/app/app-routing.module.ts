import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectManagementComponent } from './project/project-management/project-management.component';
import { ProjectCreatorComponent } from './project/project-creator/project-creator.component';
import { ProjectEditorComponent } from './project/project-editor/project-editor.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    data: {
      breadcrumb: 'Home'
    },
    children: [
      {
        path: '', component: HomeComponent,
        data: {
          breadcrumb: 'Home'
        }
      },
      { path: 'home', component: HomeComponent },
      { path: 'project', component: ProjectManagementComponent },
      { path: 'project-create', component: ProjectCreatorComponent },
    ]
  },
  { path: 'editor', component: ProjectEditorComponent }
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
