import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { SubscriptionPlansComponent } from './subscription-billing/subscription-plans/subscription-plans.component';

import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics/analytics.component';
import { ViewUserComponent } from './user-management/view-user/view-user.component';
import { SupportTicketsComponent } from './Support/support-tickets/support-tickets.component';
import { SystemhealthComponent } from './system-health/systemhealth/systemhealth.component';
import { InviteUserListComponent } from './user-management/invite-user-list/invite-user-list.component';
import { UploadfilesComponent } from './content-management/uploadfiles/uploadfiles.component';
import { AddfeaturesComponent } from './feature-management/addfeatures/addfeatures.component';
import { UserpermissionsComponent } from './user-management/userpermissions/userpermissions.component';
import { ViewfeedbacksComponent } from './Feedback/viewfeedbacks/viewfeedbacks.component';
import { SupportStatusComponent } from './Support/support-status/support-status.component';
import { AdminChatboxComponent } from './admin-chatbox/admin-chatbox.component';
import { MeetingsComponent } from './Support/meetings/meetings.component';

const routes: Routes = [
  { path:'', redirectTo: '/dashboard', pathMatch: 'full' },
  { path:'dashboard', component:DashboardComponent},
  { path:'users', component:UserListComponent  },
  { path:'subscriptions', component: SubscriptionPlansComponent },
  { path:'analytics',component:AnalyticsComponent},
  { path:'user-details/:apiKey',component:ViewUserComponent},
  { path:'inviteuser',component:InviteUserListComponent},
  { path:'support-tickets',component:SupportTicketsComponent},
  { path:'system',component:SystemhealthComponent},
  { path:'uploadfiles',component:UploadfilesComponent},
  { path:'feature',component:AddfeaturesComponent},
  { path:'permissions',component:UserpermissionsComponent},
  { path:'support',component:SupportTicketsComponent},
  { path:'tickitststus',component:SupportStatusComponent},
  { path:'feedbacks',component:ViewfeedbacksComponent},
  { path:'chat',component:AdminChatboxComponent},
  { path:'meetings',component:MeetingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
