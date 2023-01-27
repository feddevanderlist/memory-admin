import {Component} from '@angular/core';
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";
import {catchError, of, throwError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMsg: string | undefined;

  constructor(private loginService: LoginService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    let state = navigation?.extras.state as { data: string };
    if (state) {
      this.errorMsg = state.data;
    }
  }

  login(username: string, password: string) {
    console.log(username);
    console.log(password);
    this.errorMsg = "";
    if (typeof username === 'undefined' || !username || typeof password === 'undefined' || !password) {
      this.errorMsg = `Error: gebruikersnaam of wachtwoord mag niet leeg zijn`;
      return;
    }
    this.loginService.login(username, password)
      .pipe(
        catchError(error => {
          if (error) {
            this.errorMsg = `Error: gebruiker bestaat niet of is geen admin`
          }
          return of([]);
        })).subscribe(data => {
        if (!data || data.length == 0) {
          return;
        }
        let token = data['token'];
        const parts = token.split('.');
        const decoded = LoginComponent.urlBase64Decode(parts[1]);

        let json = JSON.parse(decoded);
        console.log(json['roles']);
        if (json['roles'].includes('ROLE_ADMIN')) {
          localStorage.setItem('jwt', token);
          this.router.navigate(["home"]);
        } else {
          throwError(() => "Error: gebruiker is geen admin");
        }
      },
      error => {
        console.log(error);
        this.errorMsg = error.media;
      })
  }

  private static urlBase64Decode(part: string): string {
    let output = part.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64 url string!');
    }
    return decodeURIComponent((<any>window).escape(window.atob(output)));
  }
}
