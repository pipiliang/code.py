import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-separator',
  template: `
  <div style="
    margin: 3px 10px 3px 10px;
    height: 1px;
    border-top: 1px solid;">
  </div>
  `
})
export class SeparatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
