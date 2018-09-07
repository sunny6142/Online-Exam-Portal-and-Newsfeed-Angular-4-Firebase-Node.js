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

declare var componentHandler: any;
declare var window : any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@fallIn]': ''}
})
export class UserComponent implements OnInit {

  
  name: any;
  state: string = '';
  
  items: Observable<Observable<any[]>>;
  sub: Observable<any[]>;
  itemsRef : any;
  afDb:any;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;

  constructor(public af: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.router.navigateByUrl('/selectexam');
    this.af.authState.subscribe(auth => {
      if(auth) {
        this.name = auth;
        console.log(auth.uid);        
      }
    });
  }

  logout() {
    this.af.auth.signOut();
    this.router.navigate(['/']);
    this.router.navigateByUrl('/login');
  }
  ngAfterViewInit(){
    componentHandler.upgradeAllRegistered();
  }
  ngOnInit():any {
   // this.items = this.db.list('/corner/exam/name')
 //  this.items = this.db.object('/corner/exam/name').valueChanges();


  // this.db.list('/corner/exam/name').auditTrail().subscribe(console.log);
  // console.log(this.items);

 this.itemsRef = this.db.list('corner/exam');
  // console.log(this.itemsRef);
   this.items = this.itemsRef.snapshotChanges().map(changes => {
    return changes.map(c => ({ key: c.payload.key, detail: c.payload.val().detail,
                               tittle: c.payload.val().name , sub: c.payload.val().sub 
    }));
  });
  
 

 //  this.itemsRef = this.db.list('corner/exam');
  // console.log(this.itemsRef);
 /* this.items = this.itemsRef.snapshotChanges(['child_added'])
    .map(actions => {
       actions.forEach(action => {
          console.log(action.type);
         console.log(action.key);
          action.payload.val().sub
        
       });
     });  
     */

  }

}
