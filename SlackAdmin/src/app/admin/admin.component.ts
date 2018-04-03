import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminService } from 'app/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Workspace } from 'app/admin/workspace';
import { WorkspaceUsers } from 'app/workspaceusers/workspaceusers';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  title = 'Welcome to Slack Admin Page';
  @Input()
  emailId:string;
  code:string;
  companyName:string;
  role:string;
  teamSize:number;
  typeOfOrganisation:string;
  purpose:string;
  newWorkspace:Workspace;
  result=1;
  workspaceuser:WorkspaceUsers;
  @Output()
  workspaceusers:EventEmitter<WorkspaceUsers>=new EventEmitter<WorkspaceUsers>();

  @Output('workspaceName')
  workspaceName:EventEmitter<string>=new EventEmitter<string>();

  constructor(private adminService: AdminService,private route: ActivatedRoute,private router:Router)
  {

  }
  validateEmail(emailId){
    
    this.adminService.validateEmail(emailId).subscribe(data => {
      
            this.emailId = data.json();
            
          }
          )
          this.result=2;
  }
  acceptCode()
  {
    this.router.navigateByUrl('/admin');
  }
  validateCode(code){
    
    if(this.adminService.validateCode(code).subscribe(data => data.statusText==="OK"))
          {
            this.result=3;
          }
          else
          {
            this.result=2;
          }
         // this.router.navigate(['/team']);
         
  }

  createWorkspace(workspace:Workspace)
  {
    workspace.companyName=this.companyName;
    workspace.adminEmailId=this.emailId;
    workspace.role=this.role;
    workspace.teamSize=this.teamSize;
    workspace.purpose=this.purpose;
    workspace.typeOfOrganisation=this.typeOfOrganisation;
    this.workspaceuser=new WorkspaceUsers();
    this.workspaceuser.companyName=this.companyName;
   this.workspaceusers.emit(this.workspaceuser);
   this.workspaceName.emit(this.companyName);
    this.adminService.createWorkspace(workspace).subscribe(data=>
      {
        this.newWorkspace=data.json();
        
      }
    )
    this.result=4;
    //alert("Workspace "+this.companyName+" Created Successfully");
  }

  addUser()
  {
    this.router.navigate(['/add',this.companyName]);
  }
  ngOnInit() {
  }

}
