import "./styles/main.css";
console.log("videos.js running")

import videos from './videos.json';
import texts from "./articles.json";

function GetVideoName(id){
    console.log(videos.videos[id].videoName)
    return videos.videos[id].videoName;
}

function GetVideoLink(id){
    console.log(videos.videos[id].link)
    return videos.videos[id].link;
}

function addVideoItem(id){
    let videosList = document.getElementById("videos-list")
    let listElement = document.createElement("li");
    let detailsElement = document.createElement("details")
    let summaryEl = document.createElement("summary")
    summaryEl.id = "summary-el";
    summaryEl.innerText = GetVideoName(id);
    let li = videosList.appendChild(listElement);
    let detailsEl = li.appendChild(detailsElement);
    detailsEl.appendChild(summaryEl);

    let videoLink = GetVideoLink(id);
    let pEl = document.createElement("p");
    pEl.id = "video-link";
    pEl.innerHTML = videoLink;
    detailsElement.appendChild(pEl);
}

function addAllVideos(){
    for (let i = 0; i < videos.videos.length; i++){
        addVideoItem(i);
    }
}

addAllVideos();