import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.loadTheme().then();
  }

  changeDrakTheme(isDark: boolean): void {
    // if (isDark) {
    //   this.appendThemeElement(
    //     { id: 'dark-theme', href: 'assets/themes/ng-zorro-antd.dark.min.css' },
    //     { id: 'my-dark-theme', href: 'assets/themes/style.dark.css' });
    // } else {
    //   this.removeThemeElement('dark-theme', 'my-dark-theme');
    // }
    this.themeService.toggleTheme().then();
  }

  // private appendThemeElement(...themes: { id: string, href: string }[]) {
  //   themes.forEach(theme => {
  //     const style = document.createElement('link');
  //     style.type = 'text/css';
  //     style.rel = 'stylesheet';
  //     style.id = theme.id;
  //     style.href = theme.href;
  //     document.body.appendChild(style);
  //   });
  // }

  // private removeThemeElement(...ids: string[]) {
  //   ids.forEach(id => {
  //     const dom = document.getElementById(id);
  //     if (dom) {
  //       dom.remove();
  //     }
  //   });
  // }

}
