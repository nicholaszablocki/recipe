import {createRecipe} from './recipes.js'
import {renderRecipes} from './views.js'
import uuidv4 from 'uuid/v4';

renderRecipes()

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

/*window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        renderRecipes()
    }
})*/
//the above event listener should be unnecessary as index.js only applies to
//index.html, the localStorage is never accessed here. we only modify localStorage
//with our call to createRecipe, but we immediately go to the edit page.
