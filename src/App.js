import './App.css';
import { useState } from 'react';
import NutritionComponent from './NutritionComponent';

function App() {

  const MY_ID = "7057d845";
  const MY_KEY = "3262b1862eeacc55ec5ab5ebcda70f8e";

  const [input, setInput] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const fetchNutritionData = async (e) => {
    console.log("Yatutu")

    e.preventDefault(); 
  
    if (!input.trim()) { 
      alert("Please enter at least one ingredient.");
      return;
    }
  
    const ingredientsArray = input.split(",").map(item => item.trim()); 

    setIsLoading(true);
    
    try {
      const USER_ID = '7057d845';
      const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${MY_ID}&app_key=${MY_KEY}`, 
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "Edamam-Account-User": USER_ID
          },
          body: JSON.stringify({ ingr: ingredientsArray }) 
        }
      );
  
      const data = await response.json(); 
      setNutritionData(data);

  
      if (data.error) { 
        alert("Invalid ingredients. Please check your input.");
        return;
      }
  
      console.log(data); 
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Something went wrong. Please try again.");
    } finally{
      setIsLoading(false);
    }

  };
  

  const mySearch = (e) => {
    setInput(e.target.value);
  }
  
  return  (
    <div className='container'> 
    
      <h1>Nutrition Analysis</h1>

      <form action="">
        <input type='text' 
        placeholder='Write food name and weight for analysing' 
        onChange={mySearch} 
        value={input} />

        <button onClick={fetchNutritionData}>Analyze</button>
      </form>

      {isLoading && (
    <div className="loader-overlay">
        <div className="loader"></div>
    </div>
)}      
<NutritionComponent data={nutritionData} />


 
    </div>
  );
}

export default App;
