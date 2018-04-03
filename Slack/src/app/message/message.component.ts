import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import {Message }from './message';
import {MessageService } from '../message.service';
import { Circle } from '../circle/circle';
import { ActivatedRoute } from '@angular/router';
import { CommonMessage } from './commonmessage';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import $ from 'jquery';

//import { Input } from '@angular/core/src/metadata/directives';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  //messages: Message[];

  private serverUrl = 'http://localhost:9026/socket';
  private stompClient;
 messageStomp: string;
  counter=0;
  @Input()
  commonMessage:CommonMessage;
  typedMessage: string;
  newMessage: Message;
  status: string;
  circle: Circle;
  constructor(private messageService: MessageService,private route: ActivatedRoute, private location: Location) {
  }
  
  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) {
          $('.chat').append('<div class=\'sendMessage\'>' + message.body + '</div>');
          console.log(message.messageText);
        }
      });
    });
  }
  
  sendMessage(event) {
    
        if (event.keyCode === 13) {
          this.newMessage = new Message();
          this.newMessage.messageText = event.target.value;
          this.newMessage.senderEmailId = 'rakesh@gmail.com';
          this.newMessage.sentDate = new Date();
          this.newMessage.circleName = this.commonMessage.circlename;
          this.newMessage.receiverEmailId = this.commonMessage.userEmailId;
         // this.commonMessage.messages.push(this.newMessage);
          this.typedMessage = '';
          this.sendMessageToDatabase(this.newMessage);
         // alert(JSON.stringify(this.commonMessage.messages));
         this.stompClient.send('/app/send/message' , {}, this.newMessage.messageText);
          $('#input').val('');
          // this.commonMessage.messages.push(this.message);
          console.log('My Message', this.newMessage.messageText);
          this.messageStomp = this.newMessage.messageText;
         
          this.counter=1;
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
