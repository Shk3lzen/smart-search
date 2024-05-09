const mysql = require('mysql2/promise');
const config = require('../config/config');

const connection = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
});

async function extractEntities(searchTerm) {
  console.log(searchTerm);
  
  function removeLowercaseFirst(str) {
    var words = str.split(/\s+/);
    var filteredWords = words.filter(function(word) {
      return !/[a-z]/.test(word[0]);
    });
    return filteredWords.join(' ');
  }

  const words = removeLowercaseFirst(searchTerm).split(' ');
  let entities = [];

  for (const word of words) {
    const [brands] = await queryDatabase('brands', word);
    const [cities] = await queryDatabase('cities', word);
    const [dishTypes] = await queryDatabase('dish_types', word);
    const [diets] = await queryDatabase('diets', word);

    let combinations = [];

    if (brands.length > 0) {
      combinations.push({ brand: brands[0] });
    }
    if (cities.length > 0) {
      combinations.push({ city: cities[0] });
    }
    if (dishTypes.length > 0) {
      combinations.push({ dishType: dishTypes[0] });
    }
    if (diets.length > 0) {
      combinations.push({ diet: diets[0] });
    }

    // Handle multiple entities of the same type
    if (diets.length > 1) {
      for (let i = 1; i < diets.length; i++) {
        combinations.push({ diet: diets[i] });
      }
    }
    if (cities.length > 1) {
      for (let i = 1; i < cities.length; i++) {
        combinations.push({ city: cities[i] });
      }
    }


    if (combinations.length > 0) {
      entities.push(combinations);
    }
  }

  // Generate all possible combinations
  const result = cartesianProduct(...entities);

  console.log(result);
  return result;
}

function cartesianProduct(...arrays) {
  
  // If there's only one array and it contains only one object, return that object
  if (arrays.length === 1 && arrays[0].length === 1 && typeof arrays[0][0] === 'object') {
    return arrays[0];
  }
  
  // Check if there are arrays with objects of the same type
  const sameTypeArray = arrays.find(arr => arr.length > 0 && Object.keys(arr[0])[0] === Object.keys(arr[0])[0]);
  
  // If there is no array with objects of the same type, return an empty array
  if (!sameTypeArray) {
    return [];
  }

  // Separate arrays with objects of the same type and arrays with different types of objects
  const differentTypeArrays = arrays.filter(arr => arr !== sameTypeArray);
  
  // If there are no arrays with different types of objects, return an empty array
  if (differentTypeArrays.length === 0) {
    return [];
  }

  const result = [];
  for (const obj of sameTypeArray) {
    for (const arr of differentTypeArrays) {
      for (const item of arr) {
        result.push(Object.assign({}, obj, item));
      }
    }
  }

  return result;
}


async function queryDatabase(table, word) {
  const [rows] = await connection.query(`SELECT * FROM ${table} WHERE name LIKE ?`, [`%${word}%`]);
  return [rows];
}
exports.extractEntities = extractEntities;


