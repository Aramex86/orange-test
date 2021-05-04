import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchVal, requestBooks } from "../../store/reducers/booksReducer";
import { valueSelector } from "../../store/selectors/booksSelector";
import { AppStateType } from "../../store/store";
import { IoIosClose } from "react-icons/io";

const Search = () => {
  const storeVal = useSelector((state: AppStateType) => valueSelector(state));
  const [val, setVal] = useState(storeVal);
  const dispatch = useDispatch();

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
  }, [val]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVal(value);
    dispatch(getSearchVal(value));
  };

  const handleEmpty = () => {
    dispatch(getSearchVal(""));
    setVal("");
  };

  return (
    <div className="search_warpp">
      <div className="search_warpp-inputWrap">
        <input
          type="text"
          placeholder="type for search books..."
          className="search_warpp-input"
          onChange={handleChange}
          value={val}
        />
        {val ? (
          <button className="btn-empty" onClick={handleEmpty}>
            <IoIosClose size="24" color="#a7a7a7" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
