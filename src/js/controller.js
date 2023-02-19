import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

//////////////////////////////////////////////////////////////////////////////////////////////////

import 'core-js/stable';
import 'regenerator-runtime/runtime';

//////////////////////////////////////////////////////////////////////////////////////////////////

// not JS but parcel
// allows for real-time updates to the application without needing to refresh the page
// if (module.hot) {
//   module.hot.accept();
// }

//////////////////////////////////////////////////////////////////////////////////////////////////

const controlRecipes = async function () {
  try {
    id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // 0.1) update the marked result
    // resultsView.render(model.getSearchResultsPage());
    resultsView.update(model.getSearchResultsPage());

    // 0.2) update the marked bookmark
    // debugger;
    bookmarksView.update(model.state.bookmarks);

    // 1) Loading recipe (is a async function)
    // one async function calling another async function
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe) //SAME
  } catch (err) {
    recipeView.renderError();
    //
    console.log(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render results
    // resultsView.render(model.state.search.results);
    // 3++) rander the page

    resultsView.render(model.getSearchResultsPage());

    // 4) render the pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////

const controlPagination = function (goToPage) {
  // 1) rander New page
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4) render New pagination
  // dont need to change cus page is updated by getSearchResultsPage()
  paginationView.render(model.state.search);
};

//////////////////////////////////////////////////////////////////////////////////////////////////

const controlServings = function (newServings) {
  // 2) update the recipe servings (in state)
  model.updateServings(newServings);
  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

//////////////////////////////////////////////////////////////////////////////////////////////////

const controlAddBookmark = function () {
  // 1) Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.deleteBookMark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

//////////////////////////////////////////////////////////////////////////////////////////////////

// ???
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

//////////////////////////////////////////////////////////////////////////////////////////////////

const controlAddRecipe = async function (newRecipe) {
  try {
    // render loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    // the one just created
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close foem window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(`🌟`, err);
    addRecipeView.renderError(err.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );

// events should be handle in the constroller and be listened for the view
// publisher subscriber pattern
const init = function () {
  bookmarksView.addHandlerRander(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

//////////////////////////////////////////////////////////////////////////////////////////////////
// model view controller architecture

//////////////////////////////////////////////////////////////////////////////////////////////////
// TODO

// Display number of pages between the pagination buttons;

// Ability to sort search results by duration or number of ingredients;

// Perform ingredient validation in view, before submitting the form;

// Improve recipe ingredient input: separate in multiple fields and allow more than 6 ingredients;

// Shopping list feature: button on recipe to add ingredients to a list;

// Weekly meal planning feature: assign recipes to the next 7 days and show

// on a weekly calendar;

// Get nutrition data on each ingredient from spoonacular API

// (https:// spoonacular.com/food-api) and calculate total calories of recipe.
