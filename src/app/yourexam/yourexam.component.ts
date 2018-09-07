import { Component, OnInit } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {AngularFireModule} from 'angularfire2';
// for auth    
import {AngularFireAuthModule} from 'angularfire2/auth';
// for database
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
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

@Component({
  selector: 'app-yourexam',
  templateUrl: './yourexam.component.html',
  styleUrls: ['./yourexam.component.css'],
  animations: [ fallIn(), moveInLeft()],
  host: {'[@fallIn]': ''}
})
export class YourexamComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigate(){
    this.router.navigate(['/selectexam']);
  }
}
