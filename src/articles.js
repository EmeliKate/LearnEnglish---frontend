import "./styles/main.css";
console.log("articles.js running")

import texts from './articles.json';

function getTextNameById(id, levelId) {
    console.log(texts.levels[levelId].texts[id].textName)
    return texts.levels[levelId].texts[id].textName;
}

function getTextById(id, levelId) {
    let allText = []
    for (let i = 0; i < texts.levels[levelId].texts[id].paragraphs.length; i++){
        allText.push(texts.levels[levelId].texts[id].paragraphs[i].text)
    }
    console.log(allText)
    return allText;
}

function addTextItem(id, level, levelId){
    let textsList = document.getElementById(level)
    let listElement = document.createElement("li");
    let detailsElement = document.createElement("details")
    let summaryEl = document.createElement("summary")
    summaryEl.id = "summary-el";
    summaryEl.innerText = getTextNameById(id, levelId);
    let li = textsList.appendChild(listElement);
    let detailsEl = li.appendChild(detailsElement);
    detailsEl.appendChild(summaryEl);

    let allText = getTextById(id, levelId);
    for (let i = 0; i < allText.length; i++){
        let textItem = document.createElement("p");
        textItem.id = "article-text"
        textItem.innerText = allText[i];
        detailsElement.appendChild(textItem);
    }
}

function addAllTexts(level, levelId){
    for (let i = 0; i < texts.levels[levelId].texts.length; i++){
        addTextItem(i, level, levelId);
    }
}

function loadAllLevels(){
    addAllTexts("texts-list-elementary", 0);
    addAllTexts("texts-list-pre-intermediate", 1);
    addAllTexts("texts-list-intermediate", 2);
    addAllTexts("texts-list-upper", 3);
    addAllTexts("texts-list-advanced", 4);
}

loadAllLevels();





