import {Component} from '@angular/core';
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) {
  }

  login(username: string, password: string) {
    console.log(username);
    console.log(password);
    this.loginService.login(username, password).pipe(
      catchError(err => {
        if (err['status']) {

        }
      })
    ).subscribe(data => {

    })
  }
}
