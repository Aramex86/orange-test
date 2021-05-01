import axios from "axios";

const Api_Key= 'AIzaSyBhr_PmeQMzMCoERPzs3cfNNzuJ89Ld_Ss'

export const booksApi = {
  getBooks() {
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=mama&maxResults=8&key=${Api_Key}`
      )
      .then((res) => {
        return res.data.items;
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
