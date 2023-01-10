import "./styles/main.css";
console.log("index.js running")

const loginName = document.getElementById("login-name")
const loginPass = document.getElementById("login-pass")
const loginBtn = document.getElementById("login-btn")
const signUpBtn = document.getElementById("signup-btn")
const signupName = document.getElementById("signup-name")
const signupPass = document.getElementById("signup-pass")
const loginSummary = document.getElementsByClassName("login")
const signupSummary = document.getElementsByClassName("signup")
const box0 = document.getElementsByClassName("box0.0")[0]
const box01 = document.getElementsByClassName("box0.1")[0]
const onLoginText = "Hello Learner"
const box1 = document.getElementsByClassName("box1")[0]

function removeLoginElements(){
    for (let i=0; i<loginSummary.length; i++){
        loginSummary[i].remove()
    }
    for (let j=0; j<signupSummary.length; j++){
        signupSummary[j].remove()
    }
}


function addLoggedInElements(welcomeText){
    const welcomeEl = document.createElement("div")
    const welcomeTextEl = document.createTextNode(welcomeText)
    box0.appendChild(welcomeEl)
    welcomeEl.setAttribute("id", "welcome-el")
    welcomeEl.appendChild(welcomeTextEl)
    const signOutBtn = document.createElement("button")
    signOutBtn.innerHTML = "Sign out"
    signOutBtn.addEventListener("click", window.reload)
    box01.appendChild(signOutBtn)
    signOutBtn.setAttribute("id", "sign-out-btn")
}

async function getData() {
    const res = await fetch("https://eng-app-backend.glitch.me/api-logins/");
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data.values)
    for (let i = 1; i < data.values.length; i++) {
        if (data.values[i][0] == loginName.value) {
            if (data.values[i][1] == loginPass.value) {
                console.log("password correct")
                removeLoginElements()
                addLoggedInElements(onLoginText)
            } else {
                console.log("password/login incorrect")
            }
        }
    }
}


function clickLoginButton(event){
    event.preventDefault()
    console.log("click")
    getData()
}

loginBtn.addEventListener("click", clickLoginButton)

async function addData(username, password){

    const res = await fetch("http://localhost/api-logins/", {
             method: "POST",
             headers: {
                 'Accept': 'application/json, text/plain, */*',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 name: username,
                 password:  password
             })
    })
    if (!res.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await res.json()
    console.log(data.values)
    return data;

}

function clickSignUpButton(event){
    event.preventDefault()
    console.log("click")
    addData(signupName.value, signupPass.value)
}

signUpBtn.addEventListener("click", clickSignUpButton)



