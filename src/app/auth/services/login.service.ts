import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { error } from 'console';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private accessToken:string|null=null;                                                                                                                     //: Stores the current user's token
public isUserLoggedSubject:BehaviorSubject<boolean>;                                                                                  //this is a behaviour subject which acts as observable , i can subscibe on it in any componet and i can listen to any changes to it , "if i subscribed on it , if it changes , i listen to this changes" ///and also can act as observer tthat can send data , like making is userlogged subject is true when user log in  "isuserloggedsubject.next(true)"
public httpOptionAuth: { headers: HttpHeaders } = { headers: new HttpHeaders() };                                         //For API requests sending JSON with Authorization header    ,
public httpOptionFormdataAuth: { headers: HttpHeaders } = { headers: new HttpHeaders() };                         // For API requests sending FormData with Authorization



  constructor(private httpClient:HttpClient                                                                                                        //injecting http client service to use all requests methods
     , private router:Router ,                                                                                                                               //injecting router for using navigate , to navigate to landing page if login succeeded
    @Inject(PLATFORM_ID) private platformId: Object                                                                                    // i injected this service to use it to check if i am runing the project on the browser or not , because if i wasnt running it on browser it will be an problem with local storage , so i do this check to safely use local storage
    )
        {
            this.isUserLoggedSubject=new BehaviorSubject<boolean>(this.isUserLoggedIn);                         //•	Initializes isUserLoggedSubject with the current login state (true or false). but we here didnt put it directly true or false , we put it in a varirable "isUserLoggedIn" and you will see this variable under which is checking if there is a token for user or no
            this.updateHttpOptions();                                                                                                                 //•	Sets up HTTP headers with the current token (if available). this means that you update http options and any request will be send from now , will send with your toke , as your are a user now , not needing to do login again, so it sends the token with the http headers and now he updates it with this token
    }






    // login function which didnt return static data , it returns an observable "promise that i will return data later" and you subscribe on it to get the data
    login(formData:FormData): Observable<any>{
        return this.httpClient.post<any>(environment.apiUrl+"/users/token/",formData).pipe(
            catchError(err=>{                                                                                                                            //•	Catches any error if login fails.
                console.log("login error ",err);
                return throwError(()=>err)
            })
        )
    }











    // now you did the login function and handled if there were and error , now handle if the login succeeded , "if you send the post request and the backend checks it and the user data sent are true" and passed to you a token , what i should do after that :
    handleLoginSuccess(token:string){                                                                                                                //this function will be used after  returning the token  ,  after that you pass the token to this funciton as parameter , and it will be added to local storage
        if(isPlatformBrowser(this.platformId)){
            localStorage.setItem('token',token)
        }
        this.isUserLoggedSubject.next(true);                                                                                                        //and now update the value of the isUserLoggedSubject with true after the user had logged /////dont forget that isUserLoggedSubjec is a behaviour subject that can act as observer and send data like now making his value true after logging and savign the token of the user to the local storage
        this.refreshToken();                                                                                                                                  // Refresh headers with new token
            // handleLoginSuccess function is used after login function , when the request is sent and the token it back, now you use this function and take this token and send it to local storage and update the isUserLoggedSubject with trur
    }









    logout(){                                                                                                                                                //the same logout function if you call it when clicking on logout button it will remove the token of the user and he will be unknown and not logged
        if(isPlatformBrowser(this.platformId)){                                                                                              //dont forget to use isplatformBrowser checking to safely use local storage
            localStorage.removeItem('token')
        }
        this.isUserLoggedSubject.next(false);                                                                                               //so here we updated isUserLoggedSubject with false
        this.router.navigateByUrl('/auth/login');
    }









    get isUserLoggedIn() :boolean{                                                                                                        //isUserLoggedIn which i used in isUserLoggedSubject wont be true or false by luck , it will be true or false based on finding the token of the user in the local storage
        if(isPlatformBrowser(this.platformId)){
                return localStorage.getItem('token')? true:false;                                                                  //if the token of the user in the local storage , so isloggedin will be true , vice verc will be false
    }
return false;
}







isLoggedInObservable(): Observable<boolean> {                                                                              //making isLoggedSubject to act as observable here
    return this.isUserLoggedSubject.asObservable();
  }
// •	Allows other components to listen and react to login status changes live.        "by this function isUserloggedSubject will act as observable which i can subscribe on its value if it chaned , and based on its value i can do alot of actions such hiding log in and logout button and so on "












private updateHttpOptions(){                                                                                                             //in this function , i will put the token in the access token variable if the token found and put it with the headers that will be sent with each request , so we use update http options after login to add the token to the headers at each reqeust


    if(isPlatformBrowser(this.platformId)){
        this.accessToken=localStorage.getItem('token')                                                                       //here i put to the access token the value of it if it is found in the local storage
    }
    else{
        this.accessToken=null;                                                                                                               //if there is no token , it will be null               , now you have your token in the access token variable becasue we will use it when sending the headers to tell each request that who doing this request is the user with this token , so we will send this token in each header as you will see in the next tow functions
    }



    this.httpOptionAuth = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.accessToken                                                                           //you passed the token with the headers to tell him that iam the user logged in , not needing to log in  , in each request
        })
      };



      this.httpOptionFormdataAuth = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.accessToken                                                                              //also passed the token with these headers
        })
      };

}













refreshToken() {
    this.updateHttpOptions();
  }
    // •	Simply calls updateHttpOptions() to re-read the token and update headers.

}
