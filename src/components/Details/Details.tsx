import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { BooksType } from "../../Types/types";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { addToFavorite, requestBooks } from "../../store/reducers/booksReducer";
import noImage from "../../assets/noimage.jpg";
import { AppStateType } from "../../store/store";
import { getItemsSelector } from "../../store/selectors/booksSelector";
import parse from "html-react-parser";

//Test data
const TestData = require("../../Data/data.json");

type ParamsType = {
  bookId: string;
};
const Details = () => {
  const booksList = useSelector((state:AppStateType)=>getItemsSelector(state))
  const [bookmark, setBookmark] = useState(false);
  const dispatch = useDispatch();
  let { bookId }: ParamsType = useParams();


useEffect(() => {
  dispatch(requestBooks())
}, []);
  

  const findBookById = booksList.find((item:BooksType)=> item.id === bookId) as BooksType

  const handleAddToFavorite = () => {
    setBookmark(true);
      dispatch(addToFavorite(findBookById));
  };


//  console.log(items);
  console.log(bookId);
   console.log(booksList)
  console.log(findBookById);
  return (
    <section className="detail_wrapp">
      <button className="detail_wrapp-btn" onClick={handleAddToFavorite}>
        {bookmark ? <BsStarFill size="24" fill="gold" /> : <BsStar size="24" />}
      </button>
      <h3 className="detail_wrapp-title">{findBookById?.volumeInfo.title}</h3>
      <h4 className="detail_wrapp-subtitle">{findBookById?.volumeInfo.subtitle}</h4>
      <div className="desc_wrapp">
        <img src={findBookById?.volumeInfo.imageLinks.thumbnail} alt={findBookById?.volumeInfo.title} className="desc_wrapp-img" />
        <div className="desc_wrapp-description">
          {findBookById?.volumeInfo.description.replaceAll(/<[^>]+>/g, "")}
        </div>
      </div>
      <p>
        {findBookById?.searchInfo === undefined
          ? "no search Info"
          : parse (findBookById.searchInfo.textSnippet)}
      </p>
    </section>
    // <section className="detail_wrapp">
    //   <button className="detail_wrapp-btn" onClick={handleAddToFavorite}>
    //     {bookmark ? <BsStarFill size="24" fill="gold" /> : <BsStar size="24" />}
    //   </button>
    //   <h3 className="detail_wrapp-title">{findBookById.volumeInfo.title}</h3>
    //   <h4 className="detail_wrapp-subtitle">{findBookById.volumeInfo.subtitle}</h4>
    //   <div className="desc_wrapp">
    //     <img src={noImage} alt={findBookById.volumeInfo.title} className="desc_wrapp-img" />
    //     <div className="desc_wrapp-description">
    //       <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    //     </div>
    //   </div>
    //   {/* <p>
    //     {book?.searchInfo === undefined
    //       ? "no search Info"
    //       : book.searchInfo.textSnippet}
    //   </p> */}
    // </section>
  );
};

export default Details;
