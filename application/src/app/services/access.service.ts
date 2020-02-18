import {HttpClient, HttpParams} from "@angular/common/http";
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
    return this.http.get<TweetCount[]>(this.baseUrl + '/tweetCount').toPromise();
  }

  getTopics(parties: string[], start: Date, end: Date): Promise<{party: string, terms: any}[]> {
    const params: HttpParams = new HttpParams()
      .set('parties', parties.toString())
      .set('start', start.toLocaleDateString())
      .set('end', end.toLocaleDateString());
    return this.http.get<{party: string, terms: any}[]>(this.baseUrl + '/topics/frequency', {params}).toPromise();
  }

  getFrequencyForTopic(term: string, parties: string[], startYear: number, endYear: number): Promise<{party: string, frequency: TopicFrequencyModel[]}[]> {
    const params: HttpParams = new HttpParams()
      .set('term', term)
      .set('parties', parties.toString())
      .set('start', startYear.toString())
      .set('end', endYear.toString());
    return this.http.get<{party: string, frequency: TopicFrequencyModel[]}[]>(this.baseUrl + '/topics/development', {params}).toPromise();
  }
}

export class TopicFrequencyModel {
  party: string;
  year: number;
  month: number;
  frequency: number;
}
