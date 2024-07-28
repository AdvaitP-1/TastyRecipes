import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '4d1c161985fa40ca997a77c4d2aef7b3';
const BASE_URL = 'https://api.spoonacular.com/recipes';

function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    diet: '',
    intolerances: '',
    cuisine: '',
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [servings, setServings] = useState(0);
  const [priceBreakdown, setPriceBreakdown] = useState(null);

  useEffect(() => {
    if (selectedRecipe) {
      setServings(selectedRecipe.servings);
    }
  }, [selectedRecipe]);

  const adjustServings = (newServings) => {
    setServings(newServings);
  };

  const calculateAdjustedAmount = (amount, originalServings) => {
    return ((amount * servings) / originalServings).toFixed(2);
  };

  const calculateAdjustedPrice = (price, originalServings) => {
    return ((price * servings) / originalServings).toFixed(2);
  };

  const searchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/complexSearch`, {
        params: {
          apiKey: '4d1c161985fa40ca997a77c4d2aef7b3',
          query: query,
          ...filters,
          addRecipeInformation: true,
        },
      });
      setRecipes(response.data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  const getRecipeDetails = async (id) => {
    setLoading(true);
    try {
      const [recipeResponse, priceResponse] = await Promise.all([
        axios.get(`${BASE_URL}/${id}/information`, {
          params: {
            apiKey: '4d1c161985fa40ca997a77c4d2aef7b3',
            includeNutrition: true,
          },
        }),
        axios.get(`${BASE_URL}/${id}/priceBreakdownWidget.json`, {
          params: {
            apiKey: '4d1c161985fa40ca997a77c4d2aef7b3',
          },
        }),
      ]);
      setSelectedRecipe(recipeResponse.data);
      setPriceBreakdown(priceResponse.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
    setLoading(false);
  };

  const renderNutritionInfo = () => {
    if (!selectedRecipe || !selectedRecipe.nutrition) return null;
    const { calories, carbs, fat, protein } = selectedRecipe.nutrition;
    return (
      <div>
        <h4>Nutrition Information</h4>
        <p>Calories: {calories}</p>
        <p>Carbs: {carbs}</p>
        <p>Fat: {fat}</p>
        <p>Protein: {protein}</p>
      </div>
    );
  };

  const renderInstructions = () => {
    if (!selectedRecipe || !selectedRecipe.instructions) return null;
    return (
      <div>
        <h4>Instructions</h4>
        <ol>
          {selectedRecipe.analyzedInstructions[0].steps.map((step, index) => (
            <li key={index}>{step.step}</li>
          ))}
        </ol>
      </div>
    );
  };

  const renderIngredients = () => {
    if (!selectedRecipe || !selectedRecipe.extendedIngredients) return null;
    return (
      <div>
        <h4>Ingredients</h4>
        <ul>
          {selectedRecipe.extendedIngredients.map((ingredient, index) => (
            <li key={index}>
              {calculateAdjustedAmount(ingredient.amount, selectedRecipe.servings)} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderCookingInfo = () => {
    if (!selectedRecipe) return null;
    return (
      <div>
        <h4>Cooking Information</h4>
        <p>Preparation Time: {selectedRecipe.readyInMinutes} minutes</p>
        <p>
          Servings: 
          <input 
            type="number" 
            value={servings} 
            onChange={(e) => adjustServings(parseInt(e.target.value))} 
            min="1"
          />
        </p>
      </div>
    );
  };

  const renderPriceBreakdown = () => {
    if (!priceBreakdown || !selectedRecipe) return null;
    const originalServings = selectedRecipe.servings;
    const totalCost = calculateAdjustedPrice(priceBreakdown.totalCost / 100, originalServings);
    const costPerServing = (totalCost / servings).toFixed(2);
    
    return (
      <div>
        <h4>Price Breakdown (Adjusted for {servings} servings)</h4>
        <p>Total Cost: ${totalCost}</p>
        <p>Cost per Serving: ${costPerServing}</p>
        <ul>
          {priceBreakdown.ingredients.map((ingredient, index) => {
            const adjustedPrice = calculateAdjustedPrice(ingredient.price / 100, originalServings);
            return (
              <li key={index}>
                {ingredient.name}: ${adjustedPrice}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes..."
      />
      <button onClick={searchRecipes}>Search</button>
      
      {/* Add filter inputs here */}
      
      {loading && <p>Loading...</p>}

      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} style={{width: '200px'}} />
            <button onClick={() => getRecipeDetails(recipe.id)}>
              View Recipe Details
            </button>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div>
          <h3>{selectedRecipe.title}</h3>
          <img src={selectedRecipe.image} alt={selectedRecipe.title} style={{width: '400px'}} />
          {renderCookingInfo()}
          {renderIngredients()}
          {renderNutritionInfo()}
          {renderInstructions()}
          {renderPriceBreakdown()}
        </div>
      )}
    </div>
  );
}

export default RecipeSearch;