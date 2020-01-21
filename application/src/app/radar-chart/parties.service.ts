import { Injectable } from '@angular/core';
import { Party } from './parties';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompaniesService {

  private companiesUrl = 'assets/companies.json';  // URL to web api

  // constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
