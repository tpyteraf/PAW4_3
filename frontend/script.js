const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const answer = document.getElementById("answer");

btn1.addEventListener("click", () => {
  fetch("http://localhost:3000/jokebook/categories")
    .then(async (response) => {
      if (!response.ok) {
        const textError = await response.text();
        throw new Error(`Error: ${response.status} - ${textError}`);
      }

      const json = await response.json();
      const categories = json.categories;
      answer.textContent = `Available joke categories: ${categories.join(", ")}`;
    })
    .catch((error) => {
      answer.textContent =
        "An error occurred while fetching the joke categories.";
      console.error(error.message);
    });
});

btn2.addEventListener("click", () => {
  fetch("http://localhost:3000/jokebook/joke")
    .then(async (response) => {
      if (!response.ok) {
        const textError = await response.text();
        throw new Error(`Error: ${response.status} - ${textError}`);
      }

      const json = await response.json();
      answer.textContent = `${json.joke} - ${json.response}`;
    })
    .catch((error) => {
      answer.textContent = "An error occurred while fetching a random joke.";
      console.error(error.message);
    });
});
