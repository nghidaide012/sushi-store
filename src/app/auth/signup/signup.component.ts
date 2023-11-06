import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  errorMes: string = '';
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
      ],
      'confirmPas': [null, {
        validators: [Validators.required]
      }
      ],
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
  get confirmPas()
  {
    return this.form.controls['confirmPas']
  }

  onSignup()
  {
    const email = this.form.value.username;
    const password = this.form.value.password;
    const confirmPas = this.form.value.confirmPas;
    if(password !== confirmPas)
    {
      this.errorMes = 'Confirm password need to be the same with password'
    }
    else
    {
    this.authService.signUp(email, password)
    .then((res) => {
      if(res !== 'success')
      {
        this.errorMes = "This email already in used!"
      }
      else
      {
        this.router.navigate(['/auth']);
      }
    })
  }
  }
  ngOnDestroy(): void {
    if(this.numOfSubscription)
    {
      this.numOfSubscription.unsubscribe();
    }
  }
}
