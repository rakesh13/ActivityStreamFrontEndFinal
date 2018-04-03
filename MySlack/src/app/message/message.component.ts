import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import {Message }from './message';
import {MessageService } from '../message.service';
import { Circle } from '../circle/circle';
import { ActivatedRoute } from '@angular/router';
import { CommonMessage } from './commonmessage';
//import { Input } from '@angular/core/src/metadata/directives';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  //messages: Message[];

  @Input()
  commonMessage:CommonMessage;
  typedMessage: string;
  newMessage: Message;
  status: string;
  circle: Circle;
  constructor(private messageService: MessageService,private route: ActivatedRoute, private location: Location) {
  }
  
  sendMessage(event) {
    
        if (event.keyCode === 13) {
          this.newMessage = new Message();
          this.newMessage.messageText = event.target.value;
          this.newMessage.senderEmailId = 'rakesh@gmail.com';
          this.newMessage.sentDate = new Date();
          this.newMessage.circleName = this.commonMessage.circlename;
          this.newMessage.receiverEmailId = this.commonMessage.userEmailId;
          this.commonMessage.messages.push(this.newMessage);
         // alert(JSON.stringify(this.commonMessage.messages));
          this.typedMessage = '';
          this.sendMessageToDatabase(this.newMessage);
        }
      }
  
      private sendMessageToDatabase(message: Message) {
        
        this.messageService.sendMessageToDatabase(message).subscribe(data => {
    
          this.status = data.json();
        }
        )
      }
  ngOnInit() {
  }

}
