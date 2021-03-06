import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, share, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/Observable/of';
import { UserService } from '../services/user.service';
import * as fromLogin from './actions/login';
import * as fromRefreshToken from './actions/refreshToken';
import { RefreshToken } from './actions/refreshToken';
import * as fromLogout from './actions/logout';
import * as fromRegister from './actions/register';
import * as fromGetUserProfile from './actions/getUserProfile';
import { GetUserProfile } from './actions/getUserProfile';
import { ActionWithPayload } from '../../../../shared/utils/types';
import { AppState } from '../../../../store/reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState>,
  ) {
  }

  @Effect()
  login$ = this.actions$.pipe(
    ofType(fromLogin.actionTypes.START),
    mergeMap((action: ActionWithPayload) => this.userService.login(action.payload).pipe(
      mergeMap((data) => [
        new fromLogin.LoginSuccess(data),
        new GetUserProfile(),
      ]),
      catchError(error => of(new fromLogin.LoginFailed(error))),
    )),
  );

  @Effect()
  refreshToken$ = this.actions$.pipe(
    ofType(fromRefreshToken.actionTypes.START),
    switchMap((action: RefreshToken) =>
      this.userService.refreshToken(action.payload)
        .pipe(
          map((data) => new fromRefreshToken.RefreshTokenSuccess(data)),
          catchError(error => of(new fromRefreshToken.RefreshTokenFailed(error))),
        )
    ),
    share()
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(fromLogout.actionTypes.START),
    mergeMap(() => this.userService.logout().pipe(
      map(() => new fromLogout.LogoutSuccess()),
      catchError(error => of(new fromLogout.LogoutFailed(error))),
    )),
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofType(fromRegister.actionTypes.START),
    mergeMap((action: ActionWithPayload) => this.userService.register(action.payload).pipe(
      mergeMap((data) => [
        new fromRegister.RegisterSuccess(data),
        new GetUserProfile(),
      ]),
      catchError(error => of(new fromRegister.RegisterFailed(error))),
    )),
  );

  @Effect()
  getUserProfile$ = this.actions$.pipe(
    ofType(fromGetUserProfile.actionTypes.START),
    mergeMap(() => this.userService.getUserProfile().pipe(
      map((data) => new fromGetUserProfile.GetUserProfileSuccess(data)),
      catchError(error => of(new fromGetUserProfile.GetUserProfileFailed(error)))
    ))
  );

}
