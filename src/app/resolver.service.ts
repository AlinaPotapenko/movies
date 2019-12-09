import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from "rxjs/operators";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<string>{

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<string> | Promise<string> | string {
      const str: string = "Hello, MovieLand";

      // return str;

      // const observable: Observable<string> = Observable.create(observer => {
      // 	observer.next(str);
      // 	observer.complete();
      // });

      const promise: Promise<string> = new Promise(function(resolve, reject) {
      	resolve(str);
      })

      return promise;
    }
}


