import {Dispatch} from 'react';
import {ThunkAction} from 'redux-thunk';
import {booksApi} from '../../Api/api';
import {BooksType} from '../../Types/types';
import {AppStateType} from '../store';

const SEARCH_VALUE = 'SEARCH_VALUE';
const GET_BOOKS = 'GET_BOOKS';
const ADD_FAVORITE = 'ADD_FAVORITE';
const DELETE_FAVORITE = 'DELETE_FAVORITE'

const initialState = {
  searchValue: '',
  books: [] as Array<BooksType>,
  addToFavorite: [] as Array<BooksType>,
};

type InitialStateType = typeof initialState;

type ActionsTypes = GetItemsType | SearchValueType | AddToFavoriteType |DeleteFavoriteType;

type DispatchType = Dispatch<ActionsTypes>;

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

const booksReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SEARCH_VALUE: {
      return {
        ...state,
        searchValue: action.searchValue,
      };
    }
    case GET_BOOKS: {
      return {
        ...state,
        books: action.books,
      };
    }
    case DELETE_FAVORITE: {


      console.log(state.addToFavorite.filter(i=> i.id))
      return {
        ...state,
        addToFavorite: [...state.addToFavorite.filter(item=> item.etag !== action.etag)],
      };
    }
    case ADD_FAVORITE: {
      const removeDuplicates = new Set(
        state.addToFavorite.map((item) => item.id)
      );
      if (removeDuplicates.has(action.addToFavorite.id)) {
        return state;
      }

      return {
        ...state,
        addToFavorite: state.addToFavorite.concat(action.addToFavorite),
      };
    }
    default:
      return state;
  }
};

//Action Types

type GetItemsType = {
  type: typeof GET_BOOKS;
  books: Array<BooksType>;
};
type SearchValueType = {
  type: typeof SEARCH_VALUE;
  searchValue: string;
};
type AddToFavoriteType = {
  type: typeof ADD_FAVORITE;
  addToFavorite: BooksType;
};

type DeleteFavoriteType={
  type: typeof DELETE_FAVORITE,
  etag: string
}

//Action Creators

export const getItems = (books: Array<BooksType>): GetItemsType => {
  return {type: GET_BOOKS, books};
};

export const addToFavorite = (addToFavorite: BooksType): AddToFavoriteType => {
  return {type: ADD_FAVORITE, addToFavorite};
};

export const getSearchVal = (searchValue: string): SearchValueType => {
  return {type: SEARCH_VALUE, searchValue};
};

export const deleteFav=(etag:string):DeleteFavoriteType=>{
  return{type:DELETE_FAVORITE, etag}
}

//Thunk Creator
export const requestBooks = (searchValue: string): ThunkType => async (
  dispatch: DispatchType
) => {
  const res = await booksApi.getBooks(searchValue);
  dispatch(getItems(res));
};

export default booksReducer;
