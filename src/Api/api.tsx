import axios from "axios";

export const booksApi = {
  getBooks() {
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=javascript&orderBy=newest&maxResults=4&key=${process.env.REACT_APP_BOOKS_API_KEY}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  getBook(id:string) {
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.REACT_APP_BOOKS_API_KEY}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  },
};
