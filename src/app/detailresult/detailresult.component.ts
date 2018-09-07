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
import { Router, ActivatedRoute } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animation';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {FormControl} from '@angular/forms';
import { GetfirebaseService } from '../getfirebase.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Subject } from 'rxjs/Subject';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import {PageEvent} from '@angular/material';

declare var componentHandler: any;
declare var window : any;

@Component({
  selector: 'app-detailresult',
  templateUrl: './detailresult.component.html',
  styleUrls: ['./detailresult.component.css']
})
export class DetailresultComponent implements OnInit {
  selectquestionmarks: any;

  save_total: any;
  initialize_marks: any;
  organization: any;
  total: number;

  time: any;
  submarks: number;
  test: number;
  sec_no: number;
  SaveRef: any;
  currentmarks: any;
  contact: any;
  email: any;
  name: any;
  id: any;


  countDown: Observable<number>;
  count :number;  //sec
  sec ;
  min;
  hr;
  Math: any;
  val:number;
  items: Observable<Observable<any[]>>;
  itemsRef : any;
  sectioncode: any;
  selectsect: Observable<Observable<any[]>>;
  selectsectRef : any;
  qno = 1;
  selectquestion: Observable<Observable<any[]>>;
  selectquestionRef : any;
  seasons : any[];
  Exam:FirebaseListObservable<any[]>;
  ExamList:FirebaseListObservable<any[]>;
  startAt = new Subject();
  endAt = new Subject();
  lastKeypress: number = 0;

  Ques:FirebaseListObservable<any[]>;
  QuesList:FirebaseListObservable<any[]>;
  cat : any;
  ref1 : any;
  ref2 : any;
  examcode : any ;
  favoriteSeason: string;

  Menu : string;
  counter = Array;
   SRS = new Map();
  uid:string;
  
  submarks_mask = new Map();
  Marks = new Map();
  nav: number = 1;
  constructor(public activeRoute: ActivatedRoute ,private ExamSvc: GetfirebaseService , public af: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { 
  
    this.Menu = "Menu";
    this.qno = 1;
    this.total = 0;

    this.examcode = this.activeRoute.snapshot.params['examcode'];
    this.id = this.activeRoute.snapshot.params['uid'];

    console.log("++++++", this.id );
    
    this.count = 60 * parseInt(this.time);
    
    this.seasons = ['A', 'B' , 'C', 'D']
    this.Math = Math;
    this.af.authState.take(1).subscribe(auth => {
          if(auth) {
            this.uid = auth.uid;
            console.log(auth.uid)
       
            }
    });
   

     this.selectsectRef = this.db.list('corner/startyourexam/'+this.examcode+'/subsection');
    //   console.log(this.itemsRef);
      this.selectsect = this.selectsectRef.snapshotChanges().take(1).map(changes => {
        return changes.map(c => ({ key: c.payload.key, subcode: c.payload.val().code,
                                  subject: c.payload.val().subject, marks: c.payload.val().marks
        }));
      });
      
  }

  ngAfterViewInit(){
    componentHandler.upgradeAllRegistered();
    this.countDown = Observable.timer(0,1000)
    .take(this.count)
    .map(()=> --this.count);

   
    ( function() {
        if (window.CHITIKA === undefined) { window.CHITIKA = { 'units' : [] }; };
        var unit = {"calltype":"async[2]","publisher":"Sunny6142","width":320,"height":50,"sid":"Chitika Default"};
        var placement_id = window.CHITIKA.units.length;
        window.CHITIKA.units.push(unit);
        document.getElementById('method15').innerHTML =('<div id="chitikaAdBlock-' + placement_id + '"></div>');
    }());
    
  
  }

  ngOnInit() {
 
  }

  selectcat(i: number , $sub){
    this.qno = 1;
  //  this.KEY1 = [this.sectioncode,this.qno];
    this.sectioncode = $sub.subcode;
    this.currentmarks = $sub.marks;
    this.Menu = $sub.subject;
    this.sec_no = i+1;
    
    if( this.SRS.has(this.sectioncode+(this.qno-1)) )
      {
        this.favoriteSeason = this.SRS.get(this.sectioncode+(this.qno-1))[0];
      }
      else{
        this.favoriteSeason = "none";
      }

    console.log($sub.subcode);
    this.selectquestionRef = this.db.list('corner/startyourexam/'+this.examcode+'/'+$sub.subcode);
    //   console.log(this.itemsRef);
      this.selectquestion = this.selectquestionRef.snapshotChanges().take(1).map(changes => {
        return changes.map(c => ({ key: c.payload.key, 
                                  correctoptions: c.payload.val().correctoptions, question: c.payload.val().question,
                                  description: c.payload.val().description,
                                  marks: c.payload.val().marks, qno: c.payload.val().qno, options: c.payload.val().options,
                                  
        }));
      });

      this.selectquestionmarks = this.db.list('user/'+this.id+'/yourgivenexam/'+this.examcode+'/marks') ;
      
            this.selectquestionmarks.snapshotChanges().take(1).subscribe(u=>{
             u.map(r=>{
              this.Marks.set($sub.subcode+r.payload.val().qno,[r.payload.val().marks,r.payload.val().ans]);
           //   console.log("SET",$sub.subcode+r.payload.val());
      //        console.log(r);
             })
            })
  }
  GetMarks(sectioncode , qno) {
    
    if(this.Marks.has(sectioncode+qno)){
      if(this.Marks.get(sectioncode+qno)[0] > 0){
        return '<span style="color:green">Marks Obtained :'+ this.Marks.get(sectioncode+qno)[0] +'</span>';
      } 
      else
        return '<span style="color:red">Marks Obtained :'+ this.Marks.get(sectioncode+qno)[0] +'</span>';
    
    }
    else {
      return '<span style="color:red">Marks Obtained : 0</span>';
    }
  }
  GetSelectedOption(sectioncode , qno) {
    
    if(this.Marks.has(sectioncode+qno)){
      if(this.Marks.get(sectioncode+qno)[0] > 0) {
        return ' <span style="color:green">Selected Option :'+this.Marks.get(sectioncode+qno)[1]+'</span>';
      }
      else {
        return '<span style="color:red">Selected Option :'+this.Marks.get(sectioncode+qno)[1]+'</span>';
      }
    }
    else {
      return '<span style="color:red">Selected Option : Not Attempt</span>';
    }
  }
}
