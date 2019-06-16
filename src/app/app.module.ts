import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SingUpComponent } from './components/elements/sing-up/sing-up.component';
import { ProfileComponent } from './components/elements/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { UserListComponent } from './components/elements/user-list/user-list.component';
import { UserChatComponent } from './components/elements/user-chat/user-chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { OrderByPipe } from './pipe/order-by.pipe';
import {environment} from '../environments/environment';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { SendMessageComponent } from './components/elements/send-message/send-message.component';
import  {  NgxEmojModule  }  from  'ngx-emoj';
import { ActiveUserHeaderComponent } from './components/elements/active-user-header/active-user-header.component';
import { ChatMessageComponent } from './components/elements/chat-message/chat-message.component';
import { ChatUsersComponent } from './components/elements/chat-users/chat-users.component';
const config: SocketIoConfig = { url: environment.apiurl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SingUpComponent,
    ProfileComponent,
    UserListComponent,
    UserChatComponent,
    OrderByPipe,
    SendMessageComponent,
    ActiveUserHeaderComponent,
    ChatMessageComponent,
    ChatUsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxEmojModule,
    MalihuScrollbarModule.forRoot(),
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot({timeOut: 5000}),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
