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

declare var componentHandler: any;
declare var window : any;
@Component({
  selector: 'app-selectexam',
  templateUrl: './selectexam.component.html',
  styleUrls: ['./selectexam.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@fallIn]': ''},
 // providers: {Get}
})
export class SelectexamComponent implements OnInit{
  Examf: FirebaseListObservable<any>;

  itemsRef : any;
  items: Observable<any[]>;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  Exam:FirebaseListObservable<any[]>;
  ExamList:FirebaseListObservable<any[]>;
  startAt = new Subject();
  endAt = new Subject();
  lastKeypress: number = 0;
  A:any;
  queryParams:any;
  launch:boolean;
  admin : any;
  uid: any;

  constructor(private ExamSvc: GetfirebaseService , public af: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    
    this.launch = true;
        this.af.authState.subscribe(auth => {
          if(auth) {
            this.uid = auth.uid;
            console.log(auth.uid);     
            db.object('user/'+auth.uid+'/info').snapshotChanges().take(1).subscribe(action => {
              console.log(action.type);
              console.log(action.key);
              console.log(action.payload.val());
              this.admin = action.payload.val();
            });

          }
        });
        
       
        this.Examf = this.ExamSvc.getMovies("", "\uf8ff");
        this.Exam = this.ExamSvc.getMovies(this.startAt, this.endAt);
      }
      ngAfterViewInit(){
        componentHandler.upgradeAllRegistered();
      /*  ( function() {
            if (window.CHITIKA === undefined) { window.CHITIKA = { 'units' : [] }; };
            var unit = {"calltype":"async[2]","publisher":"Sunny6142","width":300,"height":600,"sid":"Chitika Default"};
            var placement_id = window.CHITIKA.units.length;
            window.CHITIKA.units.push(unit);
            document.getElementById('method1').innerHTML = '<div id="chitikaAdBlock-' + placement_id + '"></div>' ;
        }());
*/
      
      }
      ngOnInit():any {
     
        let value= "";
        let q = value;
        this.startAt.next(q);
       // this.endAt.next(q);
       this.endAt.next(q)
      }

      search($event) {
        this.launch = false;
        if ($event.timeStamp - this.lastKeypress > 200) {
          let q = $event.target.value
          this.startAt.next(q)
        //  this.endAt.next(q);
          this.endAt.next(q+"\uf8ff")
        
        }
        this.lastKeypress = $event.timeStamp;
    }

    onGo(value: string){
      this.launch = false;
     // alert(value.padStart);
      let q = value;
      this.startAt.next(q);
     // this.endAt.next(q);
     this.endAt.next(q+"\uf8ff")
    }

    startExam(item){
      // this.queryParams =  {detail:[item.detail]};
     
      console.log(item);
      item.id = "#hjjjhjhu";
      item.image = "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg";
     // this.router.navigate(['estart',item.id,item.examcode,
     this.router.navigate(['estart',item.id,item.examcode,
        item.organization,item.image,item.detail,item.time,item.noq
      ],{queryParams: item.instruction });
    }
}
