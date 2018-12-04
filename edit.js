import {initializeEditPage, renderIngredients} from './views.js'
import {updateRecipeTitle, updateRecipeText, deleteRecipe, getRecipes, saveRecipes, removeIngredient, addIngredient} from './recipes.js'


const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const removeElement = document.querySelector('#remove-recipe')
const ingElement = document.querySelector('#ingredients')
const ingButton = document.querySelector('#add-Ing-Button')
const ingInput = document.querySelector("#add-Ing-Input")
const returnButton = document.querySelector('#return')
const recipeId = location.hash.substring(1)

initializeEditPage(recipeId)

returnButton.addEventListener('click', (e)=>{
  saveRecipes();
  location.assign('/index.html')
})

titleElement.addEventListener('input', (e) => {
    const recipe = updateRecipeTitle(recipeId, e.target.value)
})

bodyElement.addEventListener('input', (e) => {
    const recipe = updateRecipeText(recipeId, e.target.value)
})

removeElement.addEventListener('click', (e) => {
    deleteRecipe(recipeId)
    location.assign('/index.html')
})

ingButton.addEventListener('click', (e) => {
  const value = ingInput.value;
  ingInput.value='';
  let recipes = getRecipes();
  let ingArray;
  recipes.forEach(item=>{
    if (item.id===recipeId){
      ingArray = item.ingredients
    }
  })
  addIngredient(recipeId, value, recipes);
  saveRecipes();
  renderIngredients(ingArray, ingElement);
})

ingElement.addEventListener('click', (e)=>{
  const target = e.target;
  const ingredientID = e.target.id;

  if (ingredientID){
    const recipes = getRecipes()
    recipes.forEach(item=>{
      if (item.id===recipeId){
        item.ingredients.forEach(item=>{
          if (target.checked===true){
            item.inStock=true
            saveRecipes();
          }else if (target.checked===false){
            item.inStock=false
            saveRecipes();
          }
        })
      }
    })
  }
});

ingElement.addEventListener('click', (e)=>{
  let ingArray;
  if (e.target.id==='ingRemove'){
    const listElement = e.target.parentNode.id;
    if (listElement){
      removeIngredient(recipeId, listElement);
      const recipes = getRecipes();
      recipes.forEach(item=>{
        if (item.id===recipeId){
          ingArray = item.ingredients
        }
      })
      renderIngredients(ingArray, ingElement);
    }
  }
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializeEditPage(recipeId)
    }
})

export {}
