import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { User } from './user/user';
import { Circle} from './circle/circle';
import { Input} from '@angular/core';
import { UserService } from './user.service';
import {CircleService} from './circle.service';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import { CommonMessage } from './message/commonmessage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
  users: User[];
  circles: Circle[];


  commonMessage:CommonMessage;
  newCircle:string;
  constructor(private userService: UserService, private circleService: CircleService,
    private route: ActivatedRoute,
    private location: Location
    ){
    }

    getAllCircles() {
      
          this.circleService.getAllCircles().subscribe(data => {
            this.circles = data.json();
          })
      
        }

        getAllMessageByUsers(userMessage:CommonMessage){
          this.commonMessage=userMessage;
        }

        getMessagesByCircleName(circleMessage:CommonMessage)
        {
          this.commonMessage=circleMessage;
        }
  ngOnInit(): void {
    /*  this.route.paramMap
       .switchMap((params: ParamMap) => this.userService.getUser(+params.get('id')))
       .subscribe(user => this.user = user); */
       this.userService.getAllUsers().subscribe(data => {
         this.users=data.json();

         
        // alert(JSON.stringify(this.users));
     
       })
       this.getAllCircles();
   }
  title = 'Slack!!! Where Work Happens..';
}
