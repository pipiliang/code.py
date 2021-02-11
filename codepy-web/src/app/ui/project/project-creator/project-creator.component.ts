import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project-creator',
  templateUrl: './project-creator.component.html'
})
export class ProjectCreatorComponent implements OnInit {
  validateForm!: FormGroup;
  hideFrom = false;
  result = 'No';
  checked = true;

  constructor(private fb: FormBuilder, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      readme: [true]
    });
  }

  async submitForm(): Promise<void> {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    try {
      this.hideFrom = true;
      await this.projectService.createProject(this.validateForm.value);
      this.result = 'success';
    } catch (error) {
      this.result = 'failed';
    }
  }

}
