import { store } from 'app/stores/store';
import React from 'react'

export const paginationInitialState = {
  queryPageIndex: 0,
  queryPageSize: 10,
  totalPageCount: 0,
};

//This is like a mobx mini-store
//mobx stores are global, and singleton
//this store is like a transient or scoped class that any table can use. 

export type PaginationStateType = typeof paginationInitialState;
export type PaginationDispatchType = React.Dispatch<{
      type: ReducerType,
      payload: number
    }>

export const PAGE_CHANGED = 'PAGE_CHANGED';
export const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED';
export const TOTAL_PAGE_COUNT_CHANGED = 'TOTAL_PAGE_COUNT_CHANGED';

export type ReducerType = 'PAGE_CHANGED' | 'PAGE_SIZE_CHANGED' | 'TOTAL_PAGE_COUNT_CHANGED'

const reducer = (state: PaginationStateType, { type, payload }: {
    type: ReducerType,
    payload: any
  }) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
      };
    case TOTAL_PAGE_COUNT_CHANGED:
      return {
        ...state,
        totalPageCount: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

const usePaginationMetaData = (pageSizeDefault: number = 10): [PaginationStateType, PaginationDispatchType] => {
  return (
    React.useReducer(reducer, {...paginationInitialState, queryPageSize: pageSizeDefault}) // reducer hook
  )
}

export default usePaginationMetaData