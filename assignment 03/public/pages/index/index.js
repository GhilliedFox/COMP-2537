const shopping = document.querySelector("#shopping");

//get localstorage item and show it
function showEmail() {
  const id = localStorage.getItem("id");
  const welcomeRef = document.querySelector("#welcome");
  welcomeRef.textContent = "Welcome Back" + " " + id;
}
showEmail();
