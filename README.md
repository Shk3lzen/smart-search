 Smart Search Algorithm
This project implements a smart search algorithm that extracts entities from a search term and maps them to a relational database. The entities include cities, brands, dish types, and diets. The algorithm returns combinations of these entities based on the search term provided.

Features
Given a search term, the algorithm extracts entities such as cities, brands, dish types, and diets.
It supports single and multiple entity combinations in the search term.
The algorithm queries the MySQL database for entity information, ensuring optimal performance by making a single query per function call.
Modular and clean code structure with separation of concerns.
Supports integration with MySQL.
Example Usage
Single Entity Extraction
javascript
Copy code
// For searchTerm="McDonald's"
// Output:
// [{
//   brand: {id: 4, name: "McDonald's"}
// }]
Multiple Entity Extraction
javascript
Copy code
// For searchTerm="McDonald's in London"
// Output:
// [{
//   city: {id: 1, name: "London"},
//   brand: {id: 4, name: "McDonald's"}
// }]
Handling Multiple Entity Types
javascript
Copy code
// For searchTerm="Veg sushi"
// Output:
// [{
//   diet: {id: 1, name:"Vegan"},
//   dishType: {id: 72, name: "Sushi"}
// },
// {
//   diet: {id: 2, name:"Vegetarian"},
//   dishType: {id: 72, name: "Sushi"}
// }]
Handling Multiple Instances of Same Entity Type
javascript
Copy code
// For searchTerm="McDonalds in London or Manchester"
// Output:
// [{
//   city: {id: 1, name: 'London'},
//   brand: {id: 4, name: "McDonald's"}
// },
// {
//   city: {id: 6, name: 'Manchester'},
//   brand: {id: 4, name: "McDonald's"}
// }]
How to Use
Clone the repository.
Configure the database connection settings in config.js.
Run the application.
Call the extract_entities(searchTerm) function with the desired search term to retrieve entity combinations.
Dependencies
Node.js
Express.js
MySQL
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/Shk3lzen/smart-search.git
Install dependencies:
bash
Copy code
cd smart-search
npm install
Configure database connection in config.js.
Run the application:
bash
Copy code
npm start
Once the application is running, you can call the extract_entities(searchTerm) function by sending a request to the specified endpoint. In this case, the endpoint is http://localhost:3000/api/search.
You can use tools like cURL, Postman, or simply make a request from your browser.
Database Schema
The database schema includes tables for cities, brands, dish types, and diets. Each table contains columns for id and name.

sql
Copy code
CREATE TABLE cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE dish_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE diets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);
Authors
Shkelzen Berisha
License
This project is licensed under the MIT License - see the LICENSE file for details.





