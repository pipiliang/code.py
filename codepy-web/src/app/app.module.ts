import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HomeComponent } from './ui/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProjectManagementComponent } from './ui/project/project-management/project-management.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ProjectCreatorComponent } from './ui/project/project-creator/project-creator.component';
import { MainComponent } from './ui/main/main.component';
import { WorkbenchComponent } from './workbench/workbench.component';
import { FileTreeComponent } from './workbench/file-tree/file-tree.component';
import { FileEditorComponent } from './workbench/file-editor/file-editor.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectManagementComponent,
    ProjectCreatorComponent,
    MainComponent,
    WorkbenchComponent,
    FileTreeComponent,
    FileEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzCardModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzSwitchModule,
    NzGridModule,
    NzIconModule,
    NzFormModule,
    NzPopconfirmModule,
    NzInputModule,
    NzButtonModule,
    NzResultModule,
    NzMessageModule,
    NzPageHeaderModule,
    NzTabsModule,
    NzResizableModule,
    NzTreeModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzCodeEditorModule,
    NzToolTipModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
