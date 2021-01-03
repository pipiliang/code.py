import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  changeDrakTheme(isDark: boolean) {
    if (isDark) {
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'dark-theme';
      style.href = 'assets/themes/style.dark.css';
      document.body.appendChild(style);
    } else {
      const dom = document.getElementById('dark-theme');
      if (dom) {
        dom.remove();
      }
    }
  }

}
