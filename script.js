let foodData = {};  // Store dataset in an object

// Load CSV file into JavaScript
fetch('data/indian_food_large_dataset.csv')
    .then(response => response.text())
    .then(data => {
        let rows = data.split("\n").slice(1);  // Remove header
        rows.forEach(row => {
            let columns = row.split(",");
            let name = columns[0].trim().toLowerCase();
            foodData[name] = {
                calories: parseInt(columns[1]),
                protein: parseFloat(columns[2]),
                carbs: parseInt(columns[3]),
                fat: parseFloat(columns[4])
            };
        });
    });

// Load saved food entries from localStorage
function loadFoodEntries() {
    const savedEntries = JSON.parse(localStorage.getItem("foodEntries")) || [];
    savedEntries.forEach(entry => {
        let row = `<tr>
            <td>${entry.name}</td>
            <td>${entry.calories}</td>
            <td>${entry.protein}</td>
            <td>${entry.carbs}</td>
            <td>${entry.fat}</td>
        </tr>`;
        document.getElementById('foodTable').innerHTML += row;
    });
}

// Save food entries to localStorage
function saveFoodEntry(foodName, foodInfo) {
    const savedEntries = JSON.parse(localStorage.getItem("foodEntries")) || [];
    savedEntries.push({
        name: foodName,
        calories: foodInfo.calories,
        protein: foodInfo.protein,
        carbs: foodInfo.carbs,
        fat: foodInfo.fat
    });
    localStorage.setItem("foodEntries", JSON.stringify(savedEntries));
}

// Add food to the table and update totals
function addFood() {
    let foodName = document.getElementById('foodInput').value.toLowerCase();
    if (foodData[foodName]) {
        let foodInfo = foodData[foodName];

        let row = `<tr>
            <td>${foodName}</td>
            <td>${foodInfo.calories}</td>
            <td>${foodInfo.protein}</td>
            <td>${foodInfo.carbs}</td>
            <td>${foodInfo.fat}</td>
        </tr>`;

        document.getElementById('foodTable').innerHTML += row;

        let totalCalories = parseInt(localStorage.getItem("totalCalories") || 0);
        let totalProtein = parseFloat(localStorage.getItem("totalProtein") || 0);
        let totalCarbs = parseInt(localStorage.getItem("totalCarbs") || 0);
        let totalFat = parseFloat(localStorage.getItem("totalFat") || 0);

        totalCalories += foodInfo.calories;
        totalProtein += foodInfo.protein;
        totalCarbs += foodInfo.carbs;
        totalFat += foodInfo.fat;

        document.getElementById('totalCalories').textContent = totalCalories;

        localStorage.setItem("totalCalories", totalCalories);
        localStorage.setItem("totalProtein", totalProtein);
        localStorage.setItem("totalCarbs", totalCarbs);
        localStorage.setItem("totalFat", totalFat);

        // Save the food entry
        saveFoodEntry(foodName, foodInfo);
    } else {
        alert("Food not found in database.");
    }
}

// Load food entries when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadFoodEntries();
});