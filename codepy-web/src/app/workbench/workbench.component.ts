import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.scss']
})
export class WorkbenchComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onBack() {
    this.router.navigate(['/project']);
  }

  siderWidth = 300;
  contentHeight = 400;
  id = -1;

  onSideResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.siderWidth = width!;
    });
  }

  onContentResize({ height }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.contentHeight = height!;
    });
  }

}
