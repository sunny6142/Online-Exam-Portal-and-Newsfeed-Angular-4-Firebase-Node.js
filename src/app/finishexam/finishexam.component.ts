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
import {FormControl} from '@angular/forms';
import { GetfirebaseService } from '../getfirebase.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Subject } from 'rxjs/Subject';
import { FirebaseListObservable } from "angularfire2/database-deprecated";

import { ActivatedRoute } from "@angular/router";

import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import { ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Validators} from '@angular/forms';
import { Upload } from "../shared/upload";
import { UploadService } from "../shared/upload.service"
import * as _ from "lodash";

declare var window : any;
declare var componentHandler: any;
@Component({
  selector: 'app-finishexam',
  templateUrl: './finishexam.component.html',
  styleUrls: ['./finishexam.component.css']
})
export class FinishexamComponent implements OnInit {
  val: any;

  constructor(public activeRoute: ActivatedRoute ,private ExamSvc: GetfirebaseService , public af: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    
    this.val = this.activeRoute.snapshot.params['q'];
  }

  ngOnInit() {
  }
  home(){
    this.router.navigate(['user']);
  }
  logout(){
  //  this.router.navigate(['']);
    this.af.auth.signOut();
   // this.router.navigate(['/']);
    window.location.replace('/login');
  //  this.router.navigateByUrl('/login');
  }
  ngAfterViewInit(){
      componentHandler.upgradeAllRegistered();
      
        ( function() {
            if (window.CHITIKA === undefined) { window.CHITIKA = { 'units' : [] }; };
            var unit = {"calltype":"async[2]","publisher":"Sunny6142","width":300,"height":600,"sid":"Chitika Default"};
            var placement_id = window.CHITIKA.units.length;
            window.CHITIKA.units.push(unit);
            document.getElementById('method16').innerHTML =('<div id="chitikaAdBlock-' + placement_id + '"></div>');
        }());
        
        ( function() {
            if (window.CHITIKA === undefined) { window.CHITIKA = { 'units' : [] }; };
            var unit = {"calltype":"async[2]","publisher":"Sunny6142","width":300,"height":600,"sid":"Chitika Default"};
            var placement_id = window.CHITIKA.units.length;
            window.CHITIKA.units.push(unit);
            document.getElementById('method17').innerHTML =('<div id="chitikaAdBlock-' + placement_id + '"></div>');
        }());
        
        ( function() {
            if (window.CHITIKA === undefined) { window.CHITIKA = { 'units' : [] }; };
            var unit = {"calltype":"async[2]","publisher":"Sunny6142","width":728,"height":90,"sid":"Chitika Default"};
            var placement_id = window.CHITIKA.units.length;
            window.CHITIKA.units.push(unit);
            document.getElementById('method18').innerHTML =('<div id="chitikaAdBlock-' + placement_id + '"></div>');
        }());
     
    }
}
