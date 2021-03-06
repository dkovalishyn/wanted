import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../../../shared/models/Notification';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {
  @Input() notifications: Notification[];

  constructor() {}

  ngOnInit() {
  }

}
