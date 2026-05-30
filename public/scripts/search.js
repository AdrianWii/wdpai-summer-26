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
        // loadUsers(users);
      });
  }
});
