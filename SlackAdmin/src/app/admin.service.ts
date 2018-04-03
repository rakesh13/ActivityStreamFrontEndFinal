import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Workspace } from 'app/admin/workspace';

@Injectable()
export class AdminService {
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  validateEmail(adminEmailID:string)
  {
    return this.http.get('http://localhost:9025/activityStream/api/admin/sendCode/'+adminEmailID);
  }

  validateCode(code:string)
  {
    return this.http.get('http://localhost:9025/activityStream/api/admin/validateCode/'+code);
  }

  createWorkspace(workspace:Workspace)
  {
    return this.http.post('http://localhost:9025/activityStream/api/admin/createWorkspace',workspace);
  }
}
