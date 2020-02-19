import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Tweet} from "../models/tweet.model";
import {TweetCount} from "../models/tweetCount.model";
import {Timespan} from "../models/time-span.model";

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

  getTopics(parties: string[], timeSpan: Timespan): Promise<{ party: string, terms: any }[]> {
    const params: HttpParams = new HttpParams()
      .set('parties', parties.toString())
      .set('timespan', JSON.stringify(timeSpan));
    return this.http.get<{ party: string, terms: any }[]>(
      this.baseUrl + '/topics/frequency', {params}).toPromise();
  }

  getFrequencyForTopic(term: string, parties: string[], selectedTimeSpan: Timespan
  ): Promise<{ party: string, frequency: TopicFrequencyModel[] }[]> {
    const params: HttpParams = new HttpParams()
      .set('term', term)
      .set('parties', parties.toString())
      .set('timespan', JSON.stringify(selectedTimeSpan));
    return this.http.get<{ party: string, frequency: TopicFrequencyModel[] }[]>(
      this.baseUrl + '/topics/development', {params}).toPromise();
  }

  getFiveFactors(parties: string[], selectedTimeSpan: Timespan): Promise<{ party: string, factors: fiveFactorModel}[]>{
    const params: HttpParams = new HttpParams()
      .set('parties', parties.toString())
      .set('timespan', JSON.stringify(selectedTimeSpan));
    return this.http.get<{ party: string, factors: fiveFactorModel}[]>(
      this.baseUrl + '/fiveFactor', {params}).toPromise();
  }
}

export interface TopicFrequencyModel {
  party: string;
  year: number;
  month: number;
  frequency: number;
}

export interface fiveFactorModel {
  agreeableness: number;
  conscientiousness: number;
  extraversion: number;
  neuroticism: number;
  openness: number;
}
