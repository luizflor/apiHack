import { Injectable } from '@angular/core';

import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import BranchOut = API.Client.BranchOut;
import {OAuth} from "./API/OAuth";
import {browser} from "protractor";
import {Transactions} from "./API/Transactions";
/*
 https://srvpocanz001.csc-fsg.com/CeleritiDepositsAPI/oauth/token/services/v1/branches?postalCode=94523
 client_id=User66&client_secret=N66n35&scope=hackathon&grant_type=client_credentials
 */
@Injectable()
export class BranchService {
  protected basePath = 'https://srvpocanz001.csc-fsg.com/CeleritiDepositsAPI/services/v1/branches?postalCode=';
  public defaultHeaders : any = {};
  private branches:BranchOut;
  private oauth:OAuth;
private urlCard = "https://srvpocanz001.csc-fsg.com/CeleritiCardsAPI/services/v1/cardAccounts/";//1234560002895/transactions";

  constructor(private http: Http) { }

  getOAuth(oauth:string): Observable<OAuth> {
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');


    var urlCards=" https://srvpocanz001.csc-fsg.com//CeleritiCardsAPI/oauth/token";
    var urlDeposits = " https://srvpocanz001.csc-fsg.com/CeleritiDepositsAPI/oauth/token";

    var url = oauth==="CARDS"? urlCards: urlDeposits;

    var body = "client_id=User66&client_secret=N66n35&scope=hackathon&grant_type=client_credentials";

    let options = new RequestOptions({
                                       headers: headers,
                                       method: RequestMethod.Post,
                                       url: url,
                                       body: body
                                     });
    let req = new Request(options);
    return this.http.request(req)
               .map(resp => {
                 let oauth: OAuth = resp.json();
                 this.oauth = oauth;
                 return oauth;

               }).catch((error: Response) => {

        if (error.status == 500) alert("Server error");
        return this.handleError(error);

      });
  }

  getBranches(oauth: OAuth, postalCode?: number) {

    var req = this.getHttpRequest(oauth, this.basePath+postalCode);
    return this.http.request(req)
               .map(res => {
                 this.branches = res.json();
                 return this.branches;
               })
               .catch((error: Response) => {
                 return this.handleError(error);

               });
  }

  getTransactions(oauth: OAuth, account: string) : Observable<Transactions>{
    var url = this.urlCard+account+"/transactions";
    var req = this.getHttpRequest(oauth, url);
    return this.http.request(req)
               .map(res => {
                 var transactions: Transactions = res.json();
                 return transactions;
               })
               .catch((error: Response) => {
                 return this.handleError(error);

               });
  }


  getHttpRequest(oauth: OAuth, url): Request {
    let headers = this.getBearerHeader(oauth);
    let options = new RequestOptions({
                                       headers: headers,
                                       method: RequestMethod.Get,
                                       url: url,
                                       body: {}
                                     });
    let req = new Request(options);
    return req;
  }

  private getBearerHeader(oauth: OAuth) {
    let headers = new Headers();
    let bearer = "Bearer " + oauth.access_token;
    console.log(bearer);
    headers.append('Authorization', bearer);
    headers.append('Content-type', 'application/json');
    return headers;
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-type', 'application/json');
    return headers;
  }

  private handleError(error: Response): Observable<any> {
    if (error && error.status && error.status != 0) {
      let err = error.json();
    } else {
      let err = {
        title: `couldn't retrieve data`,
        error: `couldn't retrieve data`
      };
    }
    console.log('An error occured', error);

    return Observable.throw(error);
  }

}
