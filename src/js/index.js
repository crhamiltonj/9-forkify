// Global app controller

// API key for food2fork.com
// 985bebd5657ee11de7b5c41b83c06631

// URL for food2fork
// https://www.food2fork.com/api/search
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

/* Global state of the app
    - Search object
    - Curent recipe object
    - Shopping list object
    - Liked recipes
*/
const state = {};

// Search Controller
const controlSearch = async () => {
  // get the query from the view
  const query = searchView.getInput();
  console.log(query);

  if (query) {
    // New search object and add to state
    state.search = new Search(query);

    //  Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // Search for results
    await state.search.getResults();

    // Render results on UI
    clearLoader();
    searchView.renderResults(state.search.results);
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.results, goToPage);
    console.log(goToPage);
  }
});

// Recipe Controller
const r = new Recipe(46956);
r.getRecipe();
console.log(r);
