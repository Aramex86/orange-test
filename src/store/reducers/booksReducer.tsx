import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { booksApi } from "../../Api/api";
import { BooksType, BookType } from "../../Types/types";
import { AppStateType } from "../store";

const SEARCH_VALUE = "SEARCH_VALUE";
const GET_BOOKS = "GET_BOOKS";
const ADD_FAVORITE = "ADD_FAVORITE";
const TOOGLE_PRELOADER = "IS_FETCHING";

const initialState = {
  searchValue: "",
  books: JSON.parse(localStorage.getItem('data')!) as Array<BooksType>,
  addToFavorite: [] as Array<BooksType>,
  isFetching: false,
};

type InitialStateType = typeof initialState;

type ActionsTypes =
  | GetItemsType
  | SearchValueType
  | AddToFavoriteType
  | IsFetchingType;

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
        books: state.books,
      };
    }
    case ADD_FAVORITE: {
      return {
        ...state,
        addToFavorite: Array.from(
          new Set([...state.addToFavorite, action.addToFavorite])
        ),
      };
    }
    case TOOGLE_PRELOADER: {
      return {
        ...state,
        isFetching: action.isFetching,
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

type IsFetchingType = {
  type: typeof TOOGLE_PRELOADER;
  isFetching: boolean;
};

//Action Creators

export const getItems = (books: Array<BooksType>): GetItemsType => {
  return { type: GET_BOOKS, books };
};

export const isFetching = (isFetching: boolean): IsFetchingType => {
  return { type: TOOGLE_PRELOADER, isFetching };
};

export const addToFavorite = (
  addToFavorite: BooksType
): AddToFavoriteType => {
  return { type: ADD_FAVORITE, addToFavorite };
};

export const getSearchVal=(searchValue:string):SearchValueType=>{
return{type:SEARCH_VALUE,searchValue}
}

//Thunk Creator
export const requestBooks = (searchValue:string): ThunkType => async (dispatch: DispatchType) => {
  const res = await booksApi.getBooks(searchValue);
  console.log(res)
  dispatch(isFetching(true));
  // dispatch(getItems(data));
  dispatch(isFetching(false));
};

export const requestBook = (): ThunkType => async (
  dispatch: DispatchType
) => {};
export default booksReducer;
