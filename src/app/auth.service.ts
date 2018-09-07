import { CanActivate, Router } from '@angular/router';

// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {AngularFireModule} from 'angularfire2';
// for auth    
import {AngularFireAuthModule} from 'angularfire2/auth';
// for database
import {AngularFireDatabaseModule , AngularFireDatabase} from 'angularfire2/database';
// for auth
import { AngularFireAuth } from 'angularfire2/auth';

// for Observables

import * as firebase from 'firebase/app';


import { Http, Response } from '@angular/http';

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public auth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {}

    canActivate(): Observable<boolean> {
      return Observable.from(this.auth.authState)
        .take(1)
        .map(state => !!state)
        .do(authenticated => {
      if 
        (!authenticated) this.router.navigate(['']);

      })
    }

 /*   getTittle(){

      const firebaseRef = this.db.database.ref("/corner/exam/name");
      return Observable.create((observer) => {
        firebaseRef.on("value", function (snapshot) {
            console.log(snapshot.key);
            observer.next(snapshot.val());
    
        });
      });
      
    } */
    
 
}