import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchVal, requestBooks} from '../../store/reducers/booksReducer';
import {valueSelector} from '../../store/selectors/booksSelector';
import {AppStateType} from '../../store/store';

const Search = () => {
  const storeVal = useSelector((state: AppStateType) => valueSelector(state));
  const [val, setVal] = useState(storeVal);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVal(value);
    dispatch(getSearchVal(value));
  };

  useEffect(() => {
    const stopTyping = setTimeout(() => {
      if (!val) {
        return;
      }

      if (val) {
        dispatch(requestBooks(val));
      }
    }, 1000);

    return () => clearTimeout(stopTyping);
  }, [val, dispatch]);

  return (
    <div className="search_warpp">
      <input
        type="text"
        placeholder="type for search books..."
        className="search_warpp-input"
        onChange={handleChange}
        value={val}
      />
    </div>
  );
};

export default Search;
