const github = document.getElementById("github");
const cardsContainer = document.getElementById("cards-container");
const nextbtn = document.getElementById("next-btn");
const prevbtn = document.getElementById("prev-btn");
const pageindex = document.getElementById("page");
const pc = document.getElementById("pc");
const playStation = document.getElementById("playStation");
const xbox = document.getElementById("xbox");
const games = document.getElementById("games");
const loot = document.getElementById("loots");
const allPlatfrom = document.getElementById("all-platform");
const allType = document.getElementById("all-types");
const popularity = document.getElementById("popularity");
const date = document.getElementById("date");
const valueRarity = document.getElementById("value-rarity");
const dropDown = document.getElementById("dropdownMenuLink");

apiCall("https://gamerpower.p.rapidapi.com/api/giveaways?sort-by=popularity");

github.addEventListener("click", function () {
  location.href = "https://github.com/yumitdemir";
});
const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("data").innerHTML = request.responseText;
  }
};

function apiCall(apiLink) {
  const data = null;

  const request = new XMLHttpRequest();
  request.withCredentials = true;

  request.open("GET", apiLink);
  request.setRequestHeader(
    "X-RapidAPI-Key",
    "688cf1c493mshaa55f9b98d15679p12a269jsn4b52e5d98488"
  );
  request.setRequestHeader("X-RapidAPI-Host", "gamerpower.p.rapidapi.com");

  request.send(data);

  request.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let data = JSON.parse(this.responseText);

      if (Object.keys(data).length < 12) {
        nextbtn.classList.add("disabled");
        prevbtn.classList.add("disabled");
        diplayCards(0);
      } else {
        nextbtn.classList.remove("disabled");
        prevbtn.classList.remove("disabled");
        diplayCards(0);
      }
      function card(number, count) {
        const cards = document.createElement("div");
        cards.classList = `col-lg-3 col-md-6 col-sm-12 cardcounts"  id="${count}card`;
        cards.setAttribute("id", `${count}card`);
        cards.addEventListener("click", (params) => {
          cards.innerHTML = `<img src="img/card.jpg" alt="cards" id="click-card-monster"/>`;
          setInterval(() => {
            location.href = `${data[number].gamerpower_url}`;
          }, 500);
        });
        cards.innerHTML = ` <div class="card mb-3 shadow ">
        <img src="${data[number].thumbnail}" alt="" class="card-img-top" />
        <div class="card-body">
            <h5 class="card-title">${data[number].title}</h5>
            <p class="card-text">
            ${data[number].description.slice(0, 61)}...
            </p>
        </div>
    </div>`;

        cardsContainer.appendChild(cards);
      }
      function diplayCards(index) {
        let count = 0;
        cardsContainer.innerHTML = "";
        for (let i = index * 12; i < index * 12 + 12; i++) {
          card(i, `${count}card`);
        }
      }
      let index = 0;
      this.index = index;

      diplayCards(this.index);
      console.log(data);
      if (Object.keys(data).length < 12) {
        return;
      }

      nextbtn.addEventListener("click", (params) => {
        if (Object.keys(data).length < 12) {
          return;
        } else if (this.index < Math.floor(Object.keys(data).length / 12)) {
          this.index++;
        }

        prevbtn.classList.remove("disabled");
        try {
          diplayCards(this.index);
        } catch {
          return;
        }
      });
      prevbtn.addEventListener("click", (params) => {
        if (this.index > 0) {
          this.index--;
        }

        try {
          diplayCards(this.index);
        } catch {
          return;
        }
      });
    }
  });
}
//!!!!! add status ,platform, worth

let currentlink = (platform, type, sort) => {
  return `https://gamerpower.p.rapidapi.com/api/giveaways?${platform}&${type}&${sort}`;
};

let currentPlatform = "";
let currentType = "";
let currentSort = "";
function removePlatformSelection() {
  var lights = document.getElementsByClassName("select");
  for (let i = 0; i < lights.length; i++) {
    lights[i].classList.remove("select");
  }
}
allPlatfrom.addEventListener("click", (params) => {
  removePlatformSelection();
  allPlatfrom.classList.add("select");
  currentPlatform = ``;
  apiCall(currentlink(currentPlatform, currentType, currentSort));
});

steam.addEventListener("click", (params) => {
  removePlatformSelection();
  steam.classList.add("select");
  currentPlatform = ` platform=steam`;
  apiCall(
    "https://gamerpower.p.rapidapi.com/api/giveaways?platform=xbox-one&type=loot&sort-by=popularity"
  );
});

playStation.addEventListener("click", (params) => {
  removePlatformSelection();
  playStation.classList.add("select");
  currentPlatform = "platform=ps4";

  apiCall(currentlink(currentPlatform, currentType, currentSort));
});
xbox.addEventListener("click", (params) => {
  removePlatformSelection();
  xbox.classList.add("select");
  currentPlatform = "platform=xbox-one";

  apiCall(currentlink(currentPlatform, currentType, currentSort));
});
pc.addEventListener("click", (params) => {
  removePlatformSelection();
  pc.classList.add("select");
  currentPlatform = "platform=pc";

  apiCall(currentlink(currentPlatform, currentType, currentSort));
});
function removeTypeSelection() {
  var lights = document.getElementsByClassName("select-type");
  for (let i = 0; i < lights.length; i++) {
    lights[i].classList.remove("select-type");
  }
}

games.addEventListener("click", (params) => {
  removeTypeSelection();
  currentType = "type=game";
  games.classList.add("select-type");

  apiCall(currentlink(currentPlatform, currentType, currentSort));
});
loot.addEventListener("click", (params) => {
  removeTypeSelection();
  loot.classList.add("select-type");
  currentType = "type=loot";
  apiCall(currentlink(currentPlatform, currentType, currentSort));
});

allType.addEventListener("click", (params) => {
  removeTypeSelection();
  allType.classList.add("select-type");
  currentType = "";
  apiCall(currentlink(currentPlatform, currentType, currentSort));
});

popularity.addEventListener("click", (params) => {
  currentSort = "sort-by=popularity";
  dropDown.innerText = "Sort by: Popularity";
  console.log(currentlink(currentPlatform, currentType, currentSort));
  apiCall(currentlink(currentPlatform, currentType, currentSort));
});

date.addEventListener("click", (params) => {
  currentSort = "sort-by=date";
  dropDown.innerText = "Sort by: Release date";
  console.log(currentlink(currentPlatform, currentType, currentSort));
  apiCall(currentlink(currentPlatform, currentType, currentSort));
});
valueRarity.addEventListener("click", (params) => {
  currentSort = "sort-by=value";
  dropDown.innerText = "Sort by: Value & Rarity";
  console.log(currentlink(currentPlatform, currentType, currentSort));
  apiCall(currentlink(currentPlatform, currentType, currentSort));
});
