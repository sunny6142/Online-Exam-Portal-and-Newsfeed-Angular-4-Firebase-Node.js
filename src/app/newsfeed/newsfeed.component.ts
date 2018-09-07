import { Component, OnInit } from '@angular/core';
import { FeedServiceService } from "../feed-service.service";
import { Injectable } from '@angular/core';
import { Feed } from "../model/feed";
//import * as translate from 'google-translate-api';
//import { translate } from 'google-translate-api';

//import { translate as Translate } from 'google-translate-api';
declare var componentHandler: any;
declare var LanguageApp: any;
declare var UrlFetchApp: any, w : any;
declare var ContentService: any, $:any , document:any;
//const translate = require('google-translate-api');
//var tran : translate;

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})

export class NewsfeedComponent implements OnInit {
  player: any;
  m: any;
  show = false;
  selectsec: any;
  err: any;
  public feeds: any;
  private Asia : any;
  private feedUrl: string = 'https://www.nasa.gov/rss/dyn/breaking_news.rss';
  hbutton : boolean = true;
  hshow : boolean = true;
  title = 'NASA';
  constructor(private feedService: FeedServiceService) {
    
    this.selectsec = [{val:'Top Stories', feed:'http://feeds.bbci.co.uk/news/rss.xml'},
      {val:'NASA', feed:'https://www.nasa.gov/rss/dyn/breaking_news.rss'},
      {val:'Education', feed:'https://www.nasa.gov/rss/dyn/educationnews.rss'},
      {val:'World', feed:'http://feeds.bbci.co.uk/news/world/rss.xml'},
      {val:'Asia', feed:'http://feeds.bbci.co.uk/news/world/asia/rss.xml'},
    {val:'Europe', feed:'http://feeds.bbci.co.uk/news/world/europe/rss.xml'},
    {val:'Politics',feed:'http://feeds.bbci.co.uk/news/video_and_audio/politics/rss.xml'},
    {val:'Technology',feed:'http://feeds.bbci.co.uk/news/video_and_audio/technology/rss.xml'},
    {val:'China',feed:'http://www.economist.com/sections/china/rss.xml'},
    {val:'Britain',feed:'http://www.economist.com/sections/britain/rss.xml'},
    {val:'United States',feed:'http://www.economist.com/sections/united-states/rss.xml'},
    {val:'Markets and data',feed:'https://www.economist.com/latest-updates'},
    {val:'Culture',feed:'http://www.economist.com/sections/culture/rss.xml'},
    {val:'Economics',feed:'http://www.economist.com/sections/economics/rss.xml'},
    {val:'Business and finance',feed:'http://www.economist.com/sections/business-finance/rss.xml'},   
    ];

    this.refreshFeed();
   }

  ngOnInit() {
      
  }

  hideitem(){
    this.hbutton = true;
    this.hshow = true;
  }
  ngAfterViewInit(){
    componentHandler.upgradeAllRegistered();
  
            var p = $('body');
        //    p.css({ cursor: 'pointer' });
        

            $('#zone').click((e)=>{

              this.player = '';
              this.err = '';

              this.hbutton = true;
              this.hshow = true;

              var selection = window.getSelection();
              if (!selection || selection.rangeCount < 1) return true;
              var range = selection.getRangeAt(0);
              var node = selection.anchorNode;
              var word_regexp = /^\w*$/;
          
              let w:any = node;
              // Extend the range backward until it matches word beginning
              while ((range.startOffset > 0) && range.toString().match(word_regexp)) {
                range.setStart(node, (range.startOffset - 1));
              }
              // Restore the valid word match after overshooting
              if (!range.toString().match(word_regexp)) {
                range.setStart(node, range.startOffset + 1);
              }
          
              // Extend the range forward until it matches word ending
              while ((range.endOffset < w.length) && range.toString().match(word_regexp)) {
                range.setEnd(node, range.endOffset + 1);
              }
              // Restore the valid word match after overshooting
              if (!range.toString().match(word_regexp)) {
                range.setEnd(node, range.endOffset - 1);
              }
              var word = range.toString();
            //  alert(str);
            // alert(word);
                if(word != '') {
                  //   alert(word);
                  this.hbutton = false;
                  this.hshow = false;
                  componentHandler.upgradeAllRegistered();
                    this.feedService.getPlayers(word)
                        .subscribe(
                          players => this.player = players,
                          error =>  this.err = error
                          )
                } else{
                }
            });
        
  }
  
  change(sub){
    this.show = false;
    this.title = sub.val;
    this.feedUrl = sub.feed;
    this.refreshFeed();
   }
  private refreshFeed() {
    this.feeds = '';
  //  this.feedService.getTranslation().subscribe(val=>{console.log(val) });
    this.feedService.getFeedContent(this.feedUrl)
        .subscribe(
            feed =>  {
              this.show = true;
              this.feeds = feed,
              console.log(feed);
              this.feeds.items.forEach(element => {
                
             //   this.txt = this.txt + element.title +element.content + element.author + element.pubDate + element.description + element.link;
              });
            }
        );
            
        //  error => console.log(error));
  }

  filterimage(tag){
     this.m = tag.match(/src="([^"]*)"/i);
    if(this.m != null){
      return this.m[1];
    }
    else return 0;
  }

  RemoveImg(tag){
  //  console.log(this.doGet("name"));
    return tag.replace(/<img[^>]*>/g,"");
  }
}
