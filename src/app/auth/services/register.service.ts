import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    // firstly before going to any place , we will declare out properties and and after that and inside the constructor will will initialize it
    // here only declarations
    private accessToken:string | null=null
    public isUserLoggedSubject:BehaviorSubject<boolean>;                                                                                                          //this is behaviour subject which i can subscribe on on each component have injected the service and when subscribing on it i can listen to its changes , and also it acta as observer which means that it can send data, changes its value to true or false since it is boalean
    public httpOptionAuth: { headers: HttpHeaders } = { headers: new HttpHeaders() };
public httpOptionFormdataAuth: { headers: HttpHeaders } = { headers: new HttpHeaders() };










  constructor(private httpClient:HttpClient,                                                  //this is our constructor where to inject the services like http client which is responsible for sending http requests and router which responsibel for navigation and platform id which is resposible for checking if the place where running the project in a browser to safely use local storage
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object
) {                            //inside the constructor you initialize the properties
    this.isUserLoggedSubject=new BehaviorSubject<boolean>(this.isUserLoggedIn);                                                 //the initial value of isUserLoggedSubject will be the value of isUserLogged which is true if the token of the user in the local storage and false if it is not in the local storage
    this.updateHttpOptions();
    }












// this is the registeration function which take from me the form data writen by the user as object and post it sending to the user and handling its error
    register(formData:FormData):Observable<any>{
        return this.httpClient.post<any>(environment.apiUrl+"/users/register" , formData).pipe(                           //put inside the pipe observables operators to control the observalbels
            catchError(err=>{                                                                                                                                      //catchError(...)This is an RxJS operator that catches errors from an observable (like a failed HTTP request) and lets you handle them, instead of crashing the app.
                                                                                                                                                                            // err => { ... }This is a callback function. It receives the error that was thrown during the observable execution (e.g., if the HTTP request fails).
                console.log("registeration error :"+err);                                                                                                 //this is only for debugging and you can delete it
                return throwError(()=>err)
            })
        )
    }

    // now you knew that catch error is operator from the observbales operators to handle the observable and it take from me a call back function that take parameter and this function recievs the error inside its parameter and you can show it using throw error







    handleRegisterSuccess(token:string){                                                                                        //this function we will use in the register component after we use the above function and sending the request , and after sending the request and the token is returned , it will be passed to this function to be allocated in the local storage
        if(isPlatformBrowser(this.platformId)){
            localStorage.setItem('token',token)
        }
        this.isUserLoggedSubject.next(true);                                                                                    //and update isUserLoggeSubject to be true to be updated in the components using it
        this.refreshToken();
    }








    logout(){                                                                                                                            //this is the logout function which remove the token of the user from the local storage and update the value of the isUserLogged to be false
        if(isPlatformBrowser(this.platformId)){
            localStorage.removeItem('token')
        }
        this.isUserLoggedSubject.next(false);
        this.router.navigateByUrl('/auth/login');                                                                        //and when he did the logout it navigates to the login page
    }












    get isUserLoggedIn():boolean{                                                                                      // i use the varaible isUserLoggedIn to give it as initial value to the isUserLogged Subject by checking the local storage , if the local storage have the token so isUserLogged in will be true and isUserLoggedSubject its value will be true and it will be published in the components that the user is logged in
        if(isPlatformBrowser(this.platformId)){
            return localStorage.getItem('token')?true:false;
        }
        return false
    }












    isUserLoggedObservable():Observable<boolean>{                                                          //here we are using isUserLoggedSubject as observable to subscribe on it directly instead of making it an observable in each component we use the service
        return this.isUserLoggedSubject.asObservable()
    }










// Updates HTTP headers with the latest token. so when the user doing any request again , its token is sent with the request in the header so we know this user and he is logged

    private updateHttpOptions() {
        if (isPlatformBrowser(this.platformId)) {
          this.accessToken = localStorage.getItem('token');                                                                            //here we put the token stored in the local storage in the access token variable if the token is found
        } else {
          this.accessToken = null;
        }

        this.httpOptionAuth = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.accessToken                                                                              //here we pass the token to the headers which be sent in each reqeust
          })
        };

        this.httpOptionFormdataAuth = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.accessToken                                                                            //here we pass the token to the headers which be sent in each reqeust, so the user will be known
          })
        };
      }










      refreshToken() {
        this.updateHttpOptions();
      }


}
