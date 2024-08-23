function openSpMenu() {
  const headerSp__top = document.querySelector("#js-headerSp__top");
  headerSp__top.classList.add("--hidden");

  const headerSp__bottom = document.querySelector("#js-headerSp__bottom");
  headerSp__bottom.classList.add("--hidden");

  const spMenuForeground = document.querySelector("#js-spMenuForeground");
  spMenuForeground.style.display = "flex";

  const spMenu = document.querySelector("#js-spMenu");
  spMenu.classList.remove("--hidden");
}

function closeSpMenu() {
  const headerSp__top = document.querySelector("#js-headerSp__top");
  headerSp__top.classList.remove("--hidden");

  const headerSp__bottom = document.querySelector("#js-headerSp__bottom");
  headerSp__bottom.classList.remove("--hidden");

  const spMenu = document.querySelector("#js-spMenu");
  spMenu.classList.add("--hidden");

  const spMenuForeground = document.querySelector("#js-spMenuForeground");
  setTimeout(() => {
    spMenuForeground.style.display = "none";
  }, 700);
}

const spMenuOpenButton = document.querySelector("#js-spMenuOpenButton");
spMenuOpenButton.addEventListener("click", openSpMenu);

const spMenuCloseButton = document.querySelector("#js-spMenuCloseButton");
spMenuCloseButton.addEventListener("click", closeSpMenu);
