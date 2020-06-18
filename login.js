tsParticles.load("tsparticles", {
    fps_limit: 60,
    background: {
      color: "#333"
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        ondiv: {
          enable: true,
          elementId: "login",
          mode: "bubble",
          type: "rectangle"
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 5,
          speed: 3,
          color: ["#ff0000", "#ff7700"]
        }
      }
    },
    particles: {
      color: {
        value: ["#ffffff", "#1254ef"]
      },
      links: {
        color: "random",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1
      },
      move: {
        collisions: true,
        direction: "none",
        enable: true,
        out_mode: "bounce",
        random: false,
        speed: 5,
        straight: false
      },
      number: { density: { enable: true, value_area: 800 }, value: 80 },
      opacity: {
        animation: { enable: true, minimumValue: 0.1, speed: 1, sync: false },
        random: true,
        value: 0.5
      },
      shape: {
        type: "square"
      },
      size: {
        animation: {
          enable: true,
          minimumValue: 2,
          speed: 1,
          sync: false
        },
        random: {
          enable: true,
          minimumValue: 2
        },
        value: 4
      }
    },
    retina_detect: true
  });

  var loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log("Username -> ", e.target.username.value);
  console.log("Password -> ", e.target.password.value);

  var data = {
    username: e.target.username.value,
    password: e.target.password.value,
  };

  var http = new XMLHttpRequest();
  http.open("POST", "https://5ee248c68b27f30016094891.mockapi.io/user", true);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  http.send(JSON.stringify(data));
  http.onreadystatechange = function () {
    if (http.readyState === 4) {
      localStorage.setItem("loginStatus", true);
       window.location.assign("./index.html");
    }
  };
});