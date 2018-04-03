import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { WorkspaceusersComponent } from './workspaceusers/workspaceusers.component';
import { AdminService } from './admin.service';
import { WorkspaceusersService } from './workspaceusers.service';
import { MaterialModule } from 'app/material/material.module';
import { UsersubscriptionComponent } from './usersubscription/usersubscription.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    WorkspaceusersComponent,
    UsersubscriptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'create',
        component: AdminComponent
      },
      {
        
        
        path: "subscribe",
        component: UsersubscriptionComponent
      },
      {
        path: 'add/:workspaceName',
        component: WorkspaceusersComponent
      }])
  ],
  providers: [AdminService,WorkspaceusersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
