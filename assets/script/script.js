const task = document.querySelector(".speakBox")
const speech = new SpeechSynthesisUtterance();
const content = document.querySelector("#action")
let voice = [];

window.speechSynthesis.onvoiceschanged = () =>{
    voice = window.speechSynthesis.getVoices();
    speech.voice = voice[6];
}

function readOut(message) {
  
    speech.text = message;
    speech.volume = 20;
    window.speechSynthesis.speak(speech);
}

function wishMe() {
    const day = new Date();
    let hour = day.getHours();

    if(hour >= 0 && hour < 12) {
        readOut("Good Morning Sir");
    }  else if(hour > 12 && hour < 17) {
        readOut("Good AfterNoon Sir");
    } else if(hour >= 17 && hour < 24) {
        readOut("Good evening Sir");
    }
}
// window.addEventListener("click", () =>{
//   readOut("initializing friday") ;
//   wishMe();
// })// 4,10


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (e) =>{
    const currentIndex = e.resultIndex;
    const transcript = e.results[currentIndex][0].transcript;
     content.textContent = transcript;
    commands(transcript.toLowerCase())
}

task.addEventListener('click',()=>{
    content.textContent = "Listening..."
    recognition.start();
})

function commands(q) {
    if(q.includes('hello') || q.includes("hey")) {
        readOut("hello sir, How can i help you ?");
    }
    else if(q.includes('how are you') || q.includes('how r u')) {
        readOut("I am good, how about you ?")
    }
    else if(q.includes('assalam walekum')) {
        readOut("walaikum assalam");
    }
   else if(q.includes('open google')) {
        window.open("https://google.com", "_blank")
        readOut("Opening google...");
    }
    else if(q.includes('open youtube')) {
        window.open("https://youtube.com", "_blank")
        readOut("Opening youtube...");
    }
    else  if(q.includes('calculator')) {
        window.open("Calculator:///");
        readOut("opening calculator..");
    }
    else if(q.includes("what is") || q.includes('who is')) {
        window.open(`https:/www.google.com/search?q=${q.replace(" ", "+")}`, "_blank");
        const finalText = "this is what i found on internet regarding" + q;
        readOut(finalText)
    }
    else if(q.includes("wikipedia")) {
        window.open(`https://en.wikipedia.org/wiki/${q.replace("wikipedia", "")}`, "_blank");
        const finalText = "this is what i found on wikipedia regarding" + q;
        readOut(finalText)
    }
   else if (q.includes('time')) {
     const time = new Date().toLocaleString(undefined, {hour : "numeric", minute : "numeric"})
     const finalText = time;
     readOut(finalText);
   }
   else if (q.includes('date')) {
    const date = new Date().toLocaleString(undefined, {month : "short", day : "numeric"})
    const finalText = date;
    readOut(finalText);
  }
  else if(q.includes('github')) {
    window.open(`https://www.github.com/faizanmansuri07`, "_blank")
    const finalText = "Opening your github";
        readOut(finalText)
  }
  else if(q.includes('open facebook')) {
    window.open("https://facebook.com", "_blank")
    readOut("Opening facebook...");
}
  else{
    readOut("make more inteligent Message....")
  }
}