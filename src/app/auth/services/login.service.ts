import { HttpClient, HttpHeaders } from '@angular/common/http';                                                                //httpClient service for using request methods (get , post , delete , patch , update) , httpHeaders we use it to be sent with each request to the server and it contains the token that tell the server that this user who is doing the aciton
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';                                                                  //for using injection
import { Router } from '@angular/router';                                                                                                      //for using navigate and go to pages after specific action
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';                                                   // we use those from rxjs to deal with things that change and i subscribe on it to see this change
import { environment } from '../../environments/environment';                                                                     //where the api link is found
import { isPlatformBrowser } from '@angular/common';                                                                             // for checking if you are on browser or server

@Injectable({
  providedIn: 'root'                                                                                                                                       //this means that you can use the service at every place in the project
})
export class LoginService {
private accessToken:string|null=null;                                                                                                                     //Stores the current user's token sent from the backend
public isUserLoggedSubject:BehaviorSubject<boolean>;                                                                                    //this is a behaviour subject which acts as observable , which i will  subscibe on it in any component  and  listen to any changes to it , "it tells me if the user logged in or logged our or any change " ///and also can act as observer that can send data , like making is userlogged subject is true when user log in  "isuserloggedsubject.next(true)" and also can make it false if user logged out
public httpOptionAuth: { headers: HttpHeaders } = { headers: new HttpHeaders() };                                         // those are the headers which will be sent with any request , this will be in the shape of json
public httpOptionFormdataAuth: { headers: HttpHeaders } = { headers: new HttpHeaders() };                         // those are the headers which will be sent with any request , this will be in the shape of formdata



  constructor(private httpClient:HttpClient                                                                                                        //injecting http client service to use all requests methods like get , post , delete , patch
     , private router:Router ,                                                                                                                                //injecting router for using navigate , to navigate to landing page if login succeeded or navigate to the dashboard if he was admin
    @Inject(PLATFORM_ID) private platformId: Object )                                                                                    //i injected this service to use it to check if i am runing the project on the browser or not , because if i wasnt running it on browser it will be an problem with local storage  , so i do this check to safely use local storage.)
    {
        this.isUserLoggedSubject=new BehaviorSubject<boolean>(this.isUserLoggedIn);                                //•	Initializes isUserLoggedSubject with the current login state (true or false). but we here didnt put it directly true or false , we put it in a varirable "isUserLoggedIn" which its value is determined under based on finding the token in local storage or not , take care (the behaviour subject should be initialized with initial value)
        this.updateHttpOptions();                                                                                                                         //• Sets up HTTP headers with the current token (if available). this means that you update http options and any request will be send from now , will send with your token , as your are a user now , not needing to do login again, so it sends the token with the http headers and now he updates it with this token.
    }



    login(formData:FormData): Observable<any>{                                                                                         // login function which didnt return static data , it returns an observable "promise that i will return data later" or " we are waiting the response" and you subscribe on it to get the data sent from the server
        return this.httpClient.post<any>(environment.apiUrl+"/auth/login",formData).pipe(
            catchError(err=>{                                                                                                                               //handles the error if occured , Catches any error if login fails.
                console.log("login error ",err);
                return throwError(()=>err)
            })
        )
    }
                                                                                                                                                                        //after you finish the login funcion , you must 1- save the token back in the local storage               2- change isUserLoggedSubject value to true                         those 2 things will be put in a function called handleloginsuccess which works after login function






                                                                                                                                                                        //now you did the login function and handled if there were any error , now handle if the login succeeded , "if you send the post request and the backend checks it and the user data sent are true" and passed to you a token , what i should do after that :
    handleLoginSuccess(token:string){                                                                                                                //this function will be used after  returning the token  ,  after that you pass the token to this funciton as parameter , and it will be added to local storage
        if(isPlatformBrowser(this.platformId)){                                                                                                      // in your login component you will use the login function with its error handling and after it you will use this function to save the toke retured from the back end
            localStorage.setItem('token',token)
        }
        this.isUserLoggedSubject.next(true);                                                                                                        //and now update the value of the isUserLoggedSubject with true after the user had logged /////dont forget that isUserLoggedSubjec is a behaviour subject that can act as observer and send data like now making his value true after logging and savign the token of the user to the local storage
        this.refreshToken();                                                                                                                                  // Refresh headers with new token as he is a user now
    }





                                                                                                                                                                 //now it is the opposite of the 2 steps above , when logging out  1- remove the token from the local storage           2- changing isUserLoggedSubject value to false , do you know why we change it , becasue each place subscribing on it will listen to this change , like the header , in which the sign up button will appear when you logout
    logout(){                                                                                                                                                //the same logout function if you call it when clicking on logout button it will remove the token of the user and he will be unknown and not logged
        if(isPlatformBrowser(this.platformId)){                                                                                              //dont forget to use isplatformBrowser checking to safely use local storage
            localStorage.removeItem('token')
        }
        this.isUserLoggedSubject.next(false);                                                                                               //so here we updated isUserLoggedSubject with false
    }






    get isUserLoggedIn() :boolean{                                                                                                        //isUserLoggedIn which i used in isUserLoggedSubject as initial value wont be true or false by luck , it will be true or false based on finding the token of the user in the local storage
        if(isPlatformBrowser(this.platformId)){
                return localStorage.getItem('token')? true:false;                                                                  //if the token of the user in the local storage , so isloggedin will be true , and vice verca
    }
     return false;
}






isLoggedInObservable(): Observable<boolean> {                                                                              //making isLoggedSubject to act as observable here
    return this.isUserLoggedSubject.asObservable();                                                                          //"by this function isUserloggedSubject will act as observable which i can subscribe on its value if it chaned , and based on its value i can do alot of actions such hiding log in and logout button and so on "
 }








                                                                                                                                                            //this is the function to update the httpHeaders with the token sent from the server , and this token will be send with each request
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
