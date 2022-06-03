import {Timer} from "./Timer.js"
 
function browser() { 
  let browser;
  if (navigator.userAgent.includes("Opera") || navigator.userAgent.includes('OPR')) 
    browser = "Opera";
  else if (navigator.userAgent.includes("Edg"))
    browser = "Edge";
  else if(navigator.userAgent.includes("Chrome"))
    browser = "Chrome"
  else if(navigator.userAgent.includes("Safari"))
    browser = "Safari"
  else if(navigator.userAgent.includes("Firefox")) 
    browser = "Firefox";
  else if((navigator.userAgent.includes("MSIE")) || (!!document.documentMode == true ))
    browser = "Explorer";
    return browser;
}  

const button = document.querySelector('#button');
const timerBorder = document.querySelector("#timerBorder");
const durationInput = document.querySelector("#durationInput");

const timer = new Timer(browser(), durationInput, button, timerBorder);
