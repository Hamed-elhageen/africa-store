import { HttpClient, HttpHeaders } from '@angular/common/http';                                                            //http client for request methods , and http headers to be sent with the reqeust
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';                                                     //for injection
import { Router } from '@angular/router';                                                                                                     //to navigate
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';                                                  //from rxjs import those to use and subscribe on changes
import { environment } from '../../environments/environment';                                                                   // importing api url from the environment
import { isPlatformBrowser } from '@angular/common';                                                                             // for checking if you are on server or browser ( useful in ssr )
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    // firstly before going to any place , we will declare out properties and and after that and inside the constructor will will initialize it
    // here only declarations
    private accessToken:string | null=null                                                                                                                                         // this is the token which will return from the backend , we will put it here
    public isUserLoggedSubject:BehaviorSubject<boolean>;                                                                                                          // this is behaviour subject which i can subscribe on in each component have injected the service and when subscribing on it i can listen to its changes , and also it act as observer which means that it can send data, changes its value to true or false since it is boalean
    public httpOptionAuth: { headers: HttpHeaders } = { headers: new HttpHeaders() };                                                                // those are the http options which will be sent with the request , in this line they are in the shape of json
    public httpOptionFormdataAuth: { headers: HttpHeaders } = { headers: new HttpHeaders() };                                                   //  here they are in the form of formdata






  constructor(private httpClient:HttpClient,                                                                                                                               //this is our constructor where to inject the services like http client which is responsible for sending http requests and router which responsibel for navigation and platform id which is resposible for checking if the place where running the project in a browser to safely use local storage
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object) {                                                                                                           //inside the constructor you initialize the properties
    this.isUserLoggedSubject=new BehaviorSubject<boolean>(this.isUserLoggedIn);                                                            //the initial value of isUserLoggedSubject will be the value of isUserLogged which is true if the token of the user in the local storage and false if it is not in the local storage
    this.updateHttpOptions();
    }







// this is the registeration function which take from me the form data writen by the user as object and post it and also it handles the error
    register(formData:FormData):Observable<any>{                                                                                               //the function return obsrevable ( the data will come later, we are waiting for it )
        return this.httpClient.post<any>(environment.apiUrl+"/auth/register/user" , formData).pipe(                            //put inside the pipe observables operators to control the observalbels
            catchError(err=>{                                                                                                                                        // catchError(...)This is an RxJS operator that catches errors from an observable (like a failed HTTP request) and lets you handle them, instead of crashing the app.
                                                                                                                                                                                 // err => { ... }This is a callback function. It receives the error that was thrown during the observable execution (e.g., if the HTTP request fails).
                console.log("registeration error :"+err);                                                                                                 //  this is only for debugging and you can delete it
                return throwError(()=>err)
            })
        )
    }
    // now you knew that catch error is operator from the observbales operators to handle the observable and it take from me a call back function that take parameter and this function recievs the error inside its parameter and you can show it using throw error




     get isUserLoggedIn():boolean{                                                                                      // i use the varaible isUserLoggedIn to give it as initial value to the isUserLogged Subject by checking the local storage , if the local storage have the token so isUserLogged in will be true and isUserLoggedSubject its value will be true and it will be published in the components that the user is logged in
        if(isPlatformBrowser(this.platformId)){
            return localStorage.getItem('token')?true:false;
        }
        return false
    }





    //when you send the verfiy code , you send the email with it (handle) , looook , here we didnt do form data , we send the email and code individuallly
    verifyUser( handle:string ,code:string) : Observable<any>{                                                                                                          //handle here is the email that will be sent with the request, and we send it with this name to be like the data the backend waiting for
        return  this.httpClient.post<any>(environment.apiUrl+"/auth/verify_user",{handle,code}).pipe(
            catchError(err=>{
                console.log("Verification error: ", err);
        return throwError(() => err);
            })
        )
    }



    //this will be at verify register component
    // handleRegisterSuccess(token:string){                                                                                        //this function we will use in the verifyregister component after he writes the code sent to him and then the token is back and we will save it in the local storage (if the back end did that after verification it sends a token and by this he logins) but here no , here after you write the verification code and everything is good , it takes you to the login page to login
    //     if(isPlatformBrowser(this.platformId)){
    //         localStorage.setItem('token',token)
    //     }
    //     this.isUserLoggedSubject.next(true);                                                                                    //and update isUserLoggeSubject to be true to be updated in the components using it
    //     this.refreshToken();
    // }






    logout(){                                                                                                                            //this is the logout function which remove the token of the user from the local storage and update the value of the isUserLogged to be false
        if(isPlatformBrowser(this.platformId)){
            localStorage.removeItem('token')
        }
        this.isUserLoggedSubject.next(false);
        this.router.navigateByUrl('/auth/login');                                                                        //and when he did the logout it navigates to the login page
    }
    //you can use this logout function or which is in the login





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
