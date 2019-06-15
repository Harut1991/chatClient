import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'app-active-user-header',
  templateUrl: './active-user-header.component.html',
  styleUrls: ['./active-user-header.component.css']
})
export class ActiveUserHeaderComponent implements OnInit {
  @Input() activeUser: User;

  constructor() {
  }

  ngOnInit() {
  }

}
