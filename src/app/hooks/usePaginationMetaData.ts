import React from 'react'

export const initialState = {
  queryPageIndex: 0,
  queryPageSize: 5,
  totalPageCount: 0,
};

type StateType = typeof initialState;
type DispatchType = React.Dispatch<{
      type: ReducerType,
      payload: Partial<StateType>
    }>

export const PAGE_CHANGED = 'PAGE_CHANGED';
export const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED';
export const TOTAL_PAGE_COUNT_CHANGED = 'TOTAL_PAGE_COUNT_CHANGED';

export type ReducerType = 'PAGE_CHANGED' | 'PAGE_SIZE_CHANGED' | 'TOTAL_PAGE_COUNT_CHANGED'

const reducer = (state: StateType, { type, payload }: {
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

const usePaginationMetaData = (): [StateType, DispatchType] => {
  return (
    React.useReducer(reducer, initialState)
  )
}

export default usePaginationMetaData