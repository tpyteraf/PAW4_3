"use strict";

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors(/*{ origin: "http://localhost:5500" }*/));

let categories = ["funnyJoke", "lameJoke"];

let funnyJoke = [
  {
    joke: "Dlaczego komputer poszedł do lekarza?",

    response: "Bo złapał wirusa!",
  },

  {
    joke: "Dlaczego komputer nie może być głodny?",

    response: "Bo ma pełen dysk!",
  },

  {
    joke: "Co mówi jeden bit do drugiego?",

    response: "„Trzymaj się, zaraz się przestawiamy!”",
  },
];

let lameJoke = [
  {
    joke: "Dlaczego programiści preferują noc?",

    response: "Bo w nocy jest mniej bugów do łapania!",
  },

  {
    joke: "Jak nazywa się bardzo szybki programista?",

    response: "Błyskawiczny kompilator!",
  },
];

const jokeCategories = {
  funnyJoke,
  lameJoke,
};

app.get("/jokebook/categories", (req, res) => {
  res.json({ categories });
});

app.get("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;
  const joke =
    jokeCategories[category][
      Math.floor(Math.random() * jokeCategories[category].length)
    ];

  if (!joke) {
    return res.status(404).json({ error: "No jokes for category " + category });
  }

  res.json(joke);
});

app.get("/jokebook/joke", (req, res) => {
  const allJokes = Object.values(jokeCategories).flat();
  const joke = allJokes[Math.floor(Math.random() * allJokes.length)];

  res.json(joke);
});

app.post("/jokebook/joke/:category", express.json(), (req, res) => {
  const category = req.params.category;
  const { joke, response } = req.body;

  if (!jokeCategories[category]) {
    return res.status(404).json({ error: "Category not found" });
  }

  jokeCategories[category].push({ joke, response });
  res.json({ message: "Joke added successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
