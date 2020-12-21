import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreatorComponent } from './project-creator.component';

describe('ProjectCreatorComponent', () => {
  let component: ProjectCreatorComponent;
  let fixture: ComponentFixture<ProjectCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
