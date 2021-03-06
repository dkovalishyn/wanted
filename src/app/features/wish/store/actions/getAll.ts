import { Action } from '@ngrx/store';
import { Wish } from '../../../../shared/models/Wish';
import { createRequestActionTypes } from '../../../../shared/utils/actions';
import config from './config.json';

export const actionTypes = createRequestActionTypes(config.prefix)('GET_WISHES');

export class GetWishes implements Action {
    readonly type = actionTypes.START;

    constructor() {}
}

export class GetWishesSuccess implements Action {
    readonly type = actionTypes.SUCCESS;

    constructor(public payload: Wish[]) {}
}

export class GetWishesFailed implements Action {
    readonly type = actionTypes.FAILED;

    constructor(public payload: Error | null) {}
}
