import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../models/message';
import {User} from '../../../models/user';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  @Input() user: User;
  public filePath: string;

  constructor() {
  }

  ngOnInit() {
    if (this.message.fileName) {
      this.filePath = `${environment.apiurl}/download/${this.message.fileName}`;
    }
  }

}
