import { Component, OnInit ,HostBinding } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {AngularFireModule} from 'angularfire2';
// for auth    
import {AngularFireAuthModule} from 'angularfire2/auth';
// for database
import {AngularFireDatabaseModule , AngularFireDatabase} from 'angularfire2/database';
// for auth
import { AngularFireAuth } from 'angularfire2/auth';

// for Observables
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { moveIn, fallIn, moveInLeft } from '../router.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {

  
  state: string = '';
  error: any;
  email: any;
  password: any;
  uid : any;
  constructor( public af: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { 
    this.af.authState.subscribe(auth => {
      if(auth) {
        console.log(auth);
        this.uid = auth.uid;        
      }
    });
  }

  ngOnInit() {
  }
  Register(){
    this.router.navigateByUrl('/Register');
  }
  home(){
    this.router.navigateByUrl('/user');
  }
  navigate(){
  //  this.router.navigateByUrl('/Register');
    this.router.navigate(['myaccount',this.uid],{ queryParams: { itemsRefKey:this.uid}});
  }
  currentaffair(){
    this.router.navigate(['/currentaffair']);
  }
  Stories(){
    this.router.navigate(['/stories']);
  }
  logout(){
    //  this.router.navigate(['']);
      this.af.auth.signOut();
     // this.router.navigate(['/']);
      window.location.replace('/login');
    //  this.router.navigateByUrl('/login');
    }
}
