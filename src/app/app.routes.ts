import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.service';
import { LoginComponent } from './login/login.component'
import { UserComponent } from './user/user.component';
import { LoginEmailComponent } from './login-email/login-email.component'
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { YourexamComponent } from './yourexam/yourexam.component';
import { SelectexamComponent } from './selectexam/selectexam.component';
import { EstartComponent } from './estart/estart.component';
import { ExamcornerComponent } from './examcorner/examcorner.component';
import { ConRegistrationComponent } from './con-registration/con-registration.component';
import { SetquestionComponent } from './setquestion/setquestion.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { FinishexamComponent } from './finishexam/finishexam.component';
import { EngTypingTestComponent } from './eng-typing-test/eng-typing-test.component';
import { MobileloginComponent } from './mobilelogin/mobilelogin.component';
import { DetailresultComponent } from './detailresult/detailresult.component';
import { InstiLoginComponent } from './insti-login/insti-login.component';
import { MakepaymentComponent } from './makepayment/makepayment.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { StoriesComponent } from './stories/stories.component';
export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'mobilelogin', component: MobileloginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'yourexam', component: YourexamComponent , canActivate: [AuthGuard] },
    { path: 'header', component: HeaderComponent },
    { path: 'selectexam', component: SelectexamComponent , canActivate: [AuthGuard]},
    { path: 'footer', component: FooterComponent },
    { path: 'login-email', component: LoginEmailComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'examcorner/:exam/:examcode/:id/:name/:email/:contact/:time/:organization', component: ExamcornerComponent, canActivate: [AuthGuard] },
    { path: 'estart/:eid/:examcode/:organization/:image/:detail/:time/:noq', component: EstartComponent, canActivate: [AuthGuard] },
    { path: 'Register', component: ConRegistrationComponent, canActivate: [AuthGuard] },
    { path: 'setQuestion/:exam/:examcode', component: SetquestionComponent, canActivate: [AuthGuard] },
    { path: 'DetailResult/:uid/:examcode', component: DetailresultComponent, canActivate: [AuthGuard] },
    { path: 'myaccount/:uid', component: MyaccountComponent, canActivate: [AuthGuard] },
    { path: 'finishexam/:q', component: FinishexamComponent },
    { path: 'engtypingtest', component: EngTypingTestComponent },
    { path: 'currentaffair', component: NewsfeedComponent },
    { path: 'stories', component: StoriesComponent },
    { path: 'admin', component: InstiLoginComponent },
    { path: 'payment', component: MakepaymentComponent, canActivate: [AuthGuard] },
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);