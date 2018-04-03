import { Component, OnInit, Input, Inject } from '@angular/core';
import { User } from '../user/user';
import { CommonMessage } from '../message/commonmessage';
import { UserService } from '../user.service';
import { CircleService } from '../circle.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserCircle } from '../circle/userCircle';

@Component({
  selector: 'app-editcircle',
  templateUrl: './editcircle.component.html',
  styleUrls: ['./editcircle.component.css']
})
export class EditcircleComponent implements OnInit {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  users: User[];
  @Input()
  commonMessage: CommonMessage;
  constructor(private userService: UserService, private circleService: CircleService, public dialogRef: MatDialogRef<EditcircleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  selectedUser: User;
  public selectedUsers: string[] = [];
  public unsubscribedUsers: string[] = [];
  selectedEmail: string;
  public selected: string[];
  public removed: string[];
  userCircle: UserCircle;
  user: User;
  circle: string;
  usersOfCircle: string[];
  onSelect(user: User): void {
    this.selectedUser = user;
  }
  onClick(emailId: string): void {
    this.selectedEmail = emailId;
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data.json();
    });
  }
  selectUsers(emailId: string) {
    this.selectedUsers.push(emailId);
    
  }
  removeUsers(emailId: string) {
    this.unsubscribedUsers.push(emailId);
    
  }
  addUserToCircle(userCircle: UserCircle) {
      
      userCircle.circleName = this.circle;
      for (let i = 0; i < this.selectedUsers.length; i++) {
      if (this.usersOfCircle.includes(this.selectedUsers[i])) {
        window.alert('User  ' + this.selectedUsers[i] + ' Alerady Exists');
      } else {
        userCircle.userEmailId = this.selectedUsers[i];
         this.circleService.saveMyUserCircle(userCircle).subscribe(data => {
          this.getUsersByCircle(this.circle);
        });
      }
      userCircle.circleName = this.circle;
    }
    this.selected = null;
  }
  deleteUserfromCircle(userCircle: UserCircle) {
    userCircle.circleName = this.circle;
    for (let i = 0; i < this.unsubscribedUsers.length; i++) {
      userCircle.userEmailId = this.unsubscribedUsers[i];
       this.circleService.removeUserFromCircle(userCircle).subscribe(data => {
        this.getUsersByCircle(this.circle);
      });
  }
  }
  getUsersByCircle(circleName: string) {
    return this.circleService.getUsersByCircle(circleName).subscribe(data => {
      this.usersOfCircle = data.json();
    });
  }
  addToCircle() {
    this.selected = this.selectedUsers;
  }
  removeFromCircle() {
   this.removed = this.unsubscribedUsers;
   
  }
  ngOnInit() {
    this.getAllUsers();
    console.log(this.data);
    this.usersOfCircle = this.data.name;
    this.circle = this.data.selectedCircle;
  }
  cancel() {
    this.dialogRef.close('closed');
  }
}
