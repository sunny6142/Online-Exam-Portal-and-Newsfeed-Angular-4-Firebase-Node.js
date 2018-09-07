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
import { ChangeDetectionStrategy, ChangeDetectorRef, DoCheck } from '@angular/core';
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
  selector: 'app-examcorner',
  templateUrl: './examcorner.component.html',
  styleUrls: ['./examcorner.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamcornerComponent implements OnInit,DoCheck {
  ngDoCheck(): void {
    this.onchange();
  }
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
  nav: number = 1;
  constructor(public activeRoute: ActivatedRoute ,private ExamSvc: GetfirebaseService , public af: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { 
  
    this.Menu = "Menu";
    //map.set("A",1)
   // map.set("A",[2,8])
    this.qno = 1;
    this.total = 0;
    //const KEY1 = [474,1];
    //map.set(KEY1, 'hello');
    //console.log(map.get(KEY1));
    this.examcode = this.activeRoute.snapshot.params['examcode'];
    this.id = this.activeRoute.snapshot.params['id'];
    this.name = this.activeRoute.snapshot.params['name'];
    this.email = this.activeRoute.snapshot.params['email'];
    this.contact = this.activeRoute.snapshot.params['contact'];
    this.time = this.activeRoute.snapshot.params['time'];
    this.organization = this.activeRoute.snapshot.params['organization'];

    console.log(this.email , this.id ,this.name , this.contact);
    
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
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
 
     MathJax.Hub.Config({
       tex2jax: {
           inlineMath: [['$','$'], ['\\(','\\)']],
           processEscapes: true
           }
     });
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
  changequstion(val : number){
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    
        MathJax.Hub.Config({
          tex2jax: {
              inlineMath: [['$','$'], ['\\(','\\)']],
              processEscapes: true
              }
        }); 
  //  alert(val);
    this.qno = val;
  //  this.KEY1 = [this.sectioncode,val];
   // console.log(this.Save);
   if( this.SRS.has(this.sectioncode+(this.qno-1)) )
    {
      this.favoriteSeason = this.SRS.get(this.sectioncode+(this.qno-1))[0];
    }
    else{
      this.favoriteSeason = "none";
    }
  }

  FinishExam(){
    this.nav = 0;
    alert("Time Up");

    /*
   
    */
    this.router.navigate(['finishexam',"Time Up !"],{ queryParams: { itemsRefKey:this.examcode}});
    
  }

  onchange(){
    
         MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
     
         MathJax.Hub.Config({
           tex2jax: {
               inlineMath: [['$','$'], ['\\(','\\)']],
               processEscapes: true
               }
         }); 
    }

  ngOnInit() {
 //   console.log(this.time);

 //   console.log(this.count);
  //  const KEY1 = [474,1];
  //  this.map.set(KEY1, 'hello');
  //  console.log(this.map.get(KEY1));
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  
      MathJax.Hub.Config({
        tex2jax: {
            inlineMath: [['$','$'], ['\\(','\\)']],
            processEscapes: true
            }
      }); 

 /* setTimeout((router: Router) => {
//this.router.navigate(['user']);
  }, this.count * 1000);
 */
  let m = 0;
  let q  = 1
  let no = 0;
    this.initialize_marks = this.selectsectRef.snapshotChanges().take(1).subscribe(changes => {
        changes.map(c => (
          
          no = no+1,
          this.db.database.ref().child("corner").child("startyourexam")
          .child(this.examcode).child("result").child(this.uid).child("cat").child(""+no)
          .set(c.payload.val().subject) ,

          this.db.database.ref().child("corner").child("startyourexam")
          .child(this.examcode).child("result").child(this.uid).child("sub").child(""+no)
          .set(c.payload.val().code),
           
            this.db.database.ref().child("user").child(this.uid).child("yourgivenexam")
            .child(this.examcode).child(c.payload.val().code).child(""+q)
            .set({
              qno: q,
              ans: 'none',
              marks: 0
              })

        ));  this.initialize_marks.unsubscribe();
      } );
      
      //Add Examcode 
     
      //Add Orgnization
    
      this.db.database.ref().child("user").child(this.uid).child("yourgivenexam")
      .child(this.examcode)
      .set({
        examcode : this.examcode,
        organization : this.organization,
        date : firebase.database.ServerValue.TIMESTAMP
        }) ,

      this.db.database.ref().child("corner").child("startyourexam")
      .child(this.examcode).child("result").child(this.uid)
      .update({
            
            email : this.email,
            name : this.name,
            phone: this.contact,
            total_mark: 0,
        }) 
    
  //  this.Exam = this.ExamSvc.getMovies(this.startAt, this.endAt);
  }

  save(qno: number , $question){
    
     const KEY1 = [this.sectioncode+qno];
      this.SRS.set(this.sectioncode+(qno-1), [this.favoriteSeason, "green"]);

  //    console.log(this.SRS);
  //  console.log($question);
      if( this.SRS.has(this.sectioncode+(this.qno-1)) )
        {
          this.favoriteSeason = this.SRS.get(this.sectioncode+(this.qno-1))[0];
          
        }
        
  //      console.log($question);
   //     console.log(this.favoriteSeason);
        if($question.correctoptions == this.favoriteSeason)
        {
          this.db.database.ref().child("user").child(this.uid).child("yourgivenexam")
       //   .child(this.examcode).child(this.sectioncode).child(""+(this.qno))
          .child(this.examcode).child("marks").child(""+(this.qno)+'_'+this.sectioncode)
          .set({
            qno: qno,
            ans: this.SRS.get(this.sectioncode+(qno-1))[0],
            marks: this.currentmarks,
            section:this.sectioncode
           });

          
        }
        else{
         let m = 0;
          this.db.database.ref().child("user").child(this.uid).child("yourgivenexam")
        //  .child(this.examcode).child(this.sectioncode).child(""+(this.qno))
          .child(this.examcode).child("marks").child(""+(this.qno)+'_'+this.sectioncode)
          .set({
            qno: qno,
            ans: this.SRS.get(this.sectioncode+(qno-1))[0],
            marks: m,
            section:this.sectioncode
           });
        }
       
  }

  reminder(qno: number){
    const KEY1 = [this.sectioncode,qno];
    this.SRS.set(this.sectioncode+(qno-1), [this.favoriteSeason,"#F44336"]);
    console.log(this.SRS);
   
  //  this.qno++;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    
        MathJax.Hub.Config({
          tex2jax: {
              inlineMath: [['$','$'], ['\\(','\\)']],
              processEscapes: true
              }
        }); 
  }
  saveandnext(qno: number , $question){
    this.save(qno, $question);
    
    this.qno++
    
     if( this.SRS.has(this.sectioncode+(this.qno-1)) )
      {
        this.favoriteSeason = this.SRS.get(this.sectioncode+(this.qno-1))[0];
      }else{
        this.favoriteSeason = "none";
      }
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      
          MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [['$','$'], ['\\(','\\)']],
                processEscapes: true
                }
          }); 
  }
  skip(qno: number){
  //  const KEY1 = [this.sectioncode,qno];
    this.qno++
  //  this.SRS.set(this.sectioncode+(qno-1), [this.favoriteSeason,"#E91E63"]);
   // console.log(this.SRS);
   // let l;
   // console.log(this.selectquestion );
   if( this.SRS.has(this.sectioncode+(this.qno-1)) )
    {
      this.favoriteSeason = this.SRS.get(this.sectioncode+(this.qno-1))[0];
    }else{
      this.favoriteSeason = "none";
    }
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    
        MathJax.Hub.Config({
          tex2jax: {
              inlineMath: [['$','$'], ['\\(','\\)']],
              processEscapes: true
              }
        }); 
  }
  Previous(){
    this.qno--;
    if( this.SRS.has(this.sectioncode+(this.qno-1)) )
    {
      this.favoriteSeason = this.SRS.get(this.sectioncode+(this.qno-1))[0];
    }else{
      this.favoriteSeason = "none";
    }
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    
        MathJax.Hub.Config({
          tex2jax: {
              inlineMath: [['$','$'], ['\\(','\\)']],
              processEscapes: true
              }
        }); 
  }

  finish(){
    if(confirm("Are You Done !!!")) {

      this.nav = 0;
      this.router.navigate(['finishexam',"Done!"],{ queryParams: { itemsRefKey:this.examcode}});
    }
  }


  selectcat(i: number , $sub){
    this.qno = 1;
  //  this.KEY1 = [this.sectioncode,this.qno];
    this.sectioncode = $sub.subcode;
    this.currentmarks = $sub.marks;
    this.Menu = $sub.subject;
    this.sec_no = i+1;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    
        MathJax.Hub.Config({
          tex2jax: {
              inlineMath: [['$','$'], ['\\(','\\)']],
              processEscapes: true
              }
        }); 
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
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      
          MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [['$','$'], ['\\(','\\)']],
                processEscapes: true
                }
          }); 

  }
}

/*
 this.submarks = 0
        
        this.SaveRef = this.db.list('user/'+this.uid+'/yourgivenexam/'+this.examcode+'/'+this.sectioncode);
      this.save_total =  this.SaveRef.snapshotChanges().subscribe(changes => {
         changes.map(c => (
           
         
        //   this.submarks = (c.payload.val().qno == 1)?0:this.submarks , //Key player
           
             
           this.total = (this.submarks_mask.has(this.sectioncode))?(this.total - this.submarks_mask.get(this.sectioncode)):this.total,
             
           this.submarks = this.submarks + parseInt(c.payload.val().marks)
           ,console.log(this.submarks) ,
          
          
           this.submarks_mask.set(this.sectioncode, this.submarks),
           this.total = this.total + this.submarks
           
         ), 
         this.db.database.ref().child("corner").child("startyourexam")
         .child(this.examcode).child("result").child(this.uid).child("sub").child(""+this.sec_no)
         .set(this.submarks),
         
         this.db.database.ref().child("corner").child("startyourexam")
         .child(this.examcode).child("result").child(this.uid).child("total_mark")
         .set(this.total),
         this.save_total.unsubscribe()
       
       );
           
   
       });

       */