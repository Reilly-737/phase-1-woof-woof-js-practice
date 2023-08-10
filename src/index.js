
document.addEventListener("DOMContentLoaded", () => {
  const dogBar = document.querySelector("#dog-bar");
  const filterButton = document.querySelector("#good-dog-filter");
  let filterOn = false;
  let pupsData = [];

  const makeSpan = (dog) => {
    const span = document.createElement("span");
    span.addEventListener("click", () => {
      renderDetails(dog);
    });
    span.textContent = dog.name;
    dogBar.append(span);
  };
  const renderDogBar = () => {
    console.log("Rendering dog bar..");
    dogBar.innerHTML = "";
    const dogsToShow = filterOn
      ? pupsData.filter((dog) => dog.isGoodDog)
      : pupsData;
    dogsToShow.forEach((dog) => {
      makeSpan(dog);
    });
  };
  const fetchPupsData = () => {
    fetch("http://localhost:3000/pups")
      .then((r) => r.json())
      .then((data) => {
        pupsData = data.pups;
        renderDogBar();
        renderDetails(pupsData[0]);
      });
  };
  const renderDetails = (dog) => {
    const image = document.querySelector("#dog-image");
    image.src = dog.image;
    const name = document.querySelector("#dog-name");
    name.textContent = dog.name;
    const isGoodDog = document.querySelector("#dog-isGoodDog");
    isGoodDog.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
    const toggleButton = document.querySelector("#good-dog-filter");
    toggleButton.textContent = dog.isGoodDog ? "Bad Dog" : "Good Dog";

    filterButton.addEventListener("click", () => {
      filterOn = !filterOn;
      filterButton.textContent = filterOn
        ? "Filter good dogs : ON "
        : "Filter good dogs: OFF";
      renderDogBar();

      fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isGoodDog: dog.isGoodDog }),
      })
        .then((r) => r.json())
        .then((updatedDog) => {});
    });
    const dogSummaryContainer = document.querySelector(
      "#dog-summary-container"
    );
    dogSummaryContainer.innerHTML = "";
  };

 
});