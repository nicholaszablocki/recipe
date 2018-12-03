import {getRecipes, createRecipe} from './recipes.js'
import {getFilter} from './filters.js'

const generateRecipeDOM = (recipe) => {
  //this renders each individual recipe card
    const recipeEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Setup the recipe title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed Recipe'
    }
    textEl.classList.add('list-item__title')
    recipeEl.appendChild(textEl)

    // Setup the link
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeEl.classList.add('list-item')

    // Setup the status message
    statusEl.textContent = generateInStock(recipe.ingredients)
    statusEl.classList.add('list-item__subtitle')
    recipeEl.appendChild(statusEl)

    return recipeEl
};

const renderRecipes = () => {
  //this function is to render recipes to index.html
  //it renders ALL the recipe cards
    const recipesEl = document.querySelector('#recipes')
    const filters = getFilter();
    const recipes = getRecipes();
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeCard = generateRecipeDOM(recipe)
            recipesEl.appendChild(recipeCard)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No recipes to show'
        emptyMessage.classList.add('empty-message')
        recipesEl.appendChild(emptyMessage)
    }
};

const generateInStock = (ingredientsArray) => {
  const allInStock = ingredientsArray.every(item=>item.inStock===true);
  if (allInStock===true){
    return `You have all the necessary ingredients!`
  }
  const someInStock  = ingredientsArray.some(item=>item.inStock===true);
  if (someInStock===true){
    return `You have some of the necessary ingredients!`
  }
  if (allInStock===False && someInStock===False){
    return `You don't have any of the necessary ingredients!`
  }
};

const renderIngredients = (ingredientsArray, parentElement) => {
  const listArray = ingredientsArray.map(item=>{
    if (item.inStock===true){
    return(`<li><label class="checkbox"><input type="checkbox"id="${item.ingredient}"checked>${item.ingredient} <button id="ingRemove">'REMOVE'</button></label><li>`);
  }else if(item.inStock===false){
    return (`<li><label class="checkbox"><input type="checkbox"id="${item.ingredient}">${item.ingredient} <button id="ingRemove">'REMOVE'</button></label><li>`);
    }
  })
  const listHTML = listArray.join('')
  parentElement.innerHTML=listHTML
}

const initializeEditPage = (recipeId)=>{

  const titleElement = document.querySelector('#recipe-title')
  const bodyElement = document.querySelector('#recipe-body')
  const ingredientElement = document.querySelector('#ingredients')

  const recipes = getRecipes()
  const recipe = recipes.find((recipe) => recipe.id === recipeId)

  if (!recipe) {
      createRecipe(titleElement.value, bodyElement.value)
  }else{
    titleElement.value = recipe.title
    bodyElement.value = recipe.body
    renderIngredients(recipe.ingredients, ingredientElement)
  }

};


export {renderRecipes, initializeEditPage, renderIngredients}
