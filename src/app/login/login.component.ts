import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
import { AuthService } from './../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
 // providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginData: any = { email: "demo@gmail.com", password: "12345" };
  @ViewChild('loginForm', { static: true }) form: NgForm;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
      if (this.authService.currentUserValue) { 
          this.router.navigate(['/home']);
      }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

   login() {
    if (this.form.valid) {
      if(this.loginData.email =='demo@gmail.com' && this.loginData.password =='12345') {
        localStorage.setItem('currentUser', JSON.stringify(this.loginData));
        this.authService.currentUserSubject.next(this.loginData);
        
        this.router.navigate(['/home']);
      }
    }else {
      alert('Please fill all the input fields.')
    }
   }

}
