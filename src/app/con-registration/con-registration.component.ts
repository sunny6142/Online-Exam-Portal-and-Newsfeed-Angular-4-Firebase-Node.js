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

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
declare var window : any;
declare var componentHandler: any;
@Component({
  selector: 'app-con-registration',
  templateUrl: './con-registration.component.html',
  styleUrls: ['./con-registration.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@fallIn]': ''},
  providers: [UploadService]
})
export class ConRegistrationComponent implements OnInit {
  queryParams: { detail: any[]; };
  Refstartyourexam: any;
  itemsRefK2: any;

  isLinear = false;
  uid:any;
  itemsRef : any;
  itemsRef2 : any;
  itemsRefKey: any;
  ERef : any;
  Key : any;
  key1 : any;
  key2 : any;
  key3 : any;
  key4 : any;
  key5 : any;

selectedFiles : FileList;
currentUpload : Upload;

  firstFormGroup = new FormGroup({
    organization : new FormControl(),
    name : new FormControl(), 
    email : new FormControl(), 
    contact : new FormControl(), 
  });
  secondFormGroup = new FormGroup({
    time: new FormControl(),
    noq: new FormControl(),
    sub : new FormGroup({
      sec1: new FormControl(), 
      sec2: new FormControl(), 
      sec3: new FormControl(), 
      sec4: new FormControl(), 
      sec5: new FormControl(), 
      noq1: new FormControl(), 
      noq2: new FormControl(), 
      noq3: new FormControl(), 
      noq4: new FormControl(), 
      noq5: new FormControl(), 
    })
    
  });
  
