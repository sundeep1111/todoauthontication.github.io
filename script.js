var todoInput = document.getElementById('todo-input')
var todoList = document.getElementById('todo-list')
var btnToAdd = document.getElementById('btn-add-todo')
var todoInputWrapper = document.getElementById("todo-input-wrapper");
var btnLogin = document.getElementById("btn-login");
var loginStatus = window.localStorage.getItem('login');
var logout = document.getElementById('logout');

logout.addEventListener('click', function () {
  localStorage.setItem('loginStatus', false);
  location.assign('./index.html');
});
loginStatus = JSON.parse(loginStatus);
if (loginStatus == true) {
    todoInputWrapper.style.display = "none";
    btnLogin.style.display = "none";
} else {
    todoInputWrapper.style.display = "block";
    btnLogin.style.display = "block";
}
// function intilizertotdolist(){
//        var sortedList = localStorage.getItem('todoList')
//     if (sortedList === null){
//        localStorage.setItem('todoList', JSON.stringify([]))
//     }else{
//         sortedList = JSON.parse(sortedList)
//         for(i=0; i<sortedList.length; i++){
//             todoList.append(creatTodoCard(sortedList[i].id, sortedList[i].message));
//         }
//     }
// }
// intilizertotdolist()
function getTODOsFromBackend(){
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET','https://5ee248c68b27f30016094891.mockapi.io/todos', true)
    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4){
            var response = JSON.parse(xhttp.responseText);
            for (let i=0; i<response.length; i++){
                todoList.append(creatTodoCard(response[i].id, response[i].message))
            }
        }
    }
    if (
        localStorage.getItem("loginStatus") === null ||
        localStorage.getItem("loginStatus") === "false"
      ) {
        todoInputWrapper.style.display = "none";
      } else {
        btnLogin.style.display = "none";
      }
}

getTODOsFromBackend();




function creatTodoCard(id, entertext){

    var mainCard = document.createElement('div')
    mainCard.classList.add('todo-card', 'dyndropshadow')
    mainCard.id = id;
    
    var checkInfo = document.createElement("span");
    checkInfo.classList.add("Checkbox");
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.value = "value";
    checkbox.id = "myCheck";
    checkInfo.appendChild(checkbox);



    var vischeck = document.createElement('div');
    vischeck.classList.add("Checkbox-visible");
    checkInfo.appendChild(vischeck);



    mainCard.appendChild(checkInfo);

    var todomessagewrap = document.createElement('span')
    todomessagewrap.id = id;
    var todomessage = document.createElement('span')
    
    todomessage.classList.add('message');
    todomessage = document.createTextNode(entertext);
    todomessagewrap.appendChild(todomessage)

    checkInfo.addEventListener('click', function () {
        var stritxt = document.getElementById(todomessagewrap.id)
        //stritxt.classList.add('striptxt')
        if (stritxt.classList.contains('striptxt')) {
            stritxt.classList.remove('striptxt');
        } else {
            stritxt.classList.add('striptxt');
        }

    })
    var deleticon = document.createElement('i');
    deleticon.classList.add('fas','fa-trash-alt');
    if (
        localStorage.getItem("loginStatus") === null ||
        localStorage.getItem("loginStatus") === "false"
      ) {
        deleticon.classList.add("hidden-delete-icon");
      }
    deleticon.addEventListener('click', function(){
        var selectCard = document.getElementById(mainCard.id)
    // var sortedList = JSON.parse(localStorage.getItem('todoList'))
    // var removepost = -1
    //  for(i=0; i<sortedList.length; i++){
    //     if(sortedList.id === mainCard.id){
    //         removepost =i;
    //         break;
    //     }
    //   }
    //   sortedList.splice(removepost,1)
    // localStorage.setItem('todoList', JSON.stringify(sortedList))
    //selectCard.remove()
    let xhttp = new XMLHttpRequest();
          xhttp.open(
            'DELETE',
            'https://5ee248c68b27f30016094891.mockapi.io/todos/' + mainCard.id,
            'true'
          );
          console.log(mainCard.id)
          xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                selectCard.remove();
            }
          };
          xhttp.send();
    })

    mainCard.appendChild(todomessagewrap);
    mainCard.appendChild(deleticon);
    return mainCard
}
function handleTODOCreation() {
    if(todoInput.value !== '' && todoInput.value !== null){
    //     //todoList.appendChild();
    
        var todoObj ={
           // id:todoCard.id,
            message:todoInput.value,
        }
        todoInput.value =''
        //console.log(todoObj)
    //    var sortedList = JSON.parse(localStorage.getItem('todoList'))
    //     sortedList.push(todoObj);
    //     localStorage.setItem('todoList', JSON.stringify(sortedList))
    //     todoInput.value=''
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST','https://5ee248c68b27f30016094891.mockapi.io/todos',true)
    xhttp.setRequestHeader('Content-type', "application/json;charset=UTF-8")
    xhttp.send(JSON.stringify(todoObj))
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4){
            var response = JSON.parse(xhttp.responseText)
            var todoCard = creatTodoCard(response.id, response.message)
            todoList.appendChild(todoCard);
        }
    }
    }else{
      alert('please enter valid text')
    }
}
btnToAdd.addEventListener('click', function(){
    handleTODOCreation()
})
todoInput.addEventListener('keyup', function(e){
    if(e.which === 13){
        handleTODOCreation()
    }
})