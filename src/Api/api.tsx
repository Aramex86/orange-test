import axios from "axios";

export const booksApi = {
  getBooks() {
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=mama&maxResults=8&key=${process.env.REACT_APP_BOOKS_API_KEY}`
      )
      .then((res) => {
        return res.data.items;
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
