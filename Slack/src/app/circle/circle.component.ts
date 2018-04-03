import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Circle } from './circle';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CircleService } from '../circle.service';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import { Message } from '../message/message';
import {MessageService} from '../message.service';
import { CommonMessage } from '../message/commonmessage';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddcircleComponent } from '../addcircle/addcircle.component';
import { EditcircleComponent } from '../editcircle/editcircle.component';

//import {NewCircleComponent} from './addcircle.component';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {
  //circle:Circle;
  title='Circles ';
  @Input() 
  circles: Circle[];
  @Input()
  myCircle: string;
  circleMessages: Message[];
  commonMessageCircle:CommonMessage;
  selectedCircle: Circle;
  circlename: string;
  usersIncircle: string[];
  onSelect(circle: Circle): void {
    this.selectedCircle = circle;
  }

  @Output()
  commonMessage: EventEmitter<CommonMessage> = new EventEmitter<CommonMessage>();
  constructor(
    private route: ActivatedRoute,private circleService:CircleService,
    private location: Location,private  messageService: MessageService, public dialog: MatDialog ) 
    {

    }
    //getAllCircles(){
      // this.circleService.getAllCircles().then(circles => this.circles=circles); 
    // this.circleService.getAllCircles().subscribe(data => {
     // this.circles=data.json();
      //alert(JSON.stringify(this.circles));

   // })

  //  }
 
    getMessagesByCircleName(circleName: string){
      return   this.messageService.getMessagesByCircleName(circleName).subscribe(data => {
        
          this.circleMessages=data.json();
          
          this.commonMessageCircle=new CommonMessage();
          this.commonMessageCircle.circlename=circleName;
          this.commonMessageCircle.messages=this.circleMessages;
         // alert(JSON.stringify(this.commonMessageCircle.messages));
          this.commonMessage.emit(this.commonMessageCircle);
          this.circleService.getUsersByCircle(circleName).subscribe(userData => {
            this.usersIncircle = userData.json();
            });
        })
    }

    showCreateCircleDialog():void
    {
      const dialogRef = this.dialog.open(AddcircleComponent, {
        width: '300px', height: '200px',position:{
          top: '0px',
        },
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.circleService.getAllCircles().subscribe(updatedCircles => {
          this.circles = updatedCircles.json();
         });
       // this.circlename = result;
        alert('The dialog was closed');
        
        
      });
    }

    addUserToCircle(): void {
      const dialogRef = this.dialog.open(EditcircleComponent, {
        width: '500px', height: '450px',
        data: { name: this.usersIncircle, selectedCircle: this.circlename}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.circlename = result;
        alert('The dialog was closed....');
      });
    }
    ngOnInit(){
     /*  this.circleService.getAllCircles().subscribe(data => {
       this.circles=data.json();
  
  
      }) */
  
    }
  
}

