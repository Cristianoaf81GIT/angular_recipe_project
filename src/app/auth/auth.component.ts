import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector:'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent{
  isLoginMode = true;
  isLoading = false;
  errorRequest: string = null;
  @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    // used to programatically create a component
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
    let authObs: Observable<AuthResponseData> = null;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password); /*.subscribe({
        next: (data) => {
            console.log(`data:  ${JSON.stringify(data)}`);
          this.isLoading = false;
          this.errorRequest = null;
        },
        error: (errorMessage: string) => {
          this.errorRequest = errorMessage;
          this.isLoading = false;
        }
      });*/
    } else {
      authObs = this.authService.signup(email, password); /*.subscribe({
        next: (data) => {
          console.log(`data ${JSON.stringify(data)}`);
          this.isLoading = false;
          this.errorRequest = null;
        },
        error: (errorMessage: string) => {
          this.errorRequest = errorMessage;
          this.isLoading = false;
        }
      });*/
    }
    authObs.subscribe({
      next: (data) => {
        console.log(`data:  ${JSON.stringify(data)}`);
        this.isLoading = false;
        this.errorRequest = null;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage: string) => {
        this.errorRequest = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    });

    form.reset();
  }

  onHandleError() {
    this.errorRequest = null;
  }

  private showErrorAlert(errorMessage: string) {
    // const alertCmp = new AlertComponent(); not work
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const comp = hostViewContainerRef.createComponent(alertComponentFactory);
    comp.instance.message = errorMessage;
  }
}
