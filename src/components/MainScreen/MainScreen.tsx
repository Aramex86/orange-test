import React from 'react';
import BookCard from '../common/BookCard';
import Search from '../Search/Search';

import {AppStateType} from '../../store/store';
import {useSelector} from 'react-redux';
import {getItemsSelector} from '../../store/selectors/booksSelector';

import noImage from '../../assets/noimage.jpg';

const MainScreen = () => {
  const books = useSelector((state: AppStateType) => getItemsSelector(state));

  return (
    <section className="mainScreen_wrapp">
      <Search />
      <div className="bookCard_wrapp">
        {!books?<div className='no_booksError'>No such books! Try another title</div>:<> {books.length === 0 ? (
          <div className="bookCard_wrapp-nobooks">No Books Yet</div>
        ) : (
          books.map(({id,etag, volumeInfo, searchInfo}) => (
            <BookCard
              key={id}
              etag={etag}
              id={id}
              title={volumeInfo.title}
              thumbnail={
                volumeInfo.imageLinks === undefined
                  ? `${noImage}`
                  : volumeInfo.imageLinks.smallThumbnail
              }
              subtitle={volumeInfo.subtitle}
              searchInfo={
                searchInfo === undefined ? '' : searchInfo.textSnippet
              }
            />
          ))
        )}</>}
       
      </div>
    </section>
  );
};

export default MainScreen;
