import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../../services/login-service/login-service.service';
import {TranslateService} from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  textAlign= 'left';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginSevice: LoginServiceService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
) {
    // redirect to home if already logged in
    if (this.loginSevice.currentUserValue) { 
        this.router.navigate(['/']);
    }

      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('en');

}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  }

  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    console.log(this.loginForm.value);
    var username = this.loginForm.value['username'];
    var password = this.loginForm.value['password'];

    this.loading = true;
    this.loginSevice.login(username, password)
        .pipe(first())
        .subscribe(
            data => {
          
                this.router.navigateByUrl('/home');
            },
            error => {
                
              this.snackBar.open('Login failed', '', {
                duration: 2000,
                verticalPosition: 'top'
             });
            });
  }

  onLangChange(event)
  {
      if(event.checked)
      {
        this.translate.use('he');
        this.textAlign = 'right';
      }
      else
      {
        this.translate.use('en');
        this.textAlign = 'left';
      }
  }




}
