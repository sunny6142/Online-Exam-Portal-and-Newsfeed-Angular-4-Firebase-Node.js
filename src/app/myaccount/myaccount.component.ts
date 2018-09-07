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
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database-deprecated";

import { ActivatedRoute } from "@angular/router";

import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import { Input, OnDestroy, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Validators} from '@angular/forms';
import {ElementRef, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort , MatTableDataSource } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { Pipe, PipeTransform } from '@angular/core';
import { Http } from "@angular/http/http";
import { firebaseConfig } from "../app.module";
//import {MatTableDataSource} from '@angular/material';

declare var componentHandler: any;


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css'],
 
  animations: [moveIn(), fallIn(), moveInLeft()],

})

export class MyaccountComponent implements OnInit {
  count: number;
  tempresult: FirebaseListObservable<any>;
  talval: number;
  stotal: number;
  a: number;
  ALlR: any;
  total_m: number;
  gtotal: number;
  copyrank: UserData[];

  copyitemstr: Observable<any[]>;
  info: Observable<{}>;
  error: any;
  t: number;
  Resultstage3: any;
  Resultstage2: any;
  Resultstage1: any;
  ResultLT = new Map();

  resulttable = [];
  makrttable = [];
  nstrelt: any;
  nexamcat: any;
  nstval: any;
  Result_ST = new Map();
  Result_Rank = new Map();
  Result_QN = new Map();
  myresulttabel: Observable<{ key: string; sub: any; name: any; email: any; total_mark: any; phone: any; cat: any; }[]>;
  itemmyresulttabel: AngularFireAction<firebase.database.DataSnapshot>[];
  itemmyresult: Observable<{ key: string; sub: any; name: any; email: any; total_mark: any; phone: any; cat: any; }[]>;

  stre: AngularFireAction<firebase.database.DataSnapshot>;
  stResult: AngularFireList<{}>;
  nstResult : any;
  selectquestion: Observable<Observable<any[]>>;
  selectquestionRef : any;
  ShowRank: boolean = false;
  itemsRef : any;
  items: Observable<any[]>;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  Exam:FirebaseListObservable<any[]>;
  GetMyResult :FirebaseListObservable<any[]>;
  ExamList:FirebaseListObservable<any[]>;
  startAt = new Subject();
  endAt = new Subject();
  startmyResultAt = new Subject();
  endmyResultAt = new Subject();
  lastKeypress: number = 0;
  A:any;
  queryParams:any;
  itemstr: Observable<any[]>;
  tiles = [
    {text: 'Student Result', cols: 3, rows: 1, color: 'lightblue' , sec: 'result' ,view:' View Result'},
    {text: 'Your Result', cols: 1, rows: 2, color: 'lightgreen', sec: 'yrresult' ,view:' Your Result'},
    {text: 'Start A Series', cols: 1, rows: 1, color: 'lightpink', sec: 'series' ,view:' Start Series'},
    {text: 'Edit An Exam', cols: 2, rows: 1, color: '#DDBDF1', sec: 'editexam' ,view:' Edit Ques.'},
  ];
  
  tabsection: boolean;
  tabresult: boolean;
  tabseries: boolean;
  tabeditexam: boolean;
  myresult: boolean;
  select_myresult: boolean;
  addstudent = false;
  uid: string;
  name:string = "";
  pass:string = "";
  contac:string = "";
  userid:string = "";
  msg: string;
  chmak = new Map();
  std:string = "Student";
  institution = "";
  admin : any;
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  Rank: UserData[] = [];  

