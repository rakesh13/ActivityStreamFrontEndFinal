import { Component, OnInit, Input } from '@angular/core';
import { WorkspaceusersService } from 'app/workspaceusers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceUsers } from 'app/workspaceusers/workspaceusers';

@Component({
  selector: 'app-workspaceusers',
  templateUrl: './workspaceusers.component.html',
  styleUrls: ['./workspaceusers.component.css']
})
export class WorkspaceusersComponent implements OnInit {
  title = 'Welcome to Slack Admin Page';
  
  @Input()
  emailId:string;
  companyName:string;
 
  
  workspaceusers:WorkspaceUsers;

  @Input()
  workspaceName:string;
  
  result=1;
  constructor(private workspaceUsersService: WorkspaceusersService,private route: ActivatedRoute,private router:Router)
  {

  }
  sendInvitation(worskspaceUsers:WorkspaceUsers)
  {
    this.route.params.subscribe(params=>
      {
        if(params['workspaceName'])
        {
          worskspaceUsers.companyName=params['workspaceName'];
          
          worskspaceUsers.userEmailId=this.emailId;
          this.workspaceusers=new WorkspaceUsers();
          this.workspaceusers.companyName=params['workspaceName'];
          this.workspaceusers.userEmailId=this.emailId;
          this.workspaceUsersService.sendInvitation(worskspaceUsers).subscribe(data => {
            
                  this.emailId = data.json();
                 
                }
                )
                this.result=2;
                alert('Invitation Successfully Sent');
                //this.router.navigate(['/subscribe',this.workspaceusers.companyName,this.emailId]);
                //this.result=2;
        }
      }
    )
   
  }

  acceptInvitation(worskspaceUsers:WorkspaceUsers)
  {
    worskspaceUsers=this.workspaceusers;
    this.workspaceUsersService.acceptInvitation(worskspaceUsers).subscribe(data => {
      
            this.emailId = data.json();
            
          }
          )
  }

  rejectInvitation(worskspaceUsers:WorkspaceUsers)
  {
    worskspaceUsers=this.workspaceusers;
    this.workspaceUsersService.rejectInvitation(worskspaceUsers).subscribe(data => {
      
            this.emailId = data.json();
            
          }
          )
  }
  ngOnInit() {
  }

}
