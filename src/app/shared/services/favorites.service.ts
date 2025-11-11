import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { FavoritesResponse, ToggleFavoriteResponse } from '../models/favorites-response';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
token=localStorage.getItem("token")
headers=new HttpHeaders().set(
                'Authorization',
                `Bearer ${this.token}`
            )
    constructor(private http : HttpClient) { }




    getFavorites():Observable<FavoritesResponse>{
        return this.http.get<FavoritesResponse>(`${environment.api}/favorites`,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            }),
            tap((res: any) => {
        const count = res?.data?.length || 0;
        this.setFavoritesCount(count);
    })
        )
    }


   toggleAddition(prdId: string): Observable<ToggleFavoriteResponse> {
  return this.http.post<ToggleFavoriteResponse>(`${environment.api}/favorites/${prdId}`, {}, { headers: this.headers }).pipe(

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
