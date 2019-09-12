import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const url = "https://www.food2fork.com/api/search";
    const key = "985bebd5657ee11de7b5c41b83c06631";
    try {
      const res = await axios(`${url}?key=${key}&q=${this.query}`);
      this.results = res.data.recipes;
      //   console.log(this.results);
    } catch (error) {
      alert(error);
    }
  }
}
