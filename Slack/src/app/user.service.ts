import { Injectable } from '@angular/core';
import { User } from "./user/user";
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }
  getAllUsers()
  {
    return this.http.get('http://localhost:9011/activityStream/api/user');
  }
  //getUser(userId:number):Promise<User>
  //{
   // return this.getAllUsers().then(users => users.find(user => user.userId === userId));
  //}
 

}
