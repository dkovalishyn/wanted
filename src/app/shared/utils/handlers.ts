import { Action } from '@ngrx/store';
import { omit } from 'ramda';
import { ActionWithPayload, defaultRequestStatus, RequestStatus, STATUS } from './types';

interface SuccessAction extends Action {
  payload: any[];
}

const convertToDataObject = (key: string) => (action: SuccessAction) => {
  const { payload } = action;
  if (Array.isArray(payload) && key) {
    return payload.reduce((acc, item) => ({ ...acc, [item[key]]: item }), {});
  }

  return payload;
};

export const normalizeData = (key: string) => (action: SuccessAction) => {
  const dataObject = convertToDataObject(key)(action);
  const dataIds = Object.keys(dataObject);
  return {
    entities: dataObject,
    ids: dataIds,
  };
};

export const modifyData = (key: string) => (state: any, action: SuccessAction) => {
  const dataObject = {
    ...state.entities,
    [action.payload[key]]: action.payload,
  };
  const dataIds = Object.keys(dataObject);
  return {
    ...state,
    ids: dataIds,
    entities: dataObject
  };
};

export const deleteItem = (state: any, action: ActionWithPayload) => {
  const key = action.payload['_id'];
  const dataObject = omit([key], state.entities);
  const dataIds = Object.keys(dataObject);

  return {
    ...state,
    ids: dataIds,
    entities: dataObject
  };
};

export interface RequestActionTypes {
  START: string;
  SUCCESS: string;
  FAILED: string;
}

export const createRequestReducer = (actionTypes: RequestActionTypes) =>
  (state: RequestStatus = defaultRequestStatus, action: Action) => {
    switch (action.type) {
      case (actionTypes.SUCCESS):
        return {
          ...state,
          status: STATUS.SUCCESS,
          error: null,
        };
      case (actionTypes.FAILED):
        return {
          ...state,
          status: STATUS.FAILED,
          error: (action as ActionWithPayload).payload,
        };
      case (actionTypes.START):
        return {
          ...state,
          status: STATUS.PENDING,
          error: null,
        };
      default:
        return state;
    }
  };
