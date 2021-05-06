import React, { FC } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteFav } from "../../store/reducers/booksReducer";

type PropsType = {
  id: string;
  etag:string;
  title: string;
  thumbnail?: string;
  subtitle?: string;
  searchInfo?: any;
};

const BookCard: FC<PropsType> = ({
  id,
  title,
  etag,
  thumbnail,
  subtitle,
  searchInfo,
}) => {

  const dispatch=useDispatch()

  return (
    <>
      {id === "non" ? (
        <div className="card_wrapp">
          <button className="btn-delete" onClick={()=>dispatch(deleteFav(etag))}>
            <MdDelete size="24" />
          </button>
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
            <p className="card_wrapp-link-bottom-searchInfo">
              {parse(searchInfo)}
            </p>
          </div>
        </div>
      ) : (
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
              <p className="card_wrapp-link-bottom-searchInfo">
                {parse(searchInfo)}
              </p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default BookCard;
