import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { requestBook } from "../../store/reducers/booksReducer";

type PropsType = {
  id: string;
  title: string;
  thumbnail?: string;
  subtitle?: string;
  searchInfo?: string;
};

const BookCard: FC<PropsType> = ({
  id,
  title,
  thumbnail,
  subtitle,
  searchInfo,
}) => {
  const dispatch = useDispatch();
  

  useEffect(() => {
   dispatch(requestBook(id));
  }, []);

  console.log('books',id)
  return (
    <div className="card_wrapp">
      <Link to={`/bookcard/${id}`} className="card_wrapp-link">
        <h3 className="card_wrapp-link-title">{title}</h3>
        <img
          src={thumbnail}
          alt={title}
          className="card_wrapp-link-thumbnail"
        />
        <div className="card_wrapp-link-bottom">
          <h4 className="card_wrapp-link-bottom-subtitle">
            {subtitle ? subtitle : "No subtitle"}
          </h4>
          <p className="card_wrapp-link-bottom-searchInfo">{`${searchInfo?.replaceAll(
            /<[^>]+>/g,
            ""
          )}`}</p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
