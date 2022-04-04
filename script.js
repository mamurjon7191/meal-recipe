"use strict";
let mealName = [];
let mealImage = [];
let mealRecipe = [];

let popupTitle = document.querySelector(".popup_title");
let popup = document.querySelector(".popupContainer");
let popupHolat = document.querySelector(".popup_description");
let popupContent = document.querySelector(".popup_content");
let closePopup = document.querySelector(".close");

let a1;

let boxContainer = document.querySelector(".box-container");
let input = document.querySelector(".input");
let searchBtn = document.querySelector(".btnSearch");
let answerRedText = document.querySelector(".answer1");
let form = document.querySelector(".form");

input.focus();

let findMeals = function (a) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${a}`)
    .then((a) => {
      if (!a.ok) {
        throw new Error(`hello`);
      }
      return a.json();
    })
    .then((b) => {
      let f = 0;
      let arrNames = b.meals;
      arrNames.forEach((element) => {
        mealName.push(element.strMeal);
        mealImage.push(element.strMealThumb);
        mealRecipe.push(element.strInstructions);
        let html = `<div class="box" id="${f++}">
        <img src="${element.strMealThumb}" alt="" />
        <h3>${element.strMeal}</h3>
        <a href="#" class="btn">Get recipe</a>
               </div>`;
        boxContainer.insertAdjacentHTML("beforeend", html);
      });
      console.log(mealName);
      console.log(mealImage);
      console.log(mealRecipe);
    })
    .catch((error) => alert(`Invalid name entered!`));
};
let popUp = function () {
  boxContainer.addEventListener("click", function (a) {
    a.preventDefault();
    if (a.target.classList.contains("btn")) {
      let id = a.target.closest(".box").id;
      console.log(id);
      popupContent.textContent = mealRecipe[id];
      popupTitle.textContent = mealName[id];
      popup.style.opacity = "1";
    }
  });
};
let readInputValue = function (b) {
  form.addEventListener("submit", function (e) {
    boxContainer.innerHTML = "";
    e.preventDefault();
    let inputValue = input.value;
    findMeals(inputValue);
  });
};
readInputValue();
popUp();

document.querySelector(".fa-xmark").addEventListener("click", function () {
  popup.style.opacity = "0";
  console.log(2);
});
