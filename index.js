import {createRecipe, loadRecipes, getRecipes, saveRecipes} from './recipes.js'
import {renderRecipes} from './views.js'
import {setFilter, getFilter} from './filters.js'
import uuidv4 from 'uuid/v4';

const allRecipes = loadRecipes();
renderRecipes(allRecipes)

document.querySelector('#create-recipe').addEventListener('click', (e) => {
    const id = uuidv4();
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
setFilter({
      searchText: e.target.value
    })
    renderRecipes()
})
