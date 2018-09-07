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

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

declare var componentHandler: any;
declare var window : any;
@Component({
  selector: 'app-estart',
  templateUrl: './estart.component.html',
  styleUrls: ['./estart.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@fallIn]': ''}
})
export class EstartComponent implements OnInit {
  sub: { [key: string]: any; };
  itm:any;

  image:any;
  eId:any;
  organization:any;
  examcode:any;
  detail:any;
  time:any;
  noq:any;
fid:any;
ufid: string;
admin:any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  contactFormControl = new FormControl('', [
    Validators.required,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
      
  constructor(public activeRoute: ActivatedRoute ,  public af: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { 
    this.af.authState.subscribe(auth => {
      if(auth) {
        this.fid = auth;
        console.log(auth);    
        db.object('user/'+auth.uid+'/info').snapshotChanges().subscribe(action => {
          console.log(action.type);
          console.log(action.key);
          console.log(action.payload.val());
          this.admin = action.payload.val();
        });    
      }
    });
  }
  
  onSubmit(value: any){
    console.log(this.fid);
    
    this.ufid = this.fid.uid;
    const items = this.db.database.ref().child("user").child(this.ufid).child(this.examcode);
    items.set(value)
    
    console.log(value.id ,value.name , value.email , value.contact );
    this.navigate(value);
  }
  ngOnInit() {
    this.eId = this.activeRoute.snapshot.params['eid'];
    this.examcode = this.activeRoute.snapshot.params['examcode'];
    this.organization = this.activeRoute.snapshot.params['organization'];
    this.image = this.activeRoute.snapshot.params['image'];
    this.detail = this.activeRoute.snapshot.params['detail'];
    this.time = this.activeRoute.snapshot.params['time'];
    this.noq = this.activeRoute.snapshot.params['noq'];
    console.log(this.eId);
    console.log(this.examcode);
    console.log(this.organization);
    console.log(this.image);
    console.log(this.detail);
    console.log(this.time);
    console.log(this.noq);
    this.activeRoute.queryParams
    .subscribe(e => {
        this.sub= e;
   //     this.itm = this.sub
      console.log(this.sub)
      // Defaults to 0 if no query param provided.
   //   this.page = +params['page'] || 0;
    });
    
  //  console.log(this.sub);
  }
  navigate($value){
    console.log(this.examcode);
    
     this.router.navigate(['examcorner',"yourexam",this.examcode,$value.id ,$value.name , $value.email , $value.contact,this.time , this.organization],{ queryParams: { itemsRefKey:this.examcode}});
  }
  ngAfterViewInit(){
    //  componentHandler.upgradeAllRegistered();
    componentHandler.upgradeAllRegistered();

      ( function() {
          if (window.CHITIKA === undefined) { window.CHITIKA = { 'units' : [] }; };
          var unit = {"calltype":"async[2]","publisher":"Sunny6142","width":300,"height":600,"sid":"Chitika Default"};
          var placement_id = window.CHITIKA.units.length;
          window.CHITIKA.units.push(unit);
 //         document.getElementById('method13').innerHTML = ('<div id="chitikaAdBlock-' + placement_id + '"></div>');
      }());
        
  
        ( function() {
            if (window.CHITIKA === undefined) { window.CHITIKA = { 'units' : [] }; };
            var unit = {"calltype":"async[2]","publisher":"Sunny6142","width":300,"height":600,"sid":"Chitika Default"};
            var placement_id = window.CHITIKA.units.length;
            window.CHITIKA.units.push(unit);
    //        document.getElementById('method14').innerHTML = ('<div id="chitikaAdBlock-' + placement_id + '"></div>');
        }());
    }

}
