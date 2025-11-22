import { HttpClient, HttpHeaders } from '@angular/common/http';                                                                             //http client for request methods , and http headers to be sent with the reqeust
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';                                                                      //for injection
import { Router } from '@angular/router';                                                                                                                      //to navigate
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';                                                                   //from rxjs import those to use and subscribe on changes
import { environment } from '../../environments/environment';                                                                                    // importing api url from the environment
import { isPlatformBrowser } from '@angular/common';                                                                                              // for checking if you are on server or browser ( useful in ssr )
import { RegisterResponse } from '../models/register-response';
import { VerificationResponse } from '../models/verify-code-response';
@Injectable({
    providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient:HttpClient,                                                                                                                               //this is our constructor where to inject the services like http client which is responsible for sending http requests and router which responsibel for navigation and platform id which is resposible for checking if the place where running the project in a browser to safely use local storage
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object)
    { }
    //take care , here in out project , after you register  , you go to login again . so there are no token of http headers here

    // this is the registeration function which take from me the form data writen by the user as object and post it and also it handles the error
    register(name:string, email:string, password:string, password_confirmation:string):Observable<RegisterResponse>{                                                                                               //the function return obsrevable ( the data will come later, we are waiting for it ) and you will subscribe on it to get the data and the type of data returning i made it any becuase i dont know what will it be
        return this.httpClient.post<RegisterResponse>(environment.api+"/auth/register" , {name,email,password,password_confirmation}).pipe(                            //put inside the pipe observables operators to control the observalbels
            catchError(err=>{                                                                                                                                                         // catchError(...)This is an RxJS operator that catches errors from an observable (like a failed HTTP request) and lets you handle them, instead of crashing the app.
                                                                                                                                                                                                  // err => { ... }This is a callback function. It receives the error that was thrown during the observable execution (e.g., if the HTTP request fails).
                console.log("registeration error :"+err.message);                                                                                                                  //  this is only for debugging and you can delete it
                return throwError(()=>err)
            })
        )
    }
    // now you knew that catch error is operator from the observbales operators to handle the observable and it take from me a call back function that take parameter and this function recievs the error inside its parameter and you can show it using throw error
    // in the login service , there was two statuses , one is the request failed and i handeled the error imediately in the login function , and one is the request succeeded and returns a token i passed it to handle login success
    // here we also have two status , one is the request failed and i handeled the error in catch error in register function , onother is that the reqeust succeeded , and a code will be sent to the email to verify, and here the function of verifying this code and this code and the email will be sent to server , and in the component if everything is good , it will take you to the login again
    //when you send the verfiy code , you send the email with it (handle) , looooook , here we didnt do form data , we send the email and code individuallly
    verifyUser( handle:string ,code:string) : Observable<VerificationResponse>{                                                                                                          //handle here is the email that will be sent with the request, and we send it with this name to be like the data the backend waiting for
        return  this.httpClient.post<VerificationResponse>(environment.api+"/auth/verify_user",{handle,code}).pipe(
            catchError(err=>{
                console.log("Verify register error: ", err);
                return throwError(() => err);
            })
        )
    }
}
