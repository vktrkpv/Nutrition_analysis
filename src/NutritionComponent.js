import './NutritionComponent.css';

function NutritionComponent ( { data }) {

    if ( !data ) return null; 
    const nutrients = data.totalNutrients ? Object.entries(data.totalNutrients) : [];

    return(
        <div>
            <h2>Nutrition Facts</h2>
            <p><strong>Calories:</strong> {data.calories ? `${data.calories} kcal` : "N/A"}</p>            
            {nutrients.length > 0 ? (
                <>
                    <h3>Macronutrients:</h3>
                    <ul>
                        {nutrients.map(([key, nutrient]) => (
                            <li key={key}>
                                {nutrient.label}: {nutrient.quantity ? nutrient.quantity.toFixed(2) : "N/A"} {nutrient.unit || ""}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No nutrient data available.</p>
            )}

        </div>
    )
}

export default NutritionComponent;