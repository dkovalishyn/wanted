import { Component, OnInit } from '@angular/core';
import { LoginFormService } from '../../services/login-form.service';
import { Field } from '../../../../models/field';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../../log/services/message.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Login } from '../../store/actions';
import { State } from '../../../../store';

@Component({
  selector: 'app-login',
  template: `
    <app-modal backLink="/">
      <app-form
        [fields]="fields"
        (onSubmit)="onSubmit($event)"
        submitLabel="LogIn"
        title="LogIn"
      >
        <button mat-button routerLink="/register">New account</button>
      </app-form>
    </app-modal>
  `,
  providers: [LoginFormService, UserService]
})
export class LoginComponent implements OnInit {
  fields: Field<any>[];

  constructor(
    private loginFormService: LoginFormService,
    private store: Store<State>,
    private messageService: MessageService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.fields = this.loginFormService.getFields();
  }

  onSubmit(user) {
    this.store.dispatch(new Login(user));
  }
}
