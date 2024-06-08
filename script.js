const quoteText = document.querySelector(".quote"), 
authorName = document.querySelector(".author .name"), 
quoteBtn = document.querySelector("button"),
soundBtn = document.querySelector(".sound"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter")
;

//random quote function
function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading quote...";
    /* console.log("Clicked") */ //checking if working ok
    fetch("http://api.quotable.io/random").then(res => res.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("Loading");
        quoteBtn.innerText = "Next Quote";
    });
}

//sound_button
soundBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("Loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        speechSynthesis.speak(utterance);

        //if not active then force it to active
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);

    }
});

//copy_button
copyBtn.addEventListener("click",()=> {
    navigator.clipboard.writeText(quoteText.innerText);

});

//twitter_button
twitterBtn.addEventListener("click",()=> {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");

});


quoteBtn.addEventListener("click", randomQuote);
