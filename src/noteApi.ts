import axios, { Method } from 'axios'
import { from, Observable } from 'rxjs'

export class NoteApi {
   url: string

   constructor(url: string) {
      this.url = url
   }

   request<T>(method: Method, endpoint = '/', data?: any): Observable<T> {
      const resData = axios
         .request<T>({
            method,
            url: this.url + (endpoint === '/' ? '' : endpoint),
            data,
            headers:
               method === 'GET'
                  ? undefined
                  : {
                       'content-type': 'application/json',
                    },
         })
         .then(res => res.data)

      return from(resData)
   }
}
