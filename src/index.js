let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchData() {
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toyData => renderToys(toyData))
}

function renderToys(toyData) {
  toyData.forEach(toy => {
    const div = document.createElement("div")
    div.classList.add("card")
    const h2 = document.createElement("h2")
    h2.textContent = toy.name
    const img = document.createElement("img")
    img.classList.add("toy-avatar")
    img.src = toy.image
    const p = document.createElement("p")
    p.textContent = `${toy.likes} likes`
    const button = document.createElement("button")
    button.classList.add("like-btn")
    button.id = toy.id
    button.textContent = "Like❤️"
    button.addEventListener("click", e => {
      editToy(e)
    })

    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
    document.querySelector("#toy-collection").append(div)
  })
}

function createNewToy() {
  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", e => {
    e.preventDefault()
    const toyName = e.target[0].value
    const toyImg = e.target[1].value
    postNewToy(toyName, toyImg)
  })
}

function postNewToy(toyName, toyImg) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": `${toyName}`,
      "image": `${toyImg}`,
      "likes": 0
    })
  })
}

function editToy(e) {
  const toyId = e.target.id
  let numberOfLikes = parseInt(e.target.parentNode.children[2].textContent)
  numberOfLikes++
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": numberOfLikes
    })
  })
}


fetchData()
createNewToy()