  size$: BehaviorSubject<string|null>;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ExamSvc: GetfirebaseService , public af: AngularFireAuth, public db: AngularFireDatabase, private router: Router) {
    
    this.af.authState.subscribe(auth => {
          if(auth) {
             this.uid = auth.uid;
             db.object('user/'+auth.uid+'/info').snapshotChanges().take(1).subscribe(action => {
               console.log(action.type);
               console.log(action.key);
               console.log(action.payload.val());
               this.institution = action.payload.val().institution;
               this.admin = action.payload.val();
             });
          }
        });
        this.tabsection = true;
      
        this.msg ='';
   }
   
   
  
  sortType(sort: string){
    this.ShowRank = true
    if(sort== 'name'){
      this.copyitemstr = this.itemstr
      this.itemstr = this.copyitemstr.map((data) => {
                              data.sort((a, b) => {
                            
                                    return (this.ResultLT.get(a.key)) > this.ResultLT.get(b.key) ? -1 : 1;
                                  
                                  
                              //  else return 1;
                              });
                              return data;
                          }); 
          //                this.copyrank = this.Rank;
      /*  this.Rank = this.copyrank.sort((a, b) => {
                      if (a.name < b.name) return -1;
                      else if (a.name > b.name) return 1;
                      else return 0;
                    });        */ 
               
         
    }
  }
  ngOnInit() {
    this.Exam = this.ExamSvc.getResult(this.uid,this.startAt, this.endAt);
    this.GetMyResult = this.ExamSvc.getMyResult(this.uid,this.startmyResultAt, this.endmyResultAt);
    componentHandler.upgradeAllRegistered();
    //   console.log(this.itemsRef);
   
/*
    if(!this.itemstr.isEmpty())
      console.log( this.stResult);
     
     
      this.stResult.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
  //        console.log(action.type);
   //       console.log(action.key);
   //       console.log(action.payload.val());
           
        });
      });
      */
     
  }
  
  search($event) {
      this.tabsection = true;
      this.tabresult = false;
      this.tabseries = false;
      this.tabeditexam = false;
      this.addstudent = false;
      this.myresult = false;
      this.select_myresult = false;

      if ($event.timeStamp - this.lastKeypress > 200) {
        let q = $event.target.value
        this.startAt.next(q)
        this.endAt.next(q+"\uf8ff")
      }
      this.lastKeypress = $event.timeStamp
  }

  searchEdit($event) {
      this.tabsection = false;
      this.tabresult = false;
      this.tabseries = false;
      this.tabeditexam = true;
      this.addstudent = false;
      this.myresult = false;
      this.select_myresult = false;

      if ($event.timeStamp - this.lastKeypress > 200) {
        let q = $event.target.value
        this.startAt.next(q)
      //  this.endAt.next(q);
        this.endAt.next(q+"\uf8ff")
      }
      this.lastKeypress = $event.timeStamp
  }

  searchmyresult($event) {
      this.tabsection = false;
      this.tabresult = false;
      this.tabseries = false;
      this.addstudent = false;
      this.tabeditexam = false;
      this.myresult = false;
      this.select_myresult = true;
      
      if ($event.timeStamp - this.lastKeypress > 200) {
        let q = $event.target.value
        this.startmyResultAt.next(q)
      //  this.endAt.next(q);
        this.endmyResultAt.next(q+"\uf8ff")
      }
      this.lastKeypress = $event.timeStamp
   //   this.GetMyResult.subscribe(c=>console.log(c))
  }

  onGoMyResult(value: string){
    // alert(value.padStart);
    this.tabsection = false;
    this.tabresult = false;
    this.tabseries = false;
    this.tabeditexam = false;
    this.addstudent = false;
    this.myresult = false;
    this.select_myresult = true;
      let q = value;
      this.startmyResultAt.next(q);
    // this.endAt.next(q);
      this.endmyResultAt.next(q+"\uf8ff")
      //   this.ExamList = this.ExamSvc.getSearchResult(this.startAt, this.endAt);
    }
