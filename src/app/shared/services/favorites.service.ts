import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
headers=new HttpHeaders().set(
                'Authorization',
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjNmNTM3NjIyYTU3OWUwZWI4YTQyMSIsImlhdCI6MTc2MTgyMzYyNiwiZXhwIjoxNzYxOTEwMDI2fQ.00--Kse1O40rwj6BHcwTdY80ju0KCjdGVWg2b8jRouI`
            )
    constructor(private http : HttpClient) { }




    getFavorites():Observable<any>{
        return this.http.get(`${environment.api}/favorites`,{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
    }
    toggleAddition(prdId:string):Observable<any>{
        return this.http.post<any>(`${environment.api}/favorites/${prdId}`,{},{headers:this.headers}).pipe(
            catchError((err)=>{
                return throwError(()=>err)
            })
        )
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
