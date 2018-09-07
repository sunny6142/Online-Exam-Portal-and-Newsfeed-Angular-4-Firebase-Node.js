import { Injectable } from '@angular/core';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
//import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database"; 
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
@Injectable()
export class GetfirebaseService {

  constructor(private db: AngularFireDatabase) { }
  getMovies(start, end): FirebaseListObservable<any> {
    return this.db.list('/corner/yourexam', {
      query: {
        orderByChild: "examcode",
        limitToLast: 50,
        startAt: start,
        endAt: end
      }
    });
  }

  getResult(uid,start, end): FirebaseListObservable<any> {
    return this.db.list('/user/'+uid+'/yourexam', {
      query: {
        orderByChild: 'examcode',
        limitToLast: 50,
        startAt: start,
        endAt: end
      }
    });
  }

  getMyResult(uid,start, end): FirebaseListObservable<any> {
    return this.db.list('/user/'+uid+'/yourgivenexam', {
      query: {
        orderByChild: 'examcode',
        limitToLast: 50,
        startAt: start,
        endAt: end
      }
    });
  }

  getquestion(start, end, cat , examcode): FirebaseListObservable<any> {
    return this.db.list('/corner/yourexam/'+examcode+'/659jhjvh' , {
      query: {
        limitToLast: 50,
        startAt: start,
        endAt: end
      }
    });
  }
  getSearchResult(start, end): FirebaseListObservable<any> {
    return this.db.list('/corner/yourexam', {
      query: {
        orderByChild: 'examcode',
        limitToLast: 50,
        startAt: start,
        endAt: end
      }
    });
  }

  getStResult(): FirebaseListObservable<any> {
    return this.db.list('corner/user/hZYb9z3BS0W8mZ5QAhyQLPFufUs2/yourexam/result');
  }

  getMResult(uid,examcode, val): FirebaseListObservable<any> {
    if(val != null){
      return this.db.list('/user/'+uid+'/yourgivenexam/'+examcode +'/marks/', {
        query: {
          orderByChild: 'section',
          equalTo: val
        }
      });
    }
    else{
      return this.db.list('/user/'+uid+'/yourgivenexam/'+examcode +'/marks/', {
        query: {
          orderByChild: 'section',
        }
      });
    }
  }
  
}
