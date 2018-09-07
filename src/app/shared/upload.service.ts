import { Injectable } from '@angular/core';
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
import { Upload} from './upload'


@Injectable()
export class UploadService {

  constructor(public af: AngularFireAuth, private db: AngularFireDatabase) { }

  private basePath:string = '/uploads';
  private uploadTask: firebase.storage.UploadTask;

  pushUpload(upload: Upload){
    let storageRef = firebase.storage().ref();

    this.uploadTask = storageRef.child('$(this.basePath)/${upload.file.name}').put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        //upload in progress 
        upload.progress = 99;
      },
        (error)=>{
          alert("Network Error! ");
        },
        ()=>{
          upload.url = this.uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
        //  this.saveFileData(upload);
        }
    )
  }
}
