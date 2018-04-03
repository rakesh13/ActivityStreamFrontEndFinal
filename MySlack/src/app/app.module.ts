import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule} from '@angular/http';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import { CircleComponent } from './circle/circle.component';
import { CircleService } from './circle.service';
import { UserComponent } from './user/user.component';
import { MessageComponent } from './message/message.component';
//import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MessageService } from './message.service';
import { MaterialModule } from './material/material.module';
import 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import 'rxjs/operator/startWith';
import 'rxjs/operator/map';
import 'rxjs/operator/filter';
import 'rxjs/observable/of';
import 'rxjs/operator/startWith';
import 'rxjs/operator/map';
import 'hammerjs';
import { AddcircleComponent } from './addcircle/addcircle.component';
import { EditcircleComponent } from './editcircle/editcircle.component';

@NgModule({
  declarations: [
    AppComponent,
    CircleComponent,
    UserComponent,
    MessageComponent,
    AddcircleComponent,
    EditcircleComponent
  ],
  entryComponents:[AddcircleComponent, EditcircleComponent],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'users',
        component: UserComponent
      },
      
      {
        path: 'users/:receiverEmailId',
        component: UserComponent
},
{
  path: 'circles',
  component: CircleComponent
},
{
  path: 'circles/:circlename',
  component: CircleComponent
},
{
  path: 'messages',
  component: MessageComponent
},
{
  path: 'user/messages/:emailId',
  component: MessageComponent
},
{
  path: 'circle/messages/:circlename',
  component: MessageComponent
}
    ])


  ],
  providers: [UserService,CircleService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
