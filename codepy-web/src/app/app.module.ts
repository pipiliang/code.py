import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProjectManagementComponent } from './project/project-management/project-management.component';
import { ProjectEditorComponent } from './project/project-editor/project-editor.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProjectManagementComponent,
    ProjectEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }