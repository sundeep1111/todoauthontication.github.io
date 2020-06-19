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
  var username = document.getElementById('username');
  var password = document.getElementById('password');
  var usernotext = document.getElementById('usernotext')

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
 if(username.value == "" || password.value == ""){
    userefill.classList.remove('hidden');
            passfill.classList.remove('hidden');
 }
  var http = new XMLHttpRequest();
  http.open("GET", "https://5ee248c68b27f30016094891.mockapi.io/signupdetails", true);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  http.send();
  http.onreadystatechange = function () {
    if (http.readyState === 4) {
        let response = JSON.parse(this.responseText);
        //console.log(response)
        for(i=0; i<response.length; i++){
            if(response[i].username !== username.value || response[i].password !== password.value){
                alert('k')
                usernotext.classList.remove('hidden')
                break;
            }else{
                usernotext.classList.add('hidden')
                localStorage.setItem("loginStatus", true);
                window.location.assign("./index.html");
            }
        }
    }
  };
});