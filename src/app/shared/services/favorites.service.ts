import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
headers=new HttpHeaders().set(
                'Authorization',
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjNmNTM3NjIyYTU3OWUwZWI4YTQyMSIsImlhdCI6MTc2MjE1NTE0NCwiZXhwIjoxNzYyMjQxNTQ0fQ.L-wAw5iax9LbFstERwg4_vCofSBZei2aWhc36XjlZLw`
            )
    constructor(private http : HttpClient) { }




    getFavorites():Observable<any>{
        return this.http.get(`${environment.api}/favorites`,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            }),
            tap((res: any) => {
      const count = res?.data?.length || 0;
      this.setFavoritesCount(count);
    })
        )
    }
   toggleAddition(prdId: string): Observable<any> {
  return this.http.post<any>(`${environment.api}/favorites/${prdId}`, {}, { headers: this.headers }).pipe(

    //to handle the count of favorites in the navbar
    tap((res: any) => {
      // لما العملية تنجح، نحدث العدد محليًا
      const currentCount = this.favoritesCount.value;

      if (res.message?.toLowerCase().includes('removed')) {
        // لو المنتج اتشال
        this.setFavoritesCount(Math.max(currentCount - 1, 0));
      } else if (res.message?.toLowerCase().includes('added')) {
        // لو المنتج اتضاف
        this.setFavoritesCount(currentCount + 1);
      }
    }),
    catchError((err) => {
      return throwError(() => err);
    })
  );
}










    //now lets hanldle the favorites count to be updated in the navbar when it is changed
    favoritesCount = new BehaviorSubject<number>(0);
        getFavoritesCount (){
            return this.favoritesCount.asObservable();
        }
        setFavoritesCount(count:number){
            this.favoritesCount.next(count)
        }
}
