import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Feed } from './model/feed';
import { Player } from './model/player';


@Injectable()
export class PaymentService {
  public t = "http://localhost:5000/allexamcorner/us-central1/app/payment-requests/Sunny";
  constructor(private http: Http) { }

  getPaymentlink(text): Observable<Feed[]> {
      return this.http.get("http://localhost:5000/allexamcorner/us-central1/app/payment-requests/Sunny")
                      .map(this.extractFeeds)
                      .catch(this.handleError);
  }
  private extractFeeds(res: Response): Feed {
    let feed = res.json();
    return feed || { };
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? '${error.status} - ${error.statusText}' : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
