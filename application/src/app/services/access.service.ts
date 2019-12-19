import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AccessService {
  private baseUrl = environment.endpoint + '/api/parties';

  constructor(public http: HttpClient) {
  }

  getParties(): Promise<string> {
    return this.http.get<{text: string}>(this.baseUrl).pipe(
      tap(result => console.log('Parties returned: ', result)),
      map(result => result.text),
      catchError(err => {
        console.error(err);
        return of(err);
      })
    ).toPromise()
  }
}