  ThiredFormGroup = new FormGroup({
    detail : new FormControl(), 
    instruction : new FormControl(),  
    tittle : new FormControl(), 
    category: new FormControl(),
  });
  constructor(private upSvc: UploadService, private _formBuilder: FormBuilder, public activeRoute: ActivatedRoute ,  public af: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { 
    this.af.authState.subscribe(auth => {
      if(auth) {
        console.log(auth);
        this.uid = auth.uid;        
      }
    });
    this.Key = null;
    this.key1 = null;
    this.key2 = null;
    this.key3 = null;
    this.key4 = null;
    this.key5 = null;
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      organization: ['', Validators.required],
      name: ['',Validators.compose([ Validators.required , Validators.maxLength(25) , Validators.minLength(5) ])],
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]) ],
      contact: ['', Validators.compose([Validators.required, Validators.maxLength(10) , Validators.minLength(10) , Validators.pattern("^[0-9]{10}$")]) ],
    });
    this.secondFormGroup = this._formBuilder.group({
      time: ['', Validators.compose([Validators.required, Validators.maxLength(3) , Validators.minLength(2) , Validators.pattern("^[0-9]*$")])],
      noq: ['', Validators.compose([Validators.required, Validators.maxLength(3) , Validators.minLength(1) , Validators.pattern("^[0-9]*$")])],
      sub: this._formBuilder.group({
        sec1: ['', Validators.required],
        sec2: ['', ],
        sec3: ['', ],
        sec4: ['', ],
        sec5: ['', ],
        noq1: ['', Validators.compose([Validators.required, Validators.maxLength(3) , Validators.minLength(1) , Validators.pattern("^[0-9]*$")])],
        noq2: ['', Validators.compose([ Validators.maxLength(3) , Validators.minLength(1) , Validators.pattern("^[0-9]*$")])],
        noq3: ['', Validators.compose([ Validators.maxLength(3) , Validators.minLength(1) , Validators.pattern("^[0-9]*$")])],
        noq4: ['', Validators.compose([ Validators.maxLength(3) , Validators.minLength(1) , Validators.pattern("^[0-9]*$")])],
        noq5: ['', Validators.compose([ Validators.maxLength(3) , Validators.minLength(1) , Validators.pattern("^[0-9]*$")])],
      })
    });
    
    this.ThiredFormGroup = this._formBuilder.group({
      detail: ['', Validators.required],
      tittle :['', Validators.required],
      category: ['', Validators.required],
      instruction: ['',Validators.compose([ Validators.required , Validators.maxLength(250) , Validators.minLength(10) ])],
    });
  }


  check()
  {
    //console.log(this.firstFormGroup.errors);
   // console.log(this.firstFormGroup.status);

    this.itemsRef = this.db.database.ref().child("user").child(this.uid).child("yourexam");
    this.itemsRefKey = this.db.database.ref().child("corner").child("yourexam");
   /// items.push(this.firstFormGroup.value[0])

    var newRef = this.itemsRefKey.push();
   // var newKey = newRef.key();
   if(this.Key == null) {
    this.Key = newRef.path.pieces_[2];
   }
   this.itemsRef.child(this.Key).set(this.firstFormGroup.value)
   this.itemsRefKey.child(this.Key).set(this.firstFormGroup.value)
   console.log(newRef.path);
    console.log(newRef.path.pieces_);
    console.log(newRef.path.pieces_[2]);
   // var realRef = ref.child("myPrefix_"+newKey);
  }

  check2()
  {
    this.itemsRef.child(this.Key).child("time").set(this.secondFormGroup.value.time);
    this.itemsRef.child(this.Key).child("noq").set( this.secondFormGroup.value.noq);
    this.itemsRef.child(this.Key).child("examcode").set( this.Key);
    
    this.itemsRefKey.child(this.Key).child("time").set(this.secondFormGroup.value.time);
    this.itemsRefKey.child(this.Key).child("noq").set( this.secondFormGroup.value.noq);
    this.itemsRefKey.child(this.Key).child("examcode").set( this.Key);
    this.itemsRefKey.child(this.Key).child("uid").set( this.uid);

    this.ERef = this.db.database.ref().child("corner").child("startyourexam");
    /// items.push(this.firstFormGroup.value[0])
    this.itemsRef2 = this.itemsRef.child(this.Key).child("subsection");
    this.itemsRefK2 = this.itemsRefKey.child(this.Key).child("sub");
    this.Refstartyourexam = this.db.database.ref().child("corner").child("startyourexam").child(this.Key).child("subsection");
      
     if(this.key1 == null) {
      var newRef = this.ERef.push();
      this.key1 = newRef.path.pieces_[2];
     }
     if(this.secondFormGroup.value.sub.sec1 != "" && this.secondFormGroup.value.sub.noq1 != ""){
      this.itemsRef2.child(this.key1).child("code").set(this.key1);
      this.itemsRef2.child(this.key1).child("subject").set(this.secondFormGroup.value.sub.sec1);
      this.itemsRef2.child(this.key1).child("marks").set(this.secondFormGroup.value.sub.noq1);

      this.Refstartyourexam.child(this.key1).child("code").set(this.key1);
      this.Refstartyourexam.child(this.key1).child("subject").set(this.secondFormGroup.value.sub.sec1);
      this.Refstartyourexam.child(this.key1).child("marks").set(this.secondFormGroup.value.sub.noq1);

      this.itemsRefK2.child(1).set(this.secondFormGroup.value.sub.sec1);
     }
    
     if(this.key2 == null) {
      var newRef = this.ERef.push();
      this.key2 = newRef.path.pieces_[2];
     }
     if(this.secondFormGroup.value.sub.sec2 != "" && this.secondFormGroup.value.sub.noq2 != ""){
      this.itemsRef2.child(this.key2).child("code").set(this.key2);
      this.itemsRef2.child(this.key2).child("subject").set(this.secondFormGroup.value.sub.sec2);
      this.itemsRef2.child(this.key2).child("marks").set(this.secondFormGroup.value.sub.noq2);

      this.Refstartyourexam.child(this.key2).child("code").set(this.key2);
      this.Refstartyourexam.child(this.key2).child("subject").set(this.secondFormGroup.value.sub.sec2);
      this.Refstartyourexam.child(this.key2).child("marks").set(this.secondFormGroup.value.sub.noq2);

      this.itemsRefK2.child(2).set(this.secondFormGroup.value.sub.sec2);
     }
     
     if(this.key3 == null) {
      var newRef = this.ERef.push();
      this.key3 = newRef.path.pieces_[2];
     }
     if(this.secondFormGroup.value.sub.sec3 != "" && this.secondFormGroup.value.sub.noq3 != ""){
      this.itemsRef2.child(this.key3).child("code").set(this.key3);
      this.itemsRef2.child(this.key3).child("subject").set(this.secondFormGroup.value.sub.sec3);
      this.itemsRef2.child(this.key3).child("marks").set(this.secondFormGroup.value.sub.noq3);

      this.Refstartyourexam.child(this.key3).child("code").set(this.key3);
      this.Refstartyourexam.child(this.key3).child("subject").set(this.secondFormGroup.value.sub.sec3);
      this.Refstartyourexam.child(this.key3).child("marks").set(this.secondFormGroup.value.sub.noq3);

      this.itemsRefK2.child(3).set(this.secondFormGroup.value.sub.sec3);
     }

     if(this.key4 == null) {
      var newRef = this.ERef.push();
      this.key4 = newRef.path.pieces_[2];
     }
     if(this.secondFormGroup.value.sub.sec4 != "" && this.secondFormGroup.value.sub.noq4 != ""){
      this.itemsRef2.child(this.key4).child("code").set(this.key4);
      this.itemsRef2.child(this.key4).child("subject").set(this.secondFormGroup.value.sub.sec4);
      this.itemsRef2.child(this.key4).child("marks").set(this.secondFormGroup.value.sub.noq4);

      this.Refstartyourexam.child(this.key4).child("code").set(this.key4);
      this.Refstartyourexam.child(this.key4).child("subject").set(this.secondFormGroup.value.sub.sec4);
      this.Refstartyourexam.child(this.key4).child("marks").set(this.secondFormGroup.value.sub.noq4);

      this.itemsRefK2.child(4).set(this.secondFormGroup.value.sub.sec4);
     }

     if(this.key5 == null) {
      var newRef = this.ERef.push();
      this.key5 = newRef.path.pieces_[2];
     }
     if(this.secondFormGroup.value.sub.sec5 != "" && this.secondFormGroup.value.sub.noq5 != ""){
      this.itemsRef2.child(this.key5).child("code").set(this.key5);
      this.itemsRef2.child(this.key5).child("subject").set(this.secondFormGroup.value.sub.sec5);
      this.itemsRef2.child(this.key5).child("marks").set(this.secondFormGroup.value.sub.noq5);

      this.Refstartyourexam.child(this.key5).child("code").set(this.key5);
      this.Refstartyourexam.child(this.key5).child("subject").set(this.secondFormGroup.value.sub.sec5);
      this.Refstartyourexam.child(this.key5).child("marks").set(this.secondFormGroup.value.sub.noq5);

      this.itemsRefK2.child(5).set(this.secondFormGroup.value.sub.sec5);
     }
//    console.log(this.secondFormGroup.value);
  }

  check3()
  {
   // var newKey = newRef.key();
   if(this.Key != null) {
      this.itemsRef.child(this.Key).child("detail").set( this.ThiredFormGroup.value.detail);
      
      this.itemsRefKey.child(this.Key).child("detail").set(this.ThiredFormGroup.value.detail);
      this.itemsRef.child(this.Key).child("instruction").set( this.ThiredFormGroup.value.instruction);
      
      this.itemsRefKey.child(this.Key).child("instruction").set(this.ThiredFormGroup.value.instruction);

      //let time = firebase.database.ServerValue.TIMESTAMP;
      this.itemsRef.child(this.Key).child("date").set( firebase.database.ServerValue.TIMESTAMP );
      
      this.itemsRefKey.child(this.Key).child("date").set(firebase.database.ServerValue.TIMESTAMP );

      this.itemsRefKey.child(this.Key).child("tittle").set(this.ThiredFormGroup.value.tittle);
      this.itemsRef.child(this.Key).child("category").set( this.ThiredFormGroup.value.category);
      
   }
   else{
     alert("Previous Detail needed as Well");
   }
  
  }
  onSubmit(value: any){
  //  console.log(this.fid);
    
  //  this.ufid = this.fid.uid;
    const items = this.db.database.ref().child("user").child(this.uid).child("yourexam");
    items.push(this.firstFormGroup.value)
    
 //   console.log(value);
  }

  GoSetQuestion(){
     this.queryParams =  {detail:this.Key};
   

    this.router.navigate(['setQuestion',"yourexam",this.Key],{ queryParams: { itemsRefKey:this.Key}});
  }
  ngAfterViewInit(){
    componentHandler.upgradeAllRegistered();
 
    ( function() {
        if (window.CHITIKA === undefined) { window.CHITIKA = { 'units' : [] }; };
        var unit = {"calltype":"async[2]","publisher":"Sunny6142","width":300,"height":600,"sid":"Chitika Default"};
        var placement_id = window.CHITIKA.units.length;
        window.CHITIKA.units.push(unit);
        document.getElementById('method7').innerHTML = ('<div id="chitikaAdBlock-' + placement_id + '"></div>');
    }());
      

      ( function() {
          if (window.CHITIKA === undefined) { window.CHITIKA = { 'units' : [] }; };
          var unit = {"calltype":"async[2]","publisher":"Sunny6142","width":300,"height":600,"sid":"Chitika Default"};
          var placement_id = window.CHITIKA.units.length;
          window.CHITIKA.units.push(unit);
          document.getElementById('method8').innerHTML = ('<div id="chitikaAdBlock-' + placement_id + '"></div>');
      }());
  }
}
