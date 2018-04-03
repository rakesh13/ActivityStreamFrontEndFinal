import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AdminService } from 'app/admin.service';
import { WorkspaceUsers } from 'app/workspaceusers/workspaceusers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  //@Input()
  workspaceusers:WorkspaceUsers;
 // @Input()
  workspaceName:string;
  
  constructor(private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    
   }
 
}
