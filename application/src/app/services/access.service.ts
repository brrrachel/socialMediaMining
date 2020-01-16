import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Tweet} from "../models/tweet.model";
import {TweetCount} from "../models/tweetCount.model";

@Injectable({providedIn: 'root'})
export class AccessService {
  private baseUrl = environment.endpoint + '/api/parties';

  constructor(public http: HttpClient) {
  }

  getTenTweets(): Promise<Tweet[]> {
    return this.http.get<Tweet[]>(this.baseUrl).toPromise();
  }

  getTweetCount(): Promise<TweetCount[]> {
    return this.http.get<TweetCount[]>(this.baseUrl + '/tweetCount').toPromise()
  }
}
