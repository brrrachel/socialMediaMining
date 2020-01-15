import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Tweet} from "../models/tweet.model";

@Injectable({providedIn: 'root'})
export class AccessService {
  private baseUrl = environment.endpoint + '/api/parties';

  constructor(public http: HttpClient) {
  }

  getParties(): Promise<Tweet[]> {
    return this.http.get<Tweet[]>(this.baseUrl).toPromise();
  }

  getTweetCount(): Promise<{text: string}> {
    return this.http.get<{text: string}>(this.baseUrl + '/tweetCount').toPromise()
  }
}

export class tweetsPerAccount {
  account_name: string;
  start: string;
  total: number;
}
