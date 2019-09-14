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

    try {
      // Search for results
      await state.search.getResults();

      // Render results on UI
      clearLoader();
      searchView.renderResults(state.search.results);
    } catch (err) {
      alert(err);
      clearLoader();
    }
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

const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    //   Prepare UI for changes

    // Create new Recipe object
    state.recipe = new Recipe(id);

    try {
      // Get Recipe Data
      await state.recipe.getRecipe();

      // Calcu;late services and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render Recipe
      console.log(state.recipe);
    } catch (error) {
      alert(error);
    }
  }
};

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
