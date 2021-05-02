import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {BooksType} from '../../Types/types';
import {BsStar} from 'react-icons/bs';
import {BsStarFill} from 'react-icons/bs';
import {addToFavorite} from '../../store/reducers/booksReducer';
// import noImage from '../../assets/noimage.jpg';
import {AppStateType} from '../../store/store';
import {
  favoriteSelector,
  getItemsSelector,
} from '../../store/selectors/booksSelector';
import parse from 'html-react-parser';

type ParamsType = {
  bookId: string;
};
const Details = () => {
  const booksList = useSelector((state: AppStateType) =>
    getItemsSelector(state)
  );
  const favorite = useSelector((state: AppStateType) =>
    favoriteSelector(state)
  );

  console.log(favorite);
  const [bookmark, setBookmark] = useState(false);
  const dispatch = useDispatch();
  let {bookId}: ParamsType = useParams();

  const findBookById = booksList.find(
    (item: BooksType) => item.id === bookId
  ) as BooksType;

  const handleAddToFavorite = () => {
    setBookmark(true);
    dispatch(addToFavorite(findBookById));
  };

  return (
    <section className="detail_wrapp">
      <button className="detail_wrapp-btn" onClick={handleAddToFavorite}>
        {bookmark ? <BsStarFill size="24" fill="gold" /> : <BsStar size="24" />}
      </button>
      <h3 className="detail_wrapp-title">{findBookById?.volumeInfo.title}</h3>
      <h4 className="detail_wrapp-subtitle">
        {findBookById?.volumeInfo.subtitle}
      </h4>
      <div className="desc_wrapp">
        <img
          src={findBookById?.volumeInfo.imageLinks.thumbnail}
          alt={findBookById?.volumeInfo.title}
          className="desc_wrapp-img"
        />
        <div className="desc_wrapp-description">
          {!findBookById?.volumeInfo.description
            ? ''
            : findBookById?.volumeInfo.description.replaceAll(/<[^>]+>/g, '')}
        </div>
      </div>
      <p>
        {findBookById?.searchInfo === undefined
          ? 'no search Info'
          : parse(findBookById.searchInfo.textSnippet)}
      </p>
    </section>
  );
};

export default Details;
