Smart Search Algorithm
This project implements a smart search algorithm that extracts entities from a search term and maps them to a relational database. The entities include cities, brands, dish types, and diets. The algorithm returns combinations of these entities based on the search term provided.

Overview
The algorithm parses the search term to identify entities such as cities, brands, dish types, and diets. It then queries the database to retrieve the corresponding entity information and constructs the entity combinations. The goal is to achieve optimal performance by making a single query to the database per function call.

Examples
For search="McDonald's", the function returns:
json
Copy code
[{ 
  "brand": {"id": 4, "name": "McDonald's"}
}]
For search="McDonald's in London", the function returns:
json
Copy code
[{ 
  "city": {"id": 1, "name": "London"},
  "brand": {"id": 4, "name": "McDonald's"}
}]
Handling Multiple Entities
For search="Veg Sushi", the function returns:
json
Copy code
[{ 
  "diet": {"id": 1, "name":"Vegan"},
  "dishType": {"id": 72, "name": "Sushi"}
},
{ 
  "diet": {"id": 2, "name":"Vegetarian"},
  "dishType": {"id": 72, "name": "Sushi"}
}]
For searchTerm="McDonald's in London or Manchester", the function returns:
json
Copy code
[{ 
  "city": {"id": 1, "name": "London"},
  "brand": {"id": 4, "name": "McDonald's"}
},
{ 
  "city": {"id": 6, "name": "Manchester"},
  "brand": {"id": 4, "name": "McDonald's"}
}]
Usage
Clone the repository:
bash
Copy code
git clone https://github.com/Shk3lzen/smart-search.git
Install dependencies:
bash
Copy code
cd smart-search
npm install
Configure the database connection settings in config.js.
Run the application:
bash
Copy code
npm start
Call the extract_entities(searchTerm) function with the desired search term to retrieve entity combinations.
Database Schema
The database schema includes tables for cities, brands, dish types, and diets. Each table contains columns for id and name.

Authors
Shkelzen Berisha
