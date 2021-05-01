import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchVal, requestBooks} from '../../store/reducers/booksReducer';
import {valueSelector} from '../../store/selectors/booksSelector';
import {AppStateType} from '../../store/store';

const Search = () => {
  const [val, setVal] = useState('');
  const storeVal = useSelector((state: AppStateType) => valueSelector(state));
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVal(value);
    dispatch(getSearchVal(value));
  };

  useEffect(() => {
    const stopTyping = setTimeout(() => {
      if (!val) {
        console.log(`enter value`);
        return;
      }

      if (val) {
        console.log(`send request ${val}`);
        dispatch(requestBooks(val));
      }
    }, 1000);

    return () => clearTimeout(stopTyping);
  }, [val]);

  return (
    <div className="search_warpp">
      <input
        type="text"
        placeholder="type for search books..."
        className="search_warpp-input"
        onChange={handleChange}
        // value={storeVal}
      />
    </div>
  );
};

export default Search;
