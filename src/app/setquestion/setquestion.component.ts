import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
import 'firebase/storage'

import { Subject } from 'rxjs/Subject';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import {PageEvent} from '@angular/material';
import {Directive, ElementRef, OnChanges, Input} from "@angular/core";



//declare var firebase: any;

interface Image {
    path: string;
    filename: string;
    downloadURL?: string;
    $key?: string;
}
declare var componentHandler: any;
declare var MathJax:any;
declare var window : any;

@Component({
  selector: 'app-setquestion',
  templateUrl: './setquestion.component.html',
  styleUrls: ['./setquestion.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetquestionComponent implements OnInit {
  publishstatus: string = '';
  fileList: any;
 // fileList : FirebaseListObservable<Image[]>;
  Refstartyourexam: firebase.database.Reference;
  firebaseref: firebase.database.Reference;
  new_question :string;
  option_A : string;
  option_B : string;
  option_C : string;
  option_D : string;
  countDown: Observable<number>;
  count = 60;
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
  qno: number = 1;
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
  option : any;
  examcode : string;
  favoriteSeason: string;

  counter = Array;
   SRS = new Map();

   @Input() folder: string;
    uid:any;
 //  fileList : FirebaseListObservable<Image[]>;
imageList : Observable<Image[]>;

  constructor(private cd: ChangeDetectorRef, public activeRoute: ActivatedRoute , private ExamSvc: GetfirebaseService , public af: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.examcode = this.activeRoute.snapshot.params['examcode'];

    this.favoriteSeason = "Empty";
    this.option = "none";
    this.seasons = ['A', 'B' , 'C', 'D']
    this.Math = Math;
    this.af.authState.subscribe(auth => {
          if(auth) {
            this.uid = auth.uid;
            console.log(auth.uid)
       
            }
    });
    
    this.new_question = "";
    this.option_A = "";
    this.option_B = "";
    this.option_C = "";
    this.option_D = "";
   // console.log(this.examcode);
    this.firebaseref = this.db.database.ref();
    this.Refstartyourexam = this.firebaseref.child("corner").child("startyourexam");
/*   
    this.countDown = Observable.timer(0,1000)
    .take(this.count)
    .map(()=> --this.count);

    setTimeout((router: Router) => {
//this.router.navigate(['user']);

    }, this.count * 1000);
   */
  //  this.examcode = "-L-7Er1kCryz_2beepEy";
  //this.examcode = this.activeRoute.queryParams['token']
    if(this.examcode.toString() == "-L-7Er1kCryz_2beepEy"){
   //   alert("Match");
    }
          this.selectsectRef = this.db.list('corner/startyourexam/'+this.examcode +'/subsection');
       //   console.log(this.selectsectRef);

     /*     this.selectsectRef.snapshotChanges().take(1).subscribe(c=>
          console.log(c)
          ); */

        this.selectsect = this.selectsectRef.snapshotChanges().take(1).map(changes => {
          return changes.map(c => ({ key: c.payload.key, subcode: c.payload.val().code,
                                    subject: c.payload.val().subject, marks: c.payload.val().marks
          }));
        }); 
        db.object('corner/yourexam/'+this.examcode+'/').snapshotChanges().take(1).subscribe(action => {
          console.log(action.payload.val().publish),
          this.publishstatus = action.payload.val().publish;
        });
      

  }

  ngAfterViewInit(){
      componentHandler.upgradeAllRegistered();
     MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  
      MathJax.Hub.Config({
        tex2jax: {
            inlineMath: [['$','$'], ['\\(','\\)']],
            processEscapes: true
            }
      });

    
     
      ( function() {
        if (window.CHITIKA === undefined) { window.CHITIKA = { 'units' : [] }; };
        var unit = {"calltype":"async[2]","publisher":"Sunny6142","width":550,"height":250,"sid":"Chitika Default"};
        var placement_id = window.CHITIKA.units.length;
        window.CHITIKA.units.push(unit);
        document.getElementById('method11').innerHTML =('<div id="chitikaAdBlock-' + placement_id + '"></div>');
    }());
    
      ( function() {
          if (window.CHITIKA === undefined) { window.CHITIKA = { 'units' : [] }; };
          var unit = {"calltype":"async[2]","publisher":"Sunny6142","width":320,"height":50,"sid":"Chitika Default"};
          var placement_id = window.CHITIKA.units.length;
          window.CHITIKA.units.push(unit);
          document.getElementById('method10').innerHTML =('<div id="chitikaAdBlock-' + placement_id + '"></div>');
      }());
      ( function() {
        if (window.CHITIKA === undefined) { window.CHITIKA = { 'units' : [] }; };
        var unit = {"calltype":"async[2]","publisher":"Sunny6142","width":320,"height":50,"sid":"Chitika Default"};
        var placement_id = window.CHITIKA.units.length;
        window.CHITIKA.units.push(unit);
        document.getElementById('method12').innerHTML =('<div id="chitikaAdBlock-' + placement_id + '"></div>');
    }());
    
 
  }

  publish(){
    this.firebaseref.child('corner').child('yourexam').child(this.examcode).child('publish').set('publish');
    this.publishstatus = 'publish';
  }
  unpublish(){
    this.firebaseref.child('corner').child('yourexam').child(this.examcode).child('publish').set('unpublish');
    this.publishstatus = 'unpublish';
  }
  onchange( event){
  
       MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
   
       MathJax.Hub.Config({
         tex2jax: {
             inlineMath: [['$','$'], ['\\(','\\)']],
             processEscapes: true
             }
       }); 
  }

    upload() {
        // Create a root reference
        let storageRef = firebase.storage().ref();

        let success = false;
        // This currently only grabs item 0, TODO refactor it to grab them all
        for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
            console.log(selectedFile);
            // Make local copies of services because "this" will be clobbered
            let router = this.router;
            let af = this.af;
            let folder = this.folder;
            let path = `/${this.folder}/${selectedFile.name}`;
            var iRef = storageRef.child(path);
            iRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a blob or file! Now storing the reference at',`/${this.folder}/images/`);
                console.log(snapshot.downloadURL);
              //  this.db.list(`/${folder}/images/`).push({ path: path, filename: selectedFile.name })
            }).catch(error => console.log(error));
          
        }
        
}
  changequstion(val : number ){
  //  alert(val);
  this.option = "none";
    this.qno = val;
  //  this.KEY1 = [this.sectioncode,val];
   // console.log(this.Save);
   if( this.SRS.has(this.sectioncode+(this.qno-1)) )
    {
      this.favoriteSeason = this.SRS.get(this.sectioncode+(this.qno-1))[0];
     
    }
  }


  onSubmit(value: any){
    
    console.log(value);
    
  }
  SelectedOption(option : any){
    this.option = option;
  }

  ngOnInit() {
      var self = this;
      MathJax.Hub.Queue(
        ["Typeset",MathJax.Hub,"result"],
        function () { 
          self.updateResult();
          }
      );
  }

  
