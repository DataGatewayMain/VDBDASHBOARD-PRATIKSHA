import { NgModule } from '@angular/core';


import { BrowserModule } from '@angular/platform-browser';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { SubscriptionPlansComponent } from './subscription-billing/subscription-plans/subscription-plans.component';



import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AnalyticsComponent } from './analytics/analytics/analytics.component';
import { ViewUserComponent } from './user-management/view-user/view-user.component';
import { SupportTicketsComponent } from './Support/support-tickets/support-tickets.component';
import { SystemhealthComponent } from './system-health/systemhealth/systemhealth.component';
import { InviteUserListComponent } from './user-management/invite-user-list/invite-user-list.component';
import { UploadfilesComponent } from './content-management/uploadfiles/uploadfiles.component';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { AddfeaturesComponent } from './feature-management/addfeatures/addfeatures.component';  // <-- Import FormsModule here

import { ReactiveFormsModule } from '@angular/forms';
import { UserpermissionsComponent } from './user-management/userpermissions/userpermissions.component';
import { TicketDialogComponent } from './Support/ticket-dialog/ticket-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { ViewfeedbacksComponent } from './Feedback/viewfeedbacks/viewfeedbacks.component';
import { SupportStatusComponent } from './Support/support-status/support-status.component';
import { AdminChatboxComponent } from './admin-chatbox/admin-chatbox.component';
import { MeetingsComponent } from './Support/meetings/meetings.component';
import { MeetupdateDialogueComponent } from './Support/meetupdate-dialogue/meetupdate-dialogue.component';



@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    SubscriptionPlansComponent,
    DashboardComponent,
         AnalyticsComponent,
         ViewUserComponent,
         SupportTicketsComponent,
         SystemhealthComponent,
         InviteUserListComponent,
         UploadfilesComponent,
         AddfeaturesComponent,
         UserpermissionsComponent,
         TicketDialogComponent,
         ViewfeedbacksComponent,
         SupportStatusComponent,
         AdminChatboxComponent,
         MeetingsComponent,
         MeetupdateDialogueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot([]) , // Include the RouterModule if you're using routes
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
