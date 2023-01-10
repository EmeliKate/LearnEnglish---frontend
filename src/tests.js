import "./styles/main.css";
import texts from "./articles.json";
console.log("tests.js running")

// use Google sheets
// create separate sheet for each test: testName, questions, answers, etc (see Test0)
// import users to each test tab from logins tab

async function getData() {
    const res = await fetch("https://eng-app-backend.glitch.me/api-tests/");
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.values;
}

async function getTestTopics(){
    let testsData = await getData();
    let testsTopics = testsData[2];
    let testsTopicsFiltered = testsTopics.filter(function (item, pos){
        return testsTopics.indexOf(item) == pos;
    })
    return testsTopicsFiltered;
}

async function addTests(){
    const testTopics = await getTestTopics();
    for (let i = 1; i < testTopics.length; i++){
        let testsList = document.getElementById("tests-list")
        let listElement = document.createElement("li");
        let detailsElement = document.createElement("details")
        let summaryEl = document.createElement("summary")
        summaryEl.id = "summary-el";
        summaryEl.innerText = testTopics[i];
        let li = testsList.appendChild(listElement);
        let detailsEl = li.appendChild(detailsElement);
        detailsEl.appendChild(summaryEl);

        let testsData = await getData();
        for (let j = 1; j < testsData[0].length; j++){
            if (i-1 == testsData[1][j]){
                let question = document.createElement("p");
                question.class = "question-text"
                question.innerText = testsData[0][j];
                detailsElement.appendChild(question);

                if (testsData[3][j] == 1){
                    let answers = testsData[4][j].split(" ");
                    for (let k = 0; k < answers.length; k++){
                        let answer = document.createElement("input");
                        answer.type = "radio";
                        answer.name = "questionOption"+j;
                        answer.className = "questionOption"+j;
                        answer.value = k;
                        let answerText = document.createElement("label");
                        answerText.innerText = answers[k];
                        question.appendChild(document.createElement("br"))
                        question.appendChild(answer);
                        question.appendChild(answerText)
                    }
                    question.appendChild(document.createElement("br"));
                    let submitBtn = document.createElement("button");
                    submitBtn.innerText = "Submit";
                    submitBtn.type = "submit";
                    question.appendChild(submitBtn);
                    submitBtn.addEventListener("click", SubmitOption)
                    console.log("console.log(testsData[5][j]): "+ testsData[5][j])
                    function SubmitOption(event){
                        event.preventDefault()

                        if(document.querySelector("input[name=questionOption"+j+"]:checked").value == testsData[5][j]){
                            console.log(document.querySelector("input[name=questionOption"+j+"]:checked").value)
                            console.log(testsData[5][j])
                            submitBtn.style.backgroundColor = "MediumAquaMarine";
                            submitBtn.innerText = "Correct";
                        }
                        else{
                            submitBtn.style.backgroundColor = "pink";
                            submitBtn.innerText = "Incorrect";
                        }
                    }
                } else {
                    let answer = document.createElement("input");
                    answer.id = "answer"
                    answer.type = "text";
                    answer.name = "question"+j+"test"+i;
                    question.appendChild(answer);

                    let submitBtn = document.createElement("button");
                    submitBtn.innerText = "Submit";
                    question.appendChild(submitBtn);
                    submitBtn.addEventListener("click", SubmitAnswer)
                    function SubmitAnswer(event){
                        event.preventDefault()
                        if (testsData[5][j] == answer.value){
                            submitBtn.style.backgroundColor = "MediumAquaMarine";
                            submitBtn.innerText = "Correct";
                        } else {
                            submitBtn.style.backgroundColor = "pink";
                            submitBtn.innerText = "Incorrect";
                        }
                        // add here function for post request like addData(cellId (check what it should be in post req), answer.value)
                    }
                }
            }
        }
    }
}

addTests();

// async function addData(username, password){
//
//     const res = await fetch("http://localhost/api-tests/", {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: username,
//             password:  password
//         })
//     })
//     if (!res.ok){
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await res.json()
//     console.log(data.values)
//     return data;
// }






