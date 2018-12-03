let recipes = [];

const saveRecipes = ()=>{
  localStorage.setItem('recipes', JSON.stringify(recipes))
};

const loadRecipes = () =>{
  const recipesJSON = localStorage.getItem('recipes');
  if (recipesJSON){
       recipes = JSON.parse(recipesJSON);
  }else{
    recipes = []
  }
};

const getRecipes = ()=> recipes;

const createRecipe = (title, text)=>{
  recipes.push({
    id: location.hash.substring(1),
    title: title,
    text:text,
    ingredients:[]
  })
  saveRecipes();
};

const deleteRecipe = (id)=>{
  recipes.forEach((item, index)=>{
    if (item.id===id){
      recipes.splice(index, 1)
    }
  })
    saveRecipes()
};

const addIngredient = (id, ingredient, recipesArray)=>{
  recipesArray.forEach(item=>{
    if (item.id===id){
      item.ingredients.push({
        ingredient: ingredient,
        inStock: false
      })
    }
  })
  saveRecipes()
};

const removeIngredient = (id, ingredient)=>{
  recipes.forEach(item=>{
    if (item.id===id){
      item.ingredients.forEach((item, index)=>{
        if (item.ingredient.toLowerCase()===ingredient.toLowerCase()){
          item.ingredients.splice(index, 1)
        }
          saveRecipes()
      })
    }
  })
};

const updateRecipe = (id, updates) => {
  const recipe = recipes.find((recipe)=>recipe.id===id)
  if (!recipe){
    return
  }
  if (typeof updates.title==='string'){
    //so obviously both title and body will be a string, right? thats obvious
    //but we are checking if updates has a title property that is a string, or a text property which is a string, this
    //allows us to only update the title, if updates has a title property, or only the text
    //if updates only has a text property, this way, we don't update both when we only change one
    recipe.title = updates.title
  }
  if (typeof updates.body ==='string'){
    recipe.text = updates.text
  }
  saveRecipes()
};



export {updateRecipe, removeIngredient, addIngredient, saveRecipes, loadRecipes, getRecipes, createRecipe, deleteRecipe}
