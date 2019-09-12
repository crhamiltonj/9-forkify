// Global app controller

// API key for food2fork.com
// 985bebd5657ee11de7b5c41b83c06631

// URL for food2fork
// https://www.food2fork.com/api/search
import Search from "./models/Search";

/* Global state of the app
    - Search object
    - Curent recipe object
    - Shopping list object
    - Liked recipes
*/
const state = {};

const controlSearch = async () => {
  // get the query from the view
  const query = "pizza";

  if (query) {
    // New search object and add to state
    state.search = new Search(query);

    //  Prepare UI for results

    // Search for results
    await state.search.getResults();

    // Render results on UI
    console.log(state.search.results);
  }
};

document.querySelector(".search").addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

const search = new Search("pizza");
console.log(search);
search.getResults();
