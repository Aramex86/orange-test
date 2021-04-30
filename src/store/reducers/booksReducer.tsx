import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { booksApi } from "../../Api/api";
import { BooksType, ItemsType } from "../../Types/types";
import { AppStateType } from "../store";

const SEARCH_VALUE = "SEARCH_VALUE";
const GET_BOOKS = "GET_BOOKS";
const GET_BOOK = "GET_BOOK";
const ADD_FAVORITE = "ADD_FAVORITE";
const TOOGLE_PRELOADER = "IS_FETCHING";

const initialState = {
  searchValue: "",
  books: null as ItemsType | null,
  addToFavorite: [] as Array<BooksType>,
  isFetching: false,
  book: {} as BooksType ,
};

type InitialStateType = typeof initialState;

type ActionsTypes =
  | GetItemsType
  | SearchValueType
  | AddToFavoriteType
  | IsFetchingType
  | BookType;

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
    case GET_BOOK: {
      return {
        ...state,
        book: action.book,
      };
    }
    case ADD_FAVORITE: {


      return {
        ...state,
        addToFavorite: Array.from(new Set([...state.addToFavorite,state.book]))
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
  books: ItemsType;
};
type SearchValueType = {
  type: typeof SEARCH_VALUE;
  searchValue: string;
};
type AddToFavoriteType = {
  type: typeof ADD_FAVORITE;
  addToFavorite: Array<BookType>;
};

type IsFetchingType = {
  type: typeof TOOGLE_PRELOADER;
  isFetching: boolean;
};

type BookType = {
  type: typeof GET_BOOK;
  book: BooksType;
};

//Action Creators

export const getItems = (books: ItemsType): GetItemsType => {
  return { type: GET_BOOKS, books };
};

export const isFetching = (isFetching: boolean): IsFetchingType => {
  return { type: TOOGLE_PRELOADER, isFetching };
};

export const getBook = (book:BooksType): BookType => {
    return {type:GET_BOOK, book}
};

export const addToFavorite=(addToFavorite:Array<BookType>):AddToFavoriteType=>{
    return{type:ADD_FAVORITE,addToFavorite}
}

//Thunk Creator
export const requestBooks = (): ThunkType => async (dispatch: DispatchType) => {
  const res = await booksApi.getBooks();
  dispatch(isFetching(true));
  dispatch(getItems(res));
  dispatch(isFetching(false));
};

export const requestBook=(id:string):ThunkType=>async(dispatch:DispatchType)=>{
    const res = await booksApi.getBook(id)
    dispatch(getBook(res))
}

export default booksReducer;
