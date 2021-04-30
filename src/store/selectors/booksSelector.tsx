import { AppStateType } from "../store";

export const getItemsSelector=(state:AppStateType)=>{
    return state.books
}
export const isFetchingSelector=(state:AppStateType)=>{
    return state.isFetching
}
export const oneBookSelector=(state:AppStateType)=>{
    return state.book
}

export const favoriteSelector=(state:AppStateType)=>{
    return state.addToFavorite
}