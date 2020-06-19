var username = document.getElementById('username')
var password = document.getElementById('password')
var userext = document.getElementById('userext')
var userpass = document.getElementById('userpass')
var signup = document.getElementById('Signup')
var hidden = document.getElementsByClassName('hidden')
var userefill = document.getElementById('userefill')
var passfill = document.getElementById('passfill')
username.addEventListener('input', function(){
let xhttp = new XMLHttpRequest();
xhttp.open('GET','https://5ee248c68b27f30016094891.mockapi.io/signupdetails',true)
xhttp.send();
xhttp.onreadystatechange = function(){
    if(this.readyState === 4){
        let response = JSON.parse(this.responseText);
        for(i=0; i<response.length; i++){
            if(response[i].username == username.value){
               userext.classList.remove('hidden')
            break;
            }else{
                userext.classList.add('hidden')
            }
        }
    }
}
})

password.addEventListener('input', function(){
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET','https://5ee248c68b27f30016094891.mockapi.io/signupdetails',true)
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4){
            let response = JSON.parse(this.responseText);
            console.log(response)
            for(i=0; i<response.length; i++){
                if(response[i].password == password.value){
                    userpass.classList.remove('hidden')
                    break;
                }else{
                    userpass.classList.add('hidden')
                }
            }
        }
    }
    })

    signup.addEventListener('click', function(e){
        e.preventDefault();
        if(username.value == '' || password.value == '')
        {
            userefill.classList.remove('hidden');
            passfill.classList.remove('hidden');
            
        }else{
            var dataobj = {
                username : username.value,
                password : password.value,
            }

            var http = new XMLHttpRequest();
        http.open('POST','https://5ee248c68b27f30016094891.mockapi.io/signupdetails', true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.send(JSON.stringify(dataobj));
        http.onreadystatechange = function () {
      if (http.readyState === 4) {
        location.assign('./login.html');
        localStorage.setItem('loginStatus', true);
      }
    };
        }
        
        
    })
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