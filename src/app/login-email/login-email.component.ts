import { Component, OnInit } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {AngularFireModule} from 'angularfire2';
// for auth    
import {AngularFireAuthModule} from 'angularfire2/auth';
// for database
import {AngularFireDatabaseModule , AngularFireDatabase} from 'angularfire2/database';
// for auth
import { AngularFireAuth } from 'angularfire2/auth';

// for Observables
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animation';
@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class LoginEmailComponent implements OnInit {

 
  state: string = '';
  error: any;
  email: any;
  password: any;
  
  constructor(public af: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.af.authState.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/user');
      }
    });
  }


onSubmit(formData) {
  if(formData.valid) {
    ////////
    return this.af.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
    .then((user) => {
      
      console.log(user);
      this.router.navigate(['/user']);
    })
  .catch(
      (err) => {
      console.log(err);
      this.error = err;
    })
  }
}

  ngOnInit() {
  }
}
