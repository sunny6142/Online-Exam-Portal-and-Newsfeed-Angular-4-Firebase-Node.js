import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {MatButtonModule, MatCheckboxModule ,MatSlideToggleModule,
            MatMenuModule,MatFormFieldModule,MatPseudoCheckboxModule,MatButtonToggleModule,MatMenuPanel,
            MatToolbarModule,MatOptionModule,MatInputModule,MatPaginatorModule,MatStepperModule,
            MatIconModule, MatAutocompleteModule,MatRadioModule,MatSortModule,
            MatExpansionModule,MatSelectModule ,MatGridListModule,MatRippleModule,MatLineModule,
            MatCardModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContainerComponent } from './container/container.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.service';
import { SortServiceService } from './sort-service.service';
import { routes } from './app.routes';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { LoginEmailComponent } from './login-email/login-email.component';
import { SignupComponent } from './signup/signup.component';
import { YourexamComponent } from './yourexam/yourexam.component';
import { SelectexamComponent } from './selectexam/selectexam.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetfirebaseService } from './getfirebase.service';
import { FeedServiceService } from './feed-service.service';
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { EstartComponent } from './estart/estart.component';
import { ExamcornerComponent } from './examcorner/examcorner.component';
import { ConRegistrationComponent } from './con-registration/con-registration.component';
import { SetquestionComponent } from './setquestion/setquestion.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { EngTypingTestComponent } from './eng-typing-test/eng-typing-test.component';
import { FinishexamComponent } from './finishexam/finishexam.component';
import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtmlPipe } from './eng-typing-test/eng-typing-test.component';
import { StripHtmlTagsPipe } from './pipe/strip-html-tags.pipe';
import { AdDFPComponent } from 'ng2-ad-dfp';
import { AdsenseModule } from 'ng2-adsense';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {HttpClientModule} from '@angular/common/http';
import { SelectSeriesComponent } from './select-series/select-series.component';
import { MobileloginComponent } from './mobilelogin/mobilelogin.component';
import { DetailresultComponent } from './detailresult/detailresult.component';
import { MdlModule , MdlLayoutModule , MdlButtonModule } from '@angular-mdl/core';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import {TranslateModule} from '@ngx-translate/core';
import { HttpClient} from '@angular/common/http';
import { TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { StoriesComponent } from './stories/stories.component';
import { InstiLoginComponent } from './insti-login/insti-login.component';
import { MakepaymentComponent } from './makepayment/makepayment.component';
import { PaymentdetailComponent } from './paymentdetail/paymentdetail.component';

//import { translate } from 'google-translate-api';
//import GTH from 'google-translate-api';
//import { instamojo } from 'instamojo-nodejs';
export const firebaseConfig = {
  apiKey: "AIzaSyAfcEzbeqNcp1WCcn1F4iwry-E4dBMrYAI",
  authDomain: "allexamcorner.firebaseapp.com",
  databaseURL: "https://allexamcorner.firebaseio.com",
  projectId: "allexamcorner",
  storageBucket: "allexamcorner.appspot.com",
  messagingSenderId: "602202099265"
};
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    SafeHtmlPipe,
    AdDFPComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    LoginComponent,
    UserComponent,
    LoginEmailComponent,
    SignupComponent,
    YourexamComponent,
    SelectexamComponent,
    EstartComponent,
    ExamcornerComponent,
    ConRegistrationComponent,
    SetquestionComponent,
    MyaccountComponent,
    EngTypingTestComponent,
    FinishexamComponent,
    StripHtmlTagsPipe,
    SelectSeriesComponent,
    MobileloginComponent,
    DetailresultComponent,
    NewsfeedComponent,
    StoriesComponent,
    InstiLoginComponent,
    MakepaymentComponent,
    PaymentdetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,Ng2OrderModule,
    HttpModule,HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8773690498021691',
      adSlot: 3125507431,
    }),
    MatButtonModule, MatCheckboxModule,
    MatButtonModule,MatSlideToggleModule,MatSelectModule ,
    MatMenuModule,MatAutocompleteModule,MdlModule , MdlLayoutModule , MdlButtonModule,
    MatToolbarModule,MatOptionModule,MatInputModule,
    MatIconModule,MatFormFieldModule,MatPseudoCheckboxModule,MatButtonToggleModule,
    MatExpansionModule,MatTableModule,MatSortModule,MatGridListModule,MatRippleModule,MatLineModule,
    MatCardModule,ReactiveFormsModule,MatRadioModule,MatPaginatorModule,MatStepperModule,
    routes
  ],
  exports: [
    MatButtonModule,TranslateModule,MatGridListModule,MatRippleModule,MatLineModule,
    MatMenuModule,ReactiveFormsModule,MatAutocompleteModule,
    MatToolbarModule,MatSlideToggleModule,BrowserAnimationsModule,MatSelectModule ,
    MatExpansionModule,MatTableModule,MatSortModule,MdlModule , MdlLayoutModule , MdlButtonModule,
    MatIconModule,MatFormFieldModule,MatPseudoCheckboxModule,MatButtonToggleModule,
    MatCardModule,MatOptionModule,MatInputModule,MatRadioModule,MatPaginatorModule,
  ],
  
  providers: [AuthGuard , GetfirebaseService, AngularFireDatabase, FeedServiceService , SortServiceService],
  bootstrap: [  AppComponent]
})

export class AppModule { }
