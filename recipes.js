import uuidv4 from 'uuid/v4';
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
        id: uuidv4(),
        ingredient: ingredient,
        inStock: false
      })
    }
  })
  saveRecipes()
};

const removeIngredient = (recipeID, ingredientID)=>{
  let splicePoint;
  recipes.forEach(item=>{
    if (item.id===recipeID){
      item.ingredients.forEach((item, index)=>{
        if (item.id===ingredientID){
          splicePoint=index;
        }
      })
      item.ingredients.splice(splicePoint, 1)
      saveRecipes();
    }
  })
};

const updateRecipeTitle = (id, updates) => {
  const recipe = recipes.find((recipe)=>recipe.id===id)
  if (!recipe){
    return
  }else{
    recipe.title=updates
  }
  saveRecipes()
};

const updateRecipeText = (id, updates) => {
  const recipe = recipes.find((recipe)=>recipe.id===id)
  if (!recipe){
    return
  }else{
    recipe.text=updates
  }
  saveRecipes()
};



export {updateRecipeTitle, updateRecipeText, removeIngredient, addIngredient, saveRecipes, loadRecipes, getRecipes, createRecipe, deleteRecipe}
