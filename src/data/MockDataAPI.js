import { Alert, Text } from 'react-native';
import React, { Component } from 'react';
import { recipes, categories, ingredients } from './dataArrays';
import App from '../API/firebaseConfig';
import { connect } from 'react-redux';
import store from '../store';

let state=store.getState();
const subscribe = store.subscribe(() =>
  state=store.getState()
)

export function getCategoryById(categoryId) {
  let category;
  const categories=store.getState().categories;
  
  for (let key in categories){
    if (categories[key].id == categoryId) {
      category = categories[key]
    }
  }
  return category;
}

export function getIngredientName(ingredientID) {
  let name;
  ingredients.map(data => {
    if (data.ingredientId == ingredientID) {
      name = data.name;
    }
  });
  return name;
}

export function getIngredientUrl(ingredientID) {
  let url;
  ingredients.map(data => {
    if (data.ingredientId == ingredientID) {
      url = data.photo_url;
    }
  });
  return url;
}


export function getCategoryName (categoryId) {
  
  let name;
  const categories=state.categories;
  for (let key in categories){
    if (categories[key].id == categoryId) {
      name = categories[key].name;
    }
  }
  return name;
}

export function getProducts(categoryId) {
  const productsArray=[];
  const products=store.getState().products;
  
  for (let key in products){
    if (products[key].categoryId == categoryId) {
      productsArray.push(products[key]);
    }
  }
  return productsArray;
}

// modifica
export function getRecipesByIngredient(ingredientId) {
  const recipesArray = [];
  recipes.map(data => {
    data.ingredients.map(index => {
      if (index[0] == ingredientId) {
        recipesArray.push(data);
      }
    });
  });
  return recipesArray;
}

// const mapStateToProps=(state)=>({
//   products:state.products
// })
export function getNumberOfRecipes(categoryId) {
  const products=store.getState().products;
  let count = 0;
  for (let key in products){
    if (products[key].categoryId == categoryId) {
      count++;
    }
  }
  return count;
}

/*export function getAllIngredients(idArray) {
  const ingredientsArray = [];
  idArray.map(index => {
    ingredients.map(data => {
      if (data.ingredientId == index[0]) {
        ingredientsArray.push([data, index[1]]);
      }
    });
  });
  return ingredientsArray;
}*/

// functions for search
/*export function getRecipesByIngredientName(ingredientName) {
  
  const nameUpper = ingredientName.toUpperCase();
  const productsArray = [];
  ingredients.map(data => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      // data.name.yoUpperCase() == nameUpper
      const recipes = getRecipesByIngredient(data.ingredientId);
      const unique = [...new Set(recipes)];
      unique.map(item => {
        productsArray.push(item);
      });
    }
  });
  const uniqueArray = [...new Set(productsArray)];
  return uniqueArray;
}*/

export function getRecipesByCategoryName(categoryName) {
  const categories=store.getState().categories;
  const nameUpper = categoryName.toUpperCase();
  const productsArray = [];
  // categories.map(data => {
  //   if (data.name.toUpperCase().includes(nameUpper)) {
  //     const recipes = getRecipes(data.id); // return a vector of recipes
  //     recipes.map(item => {
  //       recipesArray.push(item);
  //     });
  //   }
  // });
  for (let key in categories){
    if (categories[key].name.toUpperCase().includes(nameUpper)){
      const products = getProducts(categories[key].id);// return a vector of products
      products.map(item => {
        productsArray.push(item);
      });
    }
  }
  return productsArray;
}

export function getRecipesByRecipeName(productsName) {

  const products=store.getState().products;
  const nameUpper = productsName.toUpperCase();
  const productsArray = [];
  for (let key in products){
    if (products[key].title.toUpperCase().includes(nameUpper)) {
      productsArray.push(products[key])
    }
  }

  // recipes.map(data => {
  //   if (data.title.toUpperCase().includes(nameUpper)) {
  //     recipesArray.push(data);
  //   }
  // });

  return productsArray;
}

export function convertObToArr(obj){
  let resultArr=[];
  Object.keys(obj).map(key=>{
    let curObj={};
    curObj[key]=obj[key]
    resultArr=[...resultArr,curObj]
  })
  return resultArr
}

export function setAutoId(endpoint){
  App.db.ref(`${endpoint}/`).on('child_added', function(snapshot) {
    App.db.ref(`${endpoint}/${snapshot.key}`).update({
      id:snapshot.key
    })
    return snapshot.key; // -KJ....
  })
}