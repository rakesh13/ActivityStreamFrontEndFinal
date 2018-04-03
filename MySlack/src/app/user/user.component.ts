import { Component , Input , OnInit,Output, EventEmitter } from '@angular/core';
import { User } from './user';
import { UserService } from '../user.service';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {MessageService} from '../message.service';
import { Message} from '../message/message';
import 'rxjs/add/operator/switchMap';
import { CommonMessage } from '../message/commonmessage';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

   user: User;
  title='User Details';
  @Input()
  users: User[];
  usermessages:Message[];
  userMessage:CommonMessage;

  @Output()
  commonMessage:EventEmitter<CommonMessage> = new EventEmitter<CommonMessage>();
  selectedUser: User;
  onSelect(user: User): void {
    this.selectedUser = user;
  }
  constructor(private userService: UserService,
  private route: ActivatedRoute, private messageService:MessageService,
  private location: Location
  ){
  }
  /* getAllUsers(): void{
    this.userService.getAllUsers().then(users => this.users=users);
  } */

  getAllMessageByUsers(senderEmailId:string)
  {
    return this.messageService.getAllMessageByUsers(senderEmailId).subscribe(data => {
      this.usermessages=data.json();
      this.userMessage=new CommonMessage();
      this.userMessage.userEmailId=senderEmailId;
      this.userMessage.messages=this.usermessages;
      this.commonMessage.emit(this.userMessage);

    })
  }
  
  ngOnInit(): void {
 /*  this.route.paramMap
    .switchMap((params: ParamMap) => this.userService.getUser(+params.get('id')))
    .subscribe(user => this.user = user); */
    this.userService.getAllUsers().subscribe(data => {
      this.users=data.json();
     // alert(JSON.stringify(this.users));
  
    })
}
/* goBack(): void {
  this.location.back();
} */
}
