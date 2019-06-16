import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../../services/room.service';
import {Message} from '../../../models/message';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../../models/user';
import {environment} from '../../../../environments/environment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit, OnDestroy {
  @Output() keydownEm = new EventEmitter();
  @Output() setRoom = new EventEmitter();
  @Input() roomId: number;
  @Input() user: User;
  private createSubscription: Subscription;
  public form: FormGroup;
  public emoj: boolean;
  public send: boolean;
  public file: File;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private toastrService: ToastrService,
  ) {
  }

  handleEmoji(e) {
    this.form.get('mess').setValue(this.form.get('mess').value ? this.form.get('mess').value + e.char : e.char);
  }

  showEmoj(): void {
    this.emoj = !this.emoj;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      file: new FormControl(null),
      mess: new FormControl(null, [Validators.required]),
    });
  }

  deleteFile(): void {
    this.file = null;
    this.form.get('file').setValue(null);
  }

  sendMessage(): void {
    this.send = true;
    if (this.form.valid) {
      const formData = this.form.value;
      formData.userId = this.user.id;
      if (this.file) {
        formData.fileName = this.file.name;
      }
      this.createSubscription = this.roomService.createMessage(formData, this.roomId).subscribe(
        (res: Message) => {
          this.setRoom.emit(res);
          this.form.reset();
          this.emoj = false;
          this.file = null;
          this.send = false;
        },
        (err: HttpErrorResponse) => {
          this.toastrService.error(err.error.message);
          if (!environment.production) {
            this.toastrService.error('Are you sure that you created data base with utf8?(use Readme)');
          }
          this.send = false;
        }
      );
    } else {
      this.toastrService.error('type anything');
      this.send = false;
    }
  }

  onKeyDown(): void {
    this.keydownEm.emit();
  }

  onFileChange(event): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file);
      if (file.size > 5000000) {
        this.toastrService.error('File too large.');
      } else {
        reader.readAsDataURL(file);
        1;
        this.file = file;
        reader.onload = () => {
          this.form.patchValue({
            file: reader.result
          });
        };
      }
    }
  }

  ngOnDestroy(): void {
    if (this.createSubscription) {
      this.createSubscription.unsubscribe();
    }
  }

}
