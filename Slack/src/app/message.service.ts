import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Message }from './message/message';

@Injectable()
export class MessageService {

  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }
  getAllMessages(){
    return this.http.get('http://localhost:9014/activityStream/api/usermessage/getAllMessages');
  }

  getMessagesByCircleName(circleName: string){
    return this.http.get('http://localhost:9014/activityStream/api/usermessage/getAllMessagesByCircleName/'+circleName);
  }

  getAllMessageByUsers(receiverEmailId: string){
    return this.http.get('http://localhost:9014/activityStream/api/usermessage/getAllMessageByUsers/'+receiverEmailId+'.com');
  }

  sendMessageToDatabase(message:Message)
  {
    return this.http.post('http://localhost:9014/activityStream/api/usermessage/sendMessage/',message);
  }
}
