const search = document.querySelector('input[placeholder="search project"]');
const usersContainer = document.querySelector(".users-list");

search.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const query = search.value.trim();

    console.log("Search query:", query);

    const data = { search: this.value };

    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (users) {
        usersContainer.innerHTML = "";
        loadUsers(users);
      });
  }
});

function loadUsers(users) {
  users.forEach(function (user) {
    const userElement = document.createElement("article");
    userElement.classList.add("user-row");

    const avatar = document.createElement("span");
    avatar.textContent = user.full_name.charAt(0).toUpperCase();
    avatar.classList.add("user-avatar");

    const userDiv = document.createElement("div");

    const username = document.createElement("h2");
    username.textContent = user.username;

    const fullname = document.createElement("p");
    fullname.textContent = user.full_name;

    userDiv.appendChild(username);
    userDiv.appendChild(fullname);

    userElement.appendChild(avatar);
    userElement.appendChild(userDiv);
    usersContainer.appendChild(userElement);
  });
}
