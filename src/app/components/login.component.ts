import { Component, OnInit } from '@angular/core';
import { SESSION } from '../models/session-data'
import { Session } from '../models/session'
import { User } from '../models/user'
import { LoginService } from '../services/login.service'
import { UtilityService } from '../services/utility.service'
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

    public User: User = new User;
  private session: Session = new Session;
  public alert: any = { show: false, message: '', type: '' };

    constructor(private loginService:LoginService, private activatedRoute: ActivatedRoute, private Router: Router, private utilityService: UtilityService)
    {
        this.User = new User();
        this.User.Nombre = "";
        this.User.Rol = "";
    }

    ngOnInit() {

        this.utilityService.isLogged().then((result: boolean) => {
          if (result) {
            this.Router.navigate(['/pacientes']);
          }
    
        });
    }

    ValidateFields()
    {
        this.Login(this.User);
    }

    Login(User) {
        this.loginService.Login(User)
          .subscribe(
          (response: any) => {
            if (response.Nombre !== '') {
              if (typeof (Storage) !== 'undefined') {
                localStorage.clear();
                var expirationMS = 1440 * 60 * 1000;
                this.session = new Session();
                this.session.user = response;                 
                this.session.timestamp =  new Date().getTime() + expirationMS;
                
                SESSION.user = this.session.user;
                SESSION.timestamp = this.session.timestamp;
                localStorage.setItem('Session', JSON.stringify(this.session));
                this.Router.navigate(['/pacientes']);
               }
            //    if (this.session.user.Rol !== "") {
            //      this.Router.navigate(['/pacientes']);
            //    } 
               //else {
            //     this.Router.navigate(['/home']);
            //   }
            } else {
              this.triggerAlert(true, response.message, "Danger");
              //this.serviceConnection = response.isActive;
            }
          },
          (err) => {
            console.log("getSessionData ERROR: " + err);
          }
          );
    
      }
      triggerAlert(show, message, type) {
        this.alert.show = show;
        this.alert.message = message;
        this.alert.type = type;
      }
  
}
