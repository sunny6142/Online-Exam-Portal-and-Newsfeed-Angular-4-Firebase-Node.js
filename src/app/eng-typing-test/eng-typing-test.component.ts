import { Component, OnInit ,  Directive } from '@angular/core';
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
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animation';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HostListener } from '@angular/core';
import { ElementRef, AfterViewInit, Pipe, PipeTransform } from '@angular/core';

import { FeedServiceService } from '../feed-service.service';
import { Subscription } from "rxjs/Subscription";

// Add the RxJS Observable operators we need in this app.

declare var $: any;

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-eng-typing-test',
  templateUrl: './eng-typing-test.component.html',
  styleUrls: ['./eng-typing-test.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@fallIn]': ''}
})

export class EngTypingTestComponent implements OnInit , AfterViewInit{
  data: any;
  http: any;
  Viewval: string = "View Content";
  showview: boolean = false;
  rss: { 1: string; }[];
  countDown: Subscription;

 // countDown: Observable<number>;
  count = 0;  //sec
  spacehtml: string = "";
  Math: any; 
  val: string = "";
  state: string = '';
  error: any;
  name: any;
  Str: string = "";
  txt: string = "";
  Cutter: number = 0;
  j:number = 0;
  private feedUrl: string = 'http://www.economist.com/sections/asia/rss.xml';
  private feeds: any;
  allowed : boolean = true;

  correctword: number = 0;
  incorrectword: number = 0;
  countbackpress:number = 0;
  ads: string ;
start: boolean = false;
  
selectsec:any;
Menu:string = "Change Test"
  constructor( private feedService: FeedServiceService) {
    this.selectsec = [{val:'1', feed:'http://feeds.feedburner.com/ndtvnews-latest'},
                      {val:'2', feed:'http://feeds.feedburner.com/ndtvnews-trending-news'},
                      {val:'3',feed:'http://feeds.feedburner.com/ndtvnews-india-news'},
                      {val:'4',feed:'http://feeds.feedburner.com/ndtvnews-world-news'},
                      {val:'5',feed:'http://feeds.feedburner.com/ndtvprofit-latest'},
                      {val:'6',feed:'http://feeds.feedburner.com/ndtvmovies-latest'},
                      {val:'7',feed:'http://feeds.feedburner.com/ndtvsports-latest'},
                      {val:'8',feed:'http://feeds.feedburner.com/ndtvsports-cricket'},
                      {val:'9',feed:'http://feeds.feedburner.com/gadgets360-latest'},
                      {val:'10',feed:'http://feeds.feedburner.com/carandbike-latest'},
                      {val:'11',feed:'http://feeds.feedburner.com/ndtvnews-cities-news'},
                      {val:'12',feed:'http://feeds.feedburner.com/ndtvnews-south'},
                      {val:'13',feed:'http://feeds.feedburner.com/ndtvnews-indians-abroad'},
                      {val:'14',feed:'http://feeds.feedburner.com/ndtvcooks-latest'},
                      {val:'15',feed:'http://feeds.feedburner.com/ndtvnews-offbeat-news'},
                      {val:'16',feed:'http://feeds.feedburner.com/ndtvnews-people'},
                      ];
               
    this.spacehtml = "<span class='mono' style='color: red;'>two khkkjj </span>";
    this.Math = Math;
  //  this.http.get('http://jsonplaceholder.typicode.com/posts/')
  //  .subscribe(c=>console.log(c.json()));  

  //  this.loadUser();
   }

   loadUser() {
    this.feedService.getUser().subscribe(data => {
      
        this.data = data;
        console.log(data)
    } );
  }

   change(sub){
    if(this.count > 0)
    {
      this.countDown.unsubscribe();
    }
      
    this.correctword = 0;
    this.incorrectword = 0;
    this.count= 0;
    this.txt ="";
    this.Cutter = 0;
    this.val = "";
    this.feedUrl = sub.feed;
    this.refreshFeed();
    this.start = false;
    
   }
   View(){
     this.showview = (this.showview)?false:true;
     if(!this.showview)
     {
      this.Viewval = "View Content"
     }
     else {
      this.Viewval = "Hide Content"
     }
   }
   StartTest(){
    console.log("aaa");
     if(this.start == false){
       console.log("AAA");
      this.start = true;
      this.countDown = Observable.timer(0,1000)
      // .take(this.count)    //count till
       .map(()=> ++this.count)
       .subscribe(tick => tick)
     }
   }
   
   Stop(){
    this.start = false;
    this.countDown.unsubscribe();
   }
  ngOnInit() {
    this.refreshFeed();
    
            $('selector').bind('event', function (event){
              event.preventDefault(); //this is what you want.
            });
            $(document).keydown((e)=>{
                
                if (e.which == 32) {
                    // alert("Aa");
                    if(this.allowed){
                      console.log(e.which);
                      console.log(String.fromCharCode(e.which));
                      
                      
                      if(String.fromCharCode(e.which) == this.txt[this.Cutter]){
                        this.Cutter++;
                        this.correctword++;
                        this.val = this.val+"<span class='mono' style='color: #0bfb0b;'>"+ String.fromCharCode(e.which) +"</span>";
                      }
                      else{
                        this.incorrectword++;
                        this.val = this.val+"<span class='mono' style='color: #f7bbbb; background-color: #f7bbbb;'>"+ "_" +"</span>";
                      }
                    //  this.val = this.val+"<span class='mono' style='color: blue;'>"+ String.fromCharCode(e.which) +"</span>";
                      this.allowed = false;
                      
                    }
                    return false;
                }
            });
            $(document).keydown((e)=> {
           
                if (e.which == 8) {
                  if(this.allowed){
                    console.log(e.which);
                    console.log(String.fromCharCode(e.which));
                    
                 
                      this.incorrectword++;
                      this.countbackpress++;
                      this.val = this.val+"<span class='mono' style='color: red;'>"+ "BACK_KEY_PRESS" +"</span>";
                    
                  //  this.val = this.val+"<span class='mono' style='color: blue;'>"+ String.fromCharCode(e.which) +"</span>";
                    this.allowed = false;
                    
                  }
                    return false;
                }
            });
            $(document).keyup((e)=> {
              if (e.which == 32 || e.which == 8 ) {
                this.allowed = true;
              // alert("Aa");
              console.log("DSpace");
            //     allowed = true;
              }
          });
  }
  
  private refreshFeed() {
    this.feedService.getFeedContent(this.feedUrl)
        .subscribe(
            feed => {
              this.feeds = feed,
            
              this.feeds.items.forEach(element => {
                console.log(element.title);
                this.txt = this.txt + element.title +element.content + element.author + element.pubDate + element.description + element.link;
              });
            }
            );
            $(function() {
              while( $('#fitin div').height() > $('#fitin').height() ) {
                  $('#fitin div').css('font-size', (parseInt($('#fitin div').css('font-size')) - 1) + "px" );
              }
          });
        //  error => console.log(error));
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent):void {
    console.log(event);
    if(event.key == this.txt[this.Cutter]){
      this.Cutter++;
      this.val = this.val+"<span class='mono' style='color: #0bfb0b;'>"+ event.key +"</span>";
      this.correctword++;
       
    }
    else{
      this.incorrectword++;
      this.val = this.val+"<span class='mono' style='color: red;'>"+ event.key +"</span>";
        
    }
    event.preventDefault();
  }

  ngAfterViewChecked() {
  
  }
  
  ngAfterViewInit(): void {
    

  }
 
}
