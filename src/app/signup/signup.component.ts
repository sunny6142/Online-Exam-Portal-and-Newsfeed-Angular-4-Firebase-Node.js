import { Component, OnInit } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {AngularFireModule} from 'angularfire2';
// for auth    
import {AngularFireAuthModule} from 'angularfire2/auth';
// for database
import {AngularFireDatabaseModule , AngularFireDatabase} from 'angularfire2/database';
// for auth
import { AngularFireAuth } from 'angularfire2/auth';

// for Observables
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animation';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

declare var componentHandler: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
 // host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {
  Inst: string;
  items: Observable<Observable<any[]>>;
  itemsRef : any;
  insSelect = '';
 // state: string = '';
  error: any;
  email: any;
  password: any;
  msg: any;
  selected = new FormControl('valid', [
    Validators.required
  ]);
  admin :boolean = false;
  constructor(public af: AngularFireAuth, private db: AngularFireDatabase ,private router: Router) {
    this.af.authState.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/user');
      }else{
        this.admin = true;
      }
    });
    this.Inst = '';
  }

  matcher = new MyErrorStateMatcher();

  mloginnav(){
    this.router.navigate(['/mobilelogin']);
  }
  signupnav(){
    this.router.navigate(['/signup']);
  }

  Select(value){
    if(value === "Institution"){
      this.Inst = 'Institution';
    } else if(value === "Teacher"){
      this.Inst = 'Teacher';

      this.insSelect = "Pls Wait";
    //  this.itemsRef = this.db.list('Institution');
      // console.log(this.itemsRef);
    }
    else{
      this.Inst = 'Student';
    }
  }

  onSubmit(formData) {
    this.msg = "Pls Wait";
    if(formData.valid) {
   //   console.log(formData.value);
      if(this.Inst == 'Institution'){
          this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
          .then((user) => {
          //  this.af.authState = user;
        
              this.db.database.ref().child("user").child(user.uid).child("info").set(formData.value);
              this.db.database.ref().child("user").child(user.uid).child("info").update({balance : 500});
              
                  this.db.database.ref().child("Institution").child(user.uid).child("info").set(formData.value);
                  this.router.navigate(['/user']); 
            
          })
          .catch(
            (err) => {
              this.msg = '';
            console.log(err);
            this.error = err;
          })
        } else{
          this.af.auth.createUserWithEmailAndPassword(formData.value.user+"@allexamcorner.com", formData.value.password)
          .then((user) => {
          //  this.af.authState = user;
        
                  this.db.database.ref().child("Student").child(user.uid).child("info").set(formData.value);
                  const items2 = this.db.database.ref().child("user").child(user.uid).child("info");
                  items2.set(formData.value);
                  items2.child("date").set(firebase.database.ServerValue.TIMESTAMP);
                  items2.child("adminid").set("qnqQ8mhJOrd2OIImgamcO3b3tH93");
                  items2.child("Institution").set("AEC");
                  items2.child("state").set("Student");
                  items2.child("fee").set("unpaid");
                  items2.child("amount").set("0");
                  items2.child("status").set("unactive");
                  this.router.navigate(['/user']);   
            
          })
          .catch(
            (err) => {
              this.msg = '';
            console.log(err);
            this.error = err;
          })
        }
    }
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    componentHandler.upgradeAllRegistered();
  }
}
