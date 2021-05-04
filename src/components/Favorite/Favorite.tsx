import React from 'react';
import {useSelector} from 'react-redux';
import {favoriteSelector} from '../../store/selectors/booksSelector';
import {AppStateType} from '../../store/store';
import BookCard from '../common/BookCard';
import noImage from '../../assets/noimage.jpg';

const Favorite = () => {
  const favorite = useSelector((state: AppStateType) =>
    favoriteSelector(state)
  );

  return (
    <section className="fav_wrapp">
      {favorite.map(
        ({id, volumeInfo: {title, imageLinks, subtitle}, searchInfo}) => (
          <BookCard
            key={id}
            id={'non'}
            title={title}
            thumbnail={
              imageLinks.smallThumbnail === undefined
                ? `${noImage}`
                : imageLinks.smallThumbnail
            }
            subtitle={subtitle}
            searchInfo={searchInfo === undefined ? '' : searchInfo.textSnippet}
          />
        )
      )}
    </section>
  );
};

export default Favorite;
