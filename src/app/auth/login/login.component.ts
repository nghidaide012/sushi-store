import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  invalid: boolean = false;
  numOfSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder){}
  ngOnInit(): void {
    this.numOfSubscription = this.authService.loginStatus$.subscribe({next: (res) => {if(res){this.router.navigate(['/'])}}})
    this.form = this.fb.group({
      'username': [null, {
        validators: [Validators.required, Validators.email]
      }],
      'password': [null, {
        validators: [Validators.required]
      }
      ]
    })
  }

  get username()
  {
    return this.form.controls['username']
  }

  get password()
  {
    return this.form.controls['password']
  }

  onLogin()
  {
    const email = this.form.value.username;
    const password = this.form.value.password;
    this.authService.login(email, password)
    .then((res) => {
      if(!res)
      {
        this.invalid = true
      }
      else
      {
        this.invalid = false
        window.location.href = '/';
      }
    })
  }
  ngOnDestroy(): void {
    if(this.numOfSubscription)
    {
      this.numOfSubscription.unsubscribe();
    }
  }
}
