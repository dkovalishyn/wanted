import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DynamicFormsModule } from '../../ui/forms/dynamic-forms.module';
import { ModalsModule } from '../../ui/modals/modals.module';

import { UserService } from './services/user.service';
import { LoginFormService } from './services/login-form.service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { RegisterFormService } from './services/register-form.service';

import { reducer } from './store/reducers';
import { AuthEffects } from './store/effects';
import { AuthRoutingModule } from './auth-routing.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormsModule,
    ModalsModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    UserService,
    LoginFormService,
    RegisterFormService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthModule {
}
