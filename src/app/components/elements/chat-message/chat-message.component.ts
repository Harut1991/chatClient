import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../models/message';
import {User} from '../../../models/user';
import {environment} from '../../../../environments/environment';
import {checkFileType} from '../../../utils/helpers';

enum FileTypes {
  image = 1 ,
  video = 2,
  audio = 3,
  other = 0
}

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})

export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  @Input() user: User;
  public downloadPath: string;
  public showPath: string;
  public fileType: FileTypes;

  constructor() {
  }

  ngOnInit() {
    if (this.message.fileName) {
      this.downloadPath = `${environment.apiurl}/download/${this.message.fileName}`;
      this.showPath = `${environment.apiurl}/public/${this.message.fileName}`;
      const splitArray = this.message.fileName.split('.');
      this.fileType = FileTypes[checkFileType(splitArray[splitArray.length - 1])];
    }
  }

}
