import { Component, OnInit } from '@angular/core';
import { NavigatorService } from '../navigator.service';

@Component({
  selector: 'app-bad',
  templateUrl: './bad.component.html',
  styleUrls: ['./bad.component.scss']
})
export class BadComponent implements OnInit {

  constructor(private nav: NavigatorService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.nav.offset$.next(1);
    }, 1000);
  }

}
