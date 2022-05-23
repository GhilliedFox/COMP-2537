(() => {
  const inputLoginRef = document.querySelector("#login");

  const emailRef = document.querySelector("input[name='email']");
  const passwordRef = document.querySelector("input[name='password']");

  inputLoginRef.onclick = (e) => {
    e.preventDefault();

    const email = emailRef.value;
    const password = passwordRef.value;
    var loginTime = new Date(Date.now());
    var formatted =
      loginTime.getHours() +
      ":" +
      loginTime.getMinutes() +
      ":" +
      loginTime.getSeconds();

    fetch("/api/v1/user/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, loginTime }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("id", email);
          return (window.location.href = "/");
        } else {
          const noticeRef = document.querySelector("form > .notice");
          noticeRef.classList.add("notice--alert");
          noticeRef.innerHTML = "";

          const alertText = document.createElement("p");
          alertText.textContent = data.msg;
          noticeRef.append(alertText);
        }
      });
  };
})();
