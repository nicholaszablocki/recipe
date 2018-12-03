import {initializeEditPage, renderIngredients} from './views.js'
import {updateRecipe, deleteRecipe, getRecipes, saveRecipes, removeIngredient, addIngredient} from './recipes.js'


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
  location.assign('/index.html')
})

titleElement.addEventListener('input', (e) => {
    const recipe = updateRecipe(recipeId, {title:e.target.value})
})

bodyElement.addEventListener('input', (e) => {
    const recipe = updateRecipe(recipeId, {text:e.target.value})
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
    let recipes = getRecipes()
    recipes.forEach(item=>{
      if (item.id===recipeId){
        if (target.checked===true){
          item.inStock===true
        }else if (target.checked===false){
          item.inStock===false
        }
      }
    })
    //REMEMBER, the if statement goes INSIDE the curly brackets
    //of an arrow function. you've fucked that up in other places too so be sure to fix it. just search each file for 'if'
  }
});

ingElement.addEventListener('click', (e)=>{
  const listElement = e.target.parentNode.id;
  if (listElement){
    const recipesArray = getRecipes();
    removeIngredient(recipeId, listElement);
    saveRecipes();
  }
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializeEditPage(recipeId)
    }
})

export {}
