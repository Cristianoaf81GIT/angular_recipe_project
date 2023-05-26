import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';


@Component({
  selector:'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent{
  isLoginMode = true;
  isLoading = false;
  errorRequest: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return null;
    }
    console.log(form.value);
    const { email, password } = form.value;

    this.isLoading = true;

    if (this.isLoginMode) {
      // .... TODO
    } else {
      this.authService.signup(email, password).subscribe({
        next: (data) => {
          console.log(`data ${JSON.stringify(data)}`);
          this.isLoading = false;
          this.errorRequest = null;
        },
        error: (errorMessage: string) => {
          this.errorRequest = errorMessage;
          this.isLoading = false;
        }
      });
    }
       form.reset();
  }
}
