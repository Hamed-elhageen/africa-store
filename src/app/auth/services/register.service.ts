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
    public isUserLoggedSubject:BehaviorSubject<boolean>;                                                                                                          // this is behaviour subject which i can subscribe on in each component have injected the service and when subscribing on it i can listen to its changes , and also it act as observer which means that it can send data, changes its value to true or false since it is boalean





  constructor(private httpClient:HttpClient,                                                                                                                               //this is our constructor where to inject the services like http client which is responsible for sending http requests and router which responsibel for navigation and platform id which is resposible for checking if the place where running the project in a browser to safely use local storage
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object) {                                                                                                           //inside the constructor you initialize the properties
    this.isUserLoggedSubject=new BehaviorSubject<boolean>(this.isUserLoggedIn);                                                            //the initial value of isUserLoggedSubject will be the value of isUserLogged which is true if the token of the user in the local storage and false if it is not in the local storage , take care that behaviour subject should have initial value and it acts as observer and observable
    }



                                                                                                                                                                                               //take care , here in out project , after you register  , you go to login again . so there are no token of http headers here



// this is the registeration function which take from me the form data writen by the user as object and post it and also it handles the error
    register(formData:FormData):Observable<any>{                                                                                               //the function return obsrevable ( the data will come later, we are waiting for it ) and you will subscribe on it to get the data and the type of data returning i made it any becuase i dont know what will it be
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



    // in the login service , there was two statuses , one is the request failed and i handeled the error imediately in the login function , and one is the request succeeded and returns a token i passed it to handle login success
    // here we also have two status , one is the request failed and i handeled the error in catch error in register function , onother is that the reqeust succeeded , and a code will be sent to the email to verify, and here the function of verifying this code and this code and the email will be sent to server , and in the component if everything is good , it will take you to the login again

    //when you send the verfiy code , you send the email with it (handle) , looooook , here we didnt do form data , we send the email and code individuallly
    verifyUser( handle:string ,code:string) : Observable<any>{                                                                                                          //handle here is the email that will be sent with the request, and we send it with this name to be like the data the backend waiting for
        return  this.httpClient.post<any>(environment.apiUrl+"/auth/verify_user",{handle,code}).pipe(
            catchError(err=>{
                console.log("Verification error: ", err);
        return throwError(() => err);
            })
        )
    }




    //now , you knew that the services is used to separate in it business login and the requestes to make clean code , and this requests and function you subscribe on it in the component







    isUserLoggedObservable():Observable<boolean>{                                                          //here we are using isUserLoggedSubject as observable to subscribe on it directly instead of making it an observable in each component we use the service , ( we will use it in components liike header to know the log status)
        return this.isUserLoggedSubject.asObservable()
    }

}