updateResult () {
  var resultDiv = document.getElementById("result");
  // Replace the rendered content entirely
  // with the bare text from the textarea.
  // Rerender the entire resultDiv
  MathJax.Hub.Queue(["Typeset",MathJax.Hub,"result"]);
}

  AddQuestion(qno: number){
    alert("kkk"+qno);
  }
  save(qno: number , val : any){
    
    if(this.option != "none") {
      
    //  console.log("val"+val.question_description);
      
//      if(val.question_description != undefined)
 //     {
        this.Refstartyourexam.child(this.examcode).child(this.sectioncode).child('_'+this.qno).set({
          correctoptions: this.option,
          qno:this.qno ,
          question: val.question,
          options : {
            A: val.A,
            B:val.B,
            C: val.C,
            D: val.D
          }
        });
//      }
  /*    else {
        this.Refstartyourexam.child(this.examcode).child(this.sectioncode).child('_'+this.qno).set({
          correctoptions: this.option,
          qno:this.qno ,
          question: val.question,
          options : {
            A: val.A,
            B:val.B,
            C: val.C,
            D: val.D
          }
        });
      } */
    /*  this.Refstartyourexam.child(this.examcode).child(this.sectioncode).child("AAA").child("options").set({
        A: val.A,
        B:val.B,
        C: val.C,
        D: val.D
      }); */
      this.cd.markForCheck();
      console.log(val);
      console.log("Val"+val.question);
      console.log("Val"+val.A);
      console.log("Val"+val.B);
      console.log("Val"+val.C);
      console.log("Val"+val.D);
      console.log("Val"+this.option);

       const KEY1 = [this.sectioncode+qno];
        this.SRS.set(this.sectioncode+(qno-1), [this.favoriteSeason, "green"]);
        console.log(this.SRS);
        if( this.SRS.has(this.sectioncode+(this.qno-1)) )
          {
            this.favoriteSeason = this.SRS.get(this.sectioncode+(this.qno-1))[0];
          }
    }
    else {
      alert("Please Select Correct Option")
    }
   
  //    this.qno++;
  }

  reminder(qno: number){
    const KEY1 = [this.sectioncode,qno];
    this.SRS.set(this.sectioncode+(qno-1), [this.favoriteSeason,"#F44336"]);
    console.log(this.SRS);
   
  //  this.qno++;
  }
  skip(qno: number){
    this.option = "none";
  //  const KEY1 = [this.sectioncode,qno];
    this.qno++
  //  this.SRS.set(this.sectioncode+(qno-1), [this.favoriteSeason,"#E91E63"]);
   // console.log(this.SRS);
   // let l;
   // console.log(this.selectquestion );
   if( this.SRS.has(this.sectioncode+(this.qno-1)) )
    {
      this.favoriteSeason = this.SRS.get(this.sectioncode+(this.qno-1))[0];
    }
  }
  Previous(){
    this.option = "none";
    this.qno--;
    if( this.SRS.has(this.sectioncode+(this.qno-1)) )
    {
      this.favoriteSeason = this.SRS.get(this.sectioncode+(this.qno-1))[0];
    }
  }

  selectcat($sub){
    this.qno = 1;
    this.option = "none";
  //  this.KEY1 = [this.sectioncode,this.qno];
    this.sectioncode = $sub.subcode;
    console.log($sub.subcode);
    this.selectquestionRef = this.db.list('corner/startyourexam/'+this.examcode+'/'+$sub.subcode);
    //   console.log(this.itemsRef);
      this.selectquestion = this.selectquestionRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, correctanswer: c.payload.val().correctanswer,
                                  correctoptions: c.payload.val().correctoptions, question: c.payload.val().question,
                                  description: c.payload.val().description,
                                  marks: c.payload.val().marks, qno: c.payload.val().qno, options: c.payload.val().options,
        }));
      });

      this.selectquestionRef.snapshotChanges().take(1).subscribe(changes => {
        changes.map(c => (
          console.log(c.payload.val())
        ));
     });   
      
  }
}
