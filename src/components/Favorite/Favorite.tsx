import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { favoriteSelector } from "../../store/selectors/booksSelector";
import { AppStateType } from "../../store/store";
import BookCard from "../common/BookCard";
import noImage from "../../assets/noimage.jpg";
import { BooksType } from "../../Types/types";

const Favorite = () => {
  const favorite = useSelector((state: AppStateType) =>
    favoriteSelector(state)
  );
  const [getFavItem,setGetFavItem]=useState<Array<BooksType>>()

  console.log(favorite);

  useEffect(() => {
     
    localStorage.setItem('favorites',JSON.stringify(favorite));


    // const favoriteItems:any = localStorage.getItem('favorites');
    


    // console.log(JSON.parse(favoriteItems));
  }, []);


  console.log(getFavItem)
  return (
    <section className="fav_wrapp">
      {favorite.map((item) => (
        <BookCard
          key={item.id}
          id={item.id}
          title={item.volumeInfo.title}
          thumbnail={
            item.volumeInfo.imageLinks === undefined
              ? `${noImage}`
              : item.volumeInfo.imageLinks.smallThumbnail
          }
          subtitle={item.volumeInfo.subtitle}
          searchInfo={
            item.searchInfo === undefined ? "" : item.searchInfo.textSnippet
          }
        />
      ))}
    </section>
  );
};

export default Favorite;
