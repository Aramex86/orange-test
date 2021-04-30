import React, { useEffect } from "react";
import BookCard from "../common/BookCard";
import Search from "../Search/Search";
import { AppStateType } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getItemsSelector,
  isFetchingSelector,
} from "../../store/selectors/booksSelector";
import { requestBooks } from "../../store/reducers/booksReducer";

import noImage from "../../assets/noimage.jpg";

const MainScreen = () => {
  const isFetching = useSelector((state: AppStateType) =>
    isFetchingSelector(state)
  );
  const books = useSelector((state: AppStateType) => getItemsSelector(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestBooks());
  }, []);

  console.log(isFetching);

  return (
    <section className="mainScreen_wrapp">
      <Search />
      <div className="bookCard_wrapp">
        {books?.items.map((item) => (
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
      </div>
    </section>
  );
};

export default MainScreen;
