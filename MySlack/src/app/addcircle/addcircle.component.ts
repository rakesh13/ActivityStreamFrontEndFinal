import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { CircleService } from '../circle.service';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import { Message } from '../message/message';
import {MessageService} from '../message.service';
import { CommonMessage } from '../message/commonmessage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Circle } from '../circle/circle';

@Component({
    templateUrl: './addcircle.component.html',
    styleUrls: ['./addcircle.component.css']
  })
export class AddcircleComponent implements OnInit
{
    circlename: string;
    createdCircle: Circle;
  
    @Output('myCircle')
    myCircle: EventEmitter<Circle> = new EventEmitter<Circle>();
    @Input()
    commonMessage: CommonMessage;
    @Input()
    circles: Circle[];

    constructor(
      public dialogRef: MatDialogRef<AddcircleComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any , public circleService: CircleService) { }

    onNoClick(): void {
      this.circleService.getAllCircles();
      this.dialogRef.close();
    }

    createCircle(circle: Circle) {
      /* alert( this.circlename); */
      circle.circleName = this.circlename;
      circle.createdBy = 'rakesh@gmail.com';
      circle.status = true;
      this.circleService.createCircle(circle).subscribe(data => {
        this.createdCircle = data.json();
        
      });
      
      this.onCloseCancel();
    }
    onCloseCancel() {
      
      this.dialogRef.close('Cancel');
     
    }
    ngOnInit(){
     
       }
}