import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { WorkspaceUsers } from 'app/workspaceusers/workspaceusers';

@Injectable()
export class WorkspaceusersService {

  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  sendInvitation(workspaceusers:WorkspaceUsers)
  {
    return this.http.post('http://localhost:9025/activityStream/api/admin/sendInvitation/',workspaceusers);
  }

  acceptInvitation(workspaceusers:WorkspaceUsers)
  {
    return this.http.post('http://localhost:9025/activityStream/api/admin/acceptedInvitation/',workspaceusers);
  }

  rejectInvitation(workspaceusers:WorkspaceUsers)
  {
    return this.http.post('http://localhost:9025/activityStream/api/admin/rejectInvitation/',workspaceusers);
  }
}
