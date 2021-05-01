import axios from "axios";

const Api_Key= 'AIzaSyBhr_PmeQMzMCoERPzs3cfNNzuJ89Ld_Ss'

export const booksApi = {
  getBooks(searchVal:string) {
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchVal}&maxResults=8&key=${Api_Key}`
      )
      .then((res) => {
      return localStorage.setItem('data',JSON.stringify(res.data.items));
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
