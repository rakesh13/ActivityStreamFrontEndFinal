import { Component, OnInit, Input } from '@angular/core';
import { WorkspaceusersService } from 'app/workspaceusers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceUsers } from 'app/workspaceusers/workspaceusers';

@Component({
  selector: 'app-usersubscription',
  templateUrl: './usersubscription.component.html',
  styleUrls: ['./usersubscription.component.css']
})
export class UsersubscriptionComponent implements OnInit {
  //activatedRoute: any;

  workspaceusers:WorkspaceUsers;
  constructor(private workspaceUsersService: WorkspaceusersService,private route: ActivatedRoute,private router:Router)
  {
    this.route.queryParams.subscribe(params=>
      {
        this.workspaceusers=new WorkspaceUsers();
        this.workspaceusers.companyName=params['workspaceName'];
        
        this.workspaceusers.userEmailId=params['userEmail'];
      })
  }


  //workspaceusers:WorkspaceUsers;
  acceptInvitation(worskspaceUsers:WorkspaceUsers)
  {
    
    worskspaceUsers=this.workspaceusers;
    this.workspaceUsersService.acceptInvitation(worskspaceUsers).subscribe(data => {
      
          alert("user Successfully added in workspace");
            //this.emailId = data.json();
            
          }
          )
       
  }

  rejectInvitation(worskspaceUsers:WorkspaceUsers)
  {
    worskspaceUsers=this.workspaceusers;
    this.workspaceUsersService.rejectInvitation(worskspaceUsers).subscribe(data => {
      
        alert("Sorry for the inconvenience caused");
            //this.emailId = data.json();
            
          }
          )
        
  }
  ngOnInit() {

    console.log('Workspace Name = '+this.workspaceusers.companyName);
  }

}
