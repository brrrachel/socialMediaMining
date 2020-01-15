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
    return this.http.get<Tweet[]>(this.baseUrl)
      // .pipe(
      //   take(1),
      //   tap(result => console.log('Parties returned: ', result)),
      //   map(result => result.text)
      // )
      .toPromise();
  }
}

