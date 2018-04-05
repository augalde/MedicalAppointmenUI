import { Injectable } from '@angular/core';

@Injectable()

export class UtilityService{
    isLogged(): Promise<boolean>{
        if(typeof (Storage)!== 'undefined'){
            if(localStorage['Session']){
                var session=JSON.parse(localStorage['Session'])
                if(new Date().getTime() < session.timestamp){
                    return Promise.resolve(true);
                }else{
                    return Promise.resolve(false);
                }
               
            }
        }
        return Promise.resolve(false);
    }
}