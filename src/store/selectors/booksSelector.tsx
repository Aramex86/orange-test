import { AppStateType } from "../store";

export const getItemsSelector=(state:AppStateType)=>{
    return state.books
}
export const favoriteSelector=(state:AppStateType)=>{
    return state.addToFavorite
}
export const valueSelector=(state:AppStateType)=>{
    return state.searchValue
}
