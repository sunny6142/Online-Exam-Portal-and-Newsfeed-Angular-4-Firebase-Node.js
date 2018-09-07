import { Component, OnInit } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {AngularFireModule} from 'angularfire2';
// for auth    
import {AngularFireAuthModule} from 'angularfire2/auth';
// for database
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireAction, AngularFireList } from 'angularfire2/database';
// for auth
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthGuard} from '../auth.service';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animation';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {FormControl} from '@angular/forms';
import { GetfirebaseService } from '../getfirebase.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Subject } from 'rxjs/Subject';
import { FirebaseListObservable } from "angularfire2/database-deprecated";

import { ActivatedRoute } from "@angular/router";

import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import { Input, OnDestroy, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Validators} from '@angular/forms';
import {ElementRef, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { Pipe, PipeTransform, AfterViewInit } from '@angular/core';
import { Http } from "@angular/http/http";

declare var componentHandler: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
})

export class LoginComponent implements OnInit,AfterViewInit {
  error: any;
  msg : string;
  state: string = '';
  email: any;
  password: any;
  laginP="Student";
  admin :boolean = false;
  constructor(public af: AngularFireAuth, private db: AngularFireDatabase ,private router: Router) {

    this.af.authState.subscribe(auth => { 
    if(auth) {
      this.router.navigateByUrl('/user');
      
    }
    else{
      this.admin = true;
    }
  });
  
}
loginstate(val){

  if(val == "Student"){
    this.laginP="Student";
  }else{
    this.laginP="Institution";
  }
}

ngAfterViewInit(){
  componentHandler.upgradeDom();
  componentHandler.upgradeAllRegistered();
 // componentHandler.upgradeElement();
//  componentHandler.upgradeElement();
}

loginFb() {
    const provider = new firebase.auth.FacebookAuthProvider()
    this.af.auth.signInWithPopup(provider)
    .then((credential) =>  {
     //   this.af.authState = credential.user;
        this.router.navigate(['/user']);
    })
    .catch(
      (err) => {
        this.error = err;
      }
    );
}

loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
 this.af.auth.signInWithPopup(provider)
  .then((credential) =>  {
    //  this.af.authState = credential.user;
      this.router.navigate(['/user']);
  })
  .catch(
    (err) => {
      this.error = err;
    }
  );
}

  ngOnInit() {
  }

  onSubmit(formData) { 
    this.msg ='Pls Wait ...'
    if(formData.valid) {
      ////////
      if(this. laginP == "Student") {
        return this.af.auth.signInWithEmailAndPassword(formData.value.user + "@allexamcorner.com", formData.value.password)
        .then((user) => {
          
          console.log(user);
          this.router.navigate(['/user']);
          this.msg ='';
        })
      .catch(
          (err) => {
          console.log(err);
          this.error = "User not found";
          this.msg ='';
        }) 
      }
      else { 
        return this.af.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
          .then((user) => {
            
            console.log(user);
            this.router.navigate(['/user']);
            this.msg ='';
          })
        .catch(
            (err) => {
            console.log(err);
            this.error = err;
            this.msg ='';
          }) 
      }
     
    }
    else{
      this.msg ='Invalid Detail !!!';
    }
  }

}
