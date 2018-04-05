import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


const Api = environment.avaApiBaseUrl;

@Injectable()
export class LoginService {

    private req: Request;
    result: any;

    private httpRequestOptions = new RequestOptions(
        {
            withCredentials: true
        }
    );

    constructor(private _http: Http, private httpClient: HttpClient) {
        this.req = new Request({
            method: RequestMethod.Get,
            url: '',
            withCredentials: true
        });
    }

    Login(user) {
            return this._http.post(Api +'UserModels',user)
                .map((response: Response) => {
                    let result = response.json();
                    console.log(result);
                    return result;
                })
            };
    }