onGo(value: string){
  // alert(value.padStart);
  this.tabsection = true;
  this.tabresult = false;
  this.tabseries = false;
  this.addstudent = false;
  this.tabeditexam = false;
  this.myresult = false;
  this.select_myresult = false;
    let q = value;
    this.startAt.next(q);
  // this.endAt.next(q);
    this.endAt.next(q+"\uf8ff")
    //   this.ExamList = this.ExamSvc.getSearchResult(this.startAt, this.endAt);
  }
  onGoEdit(value: string){
    // alert(value.padStart);
    this.tabsection = false;
    this.tabresult = false;
    this.tabseries = false;
    this.tabeditexam = true;
    this.addstudent = false;
    this.myresult = false;
    this.select_myresult = false;
      let q = value;
      this.startAt.next(q);
    // this.endAt.next(q);
      this.endAt.next(q+"\uf8ff")
  }
  EditExam(item){
    this.router.navigate(['setQuestion',"yourexam",item.examcode],{ queryParams: { itemsRefKey:item.examcode}});
  }

  ViewMyResult(item){
    this.ResultLT.clear();
    this.tabsection = false;
    this.tabresult = false;
    this.tabseries = false;
    this.tabeditexam = false;
    this.myresult = true;
    this.addstudent = false;
    this.select_myresult = false;
    this.stResult = this.db.list('corner/startyourexam/'+item.examcode+'/result');
    
        this.itemstr =  this.stResult.snapshotChanges().take(1)
          .map(changes =>{
            return changes.map(c=>({
              key: c.payload.key, sub: c.payload.val().sub , name: c.payload.val().name , email: c.payload.val().email ,
              total_mark: c.payload.val().total_mark , phone: c.payload.val().phone ,cat: c.payload.val().cat , examcode: item.examcode
            }))
          });
  }
  viewResult(item){
    this.ResultLT.clear();
    this.tabsection = false;
    this.tabresult = true;
    this.tabseries = false;
    this.tabeditexam = false;
    this.myresult = false;
    this.select_myresult = false;
    this.addstudent = false;

    this.size$ = new BehaviorSubject(null);
    
    this.stResult = this.db.list('corner/startyourexam/'+item.examcode+'/result');

    this.itemstr =  this.stResult.snapshotChanges().take(1)
      .map(changes =>{
        return changes.map(c=>({
          key: c.payload.key, sub: c.payload.val().sub , name: c.payload.val().name , email: c.payload.val().email ,
          total_mark: c.payload.val().total_mark , phone: c.payload.val().phone ,cat: c.payload.val().cat , examcode: item.examcode
        }))
      });
  }
  filterBy(size: string|null) {
    this.size$.next(size);
  }
  DetailResult(uid , examcode){
  //  console.log(uid , examcode);
   // this.router.navigate(['DetailResult',uid,examcode]);
  //  this.router.navigateByUrl('DetailResult/'+uid+'/'+examcode);
    var newWindow = window.open('DetailResult/'+uid+'/'+examcode);
   // newWindow.location = 'DetailResult/'+uid+'/'+examcode;
   }

  GetSub(itms, key , subcode){
 //   
    let total = 0;
      if(!this.ResultLT.has(key+subcode) && subcode){
    //    console.log("=>"+subcode +itms + key);
        this.ResultLT.set(key+subcode, 0); 
        this.ExamSvc.getMResult(key,itms.examcode, subcode)
        .subscribe(val=>{
          val.forEach(element => {
            console.log(element.marks),
            + parseInt(element.marks),
              this.ResultLT.set(key+subcode, this.ResultLT.get(key+subcode)+ parseInt(element.marks))
          })
        },(e)=>{ console.log("Check your Internet conetion")}
        ,()=>console.log("complete"))
        return this.ResultLT.get(key+subcode); 
      } 
      else{
        return this.ResultLT.get(key+subcode); 
      }
  }

  GetTotal(itms , key){
    let total = 0;
    if(!this.ResultLT.has(key)){
   //   console.log("=>" +itms + key);
      this.ResultLT.set(key, 0); 
      this.ExamSvc.getMResult(key,itms.examcode, null)
      .subscribe(val=>{
        val.forEach(element => {
          console.log(element.marks),
          + parseInt(element.marks),
            this.ResultLT.set(key, this.ResultLT.get(key)+ parseInt(element.marks))
        })
      },(e)=>{ console.log("Check your Internet conetion")}
      ,()=>console.log("complete"))
      return this.ResultLT.get(key); 
    } 
    else{
      return this.ResultLT.get(key); 
    }
  }

  startExam(item){
    // this.queryParams =  {detail:[item.detail]};
   // console.log(item);
    item.id = "#hjjjhjhu";
    item.image = "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg";
   // this.router.navigate(['estart',item.id,item.examcode,
    this.router.navigate(['estart',item.id,item.examcode,
      item.organization,item.image,item.detail,item.time,item.noq
    ],{queryParams: item.instruction });
  }

  PaymentRequest(){
   
  }
  AddStd(){
    this.addstudent = true;
    this.tabsection = false;
    this.tabresult = false;
    this.tabseries = false;
    this.tabeditexam = false;
    this.myresult = false;
    this.select_myresult = false;
  }

  AddUser(value: any, userform ){
    componentHandler.upgradeAllRegistered();
    this.msg = "wait .....";
  /* Initialize Firebase
  var config = {
    apiKey: "AIzaSyAfcEzbeqNcp1WCcn1F4iwry-E4dBMrYAI",
    authDomain: "allexamcorner.firebaseapp.com",
    databaseURL: "https://allexamcorner.firebaseio.com",
    projectId: "allexamcorner",
    storageBucket: "allexamcorner.appspot.com",
    messagingSenderId: "602202099265"
  };
  firebase.initializeApp(config);  */
  if(this.admin.balance >= 50){
    this.db.database.ref().child('user').child(this.uid).child('info').update({balance : parseInt(this.admin.balance) - 50});
  }
  else{
    alert("insufficient Balance! pls Contact @ 9169743022 / 7905510609");
    this.msg = "insufficient Balance! pls Contact @ 9169743022 / 7905510609";
    return true;
  }
  var secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary"+Math.random()+Math.random()+Math.random());
  secondaryApp.auth().createUserWithEmailAndPassword(value.email+'@allexamcorner.com', value.password).then((firebaseUser)=> {
      console.log("User " + firebaseUser.uid + " created successfully!");
      //I don't know if the next statement is necessary 
      const items = this.db.database.ref().child("user").child(this.uid).child("student").child(firebaseUser.uid).child("info");
      items.set(value);
      items.child("date").set(firebase.database.ServerValue.TIMESTAMP);
      items.child("adminid").set(this.uid);
      items.child("Institution").set(this.institution);
      items.child("state").set("Student");
      items.child("fee").set("paid");
      items.child("amount").set("50");
      items.child("status").set("active");
      const items2 = this.db.database.ref().child("user").child(firebaseUser.uid).child("info");
      items2.set(value);
      items2.child("date").set(firebase.database.ServerValue.TIMESTAMP);
      items2.child("adminid").set(this.uid);
      items2.child("Institution").set(this.institution);
      items2.child("state").set("Student");
      items2.child("fee").set("paid");
      items2.child("amount").set("50");
      items2.child("status").set("active");

      secondaryApp.auth().signOut();
      this.msg ='User Added';
      this.error = '';
      userform.resetForm();
  }).catch(
    (err) => {
    console.log(err);
    //this.error = err;
    this.error = "User Id is taken ! Try another user id";
    this.db.database.ref().child('user').child(this.uid).child('info').update({balance : parseInt(this.admin.balance) + 50});
    this.msg ='';
  })
     //   console.error('Error Creating new user in Auth: ', error);
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface UserData  {
  name: string;
  email: string;
  phone: string;
  total: string;
}

function createNewUser(name, email , phone, total): UserData {

  return {
    name: name,
    email: email,
    phone: total,
    total: total
  };
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];