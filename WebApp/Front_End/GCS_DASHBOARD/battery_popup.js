const dash_sec = document.querySelector("#dash_info")
const popup_sec = document.querySelector("#popup")
batteryBTN = dash_sec.querySelector("#battery_btn"),
batteryicon = dash_sec.querySelector("#battery_icon"),
closeBtn = popup_sec.querySelectorAll("#close"),
 
batteryBTN.addEventListener("click" , () =>{
    popup_sec.classList.add("show");
});

batteryicon.addEventListener("click" , () =>{
    popup_sec.classList.add("show");
});

closeBtn.forEach(cBtn => {
    cBtn.addEventListener("click" , ()=>{
        popup_sec.classList.remove("show");
    });
});