import { Action } from '@ngrx/store';
import { createRequestActionTypes } from '../../../../../shared/utils/actions';
import { AuthResponse, RefreshTokenBody } from '../../services/typings';
import config from './config.json';

export const actionTypes = createRequestActionTypes(config.prefix)('REFRESH_TOKEN');

export class RefreshToken implements Action {
    readonly type = actionTypes.START;

    constructor(public payload: RefreshTokenBody) {}
}

export class RefreshTokenSuccess implements Action {
    readonly type = actionTypes.SUCCESS;

    constructor(public payload: AuthResponse) {}
}

export class RefreshTokenFailed implements Action {
    readonly type = actionTypes.FAILED;

    constructor(public payload: Error | null) {}
}
