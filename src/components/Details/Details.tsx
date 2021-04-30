import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { oneBookSelector } from "../../store/selectors/booksSelector";
import { AppStateType } from "../../store/store";
import { BooksType, BookType } from "../../Types/types";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { addToFavorite } from "../../store/reducers/booksReducer";

type ParamsType = {
  bookId: string;
};
const Details = () => {
  const book = useSelector((state: AppStateType) => oneBookSelector(state));
  const [bookmark, setBookmark] = useState(false);
  const dispatch = useDispatch();
  let { bookId }: ParamsType = useParams();

  console.log(book);

  const {
    volumeInfo: {
      title,
      imageLinks: { thumbnail },
      subtitle,
    },
  } = book as BooksType;

  console.log(bookId);

  const handleAddToFavorite = () => {
    setBookmark(true);
    dispatch(addToFavorite([]));
  };

  console.log(bookmark);
  return (
    <section className="detail_wrapp">
      <button className="detail_wrapp-btn" onClick={handleAddToFavorite}>
        {bookmark ? <BsStarFill size="24" fill="gold" /> : <BsStar size="24" />}
      </button>
      <h3 className="detail_wrapp-title">{title}</h3>
      <h4 className="detail_wrapp-subtitle">{subtitle}</h4>
      <div className="desc_wrapp">
        <img src={thumbnail} alt={title} className="desc_wrapp-img" />
        <div className="desc_wrapp-description">
          {book?.volumeInfo.description.replaceAll(/<[^>]+>/g, "")}
        </div>
      </div>
      <p>
        {book?.searchInfo === undefined
          ? "no search Info"
          : book.searchInfo.textSnippet}
      </p>
    </section>
  );
};

export default Details;
