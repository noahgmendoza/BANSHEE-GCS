const fdash_sec = document.querySelector("#dash_info")
const fpopup_sec = document.querySelector("#fpopup")
flightBTN = fdash_sec.querySelector("#flight_btn"),
flighticon = fdash_sec.querySelector("#flight_icon"),
closeBtn = fpopup_sec.querySelectorAll("#close"),
 

flighticon.addEventListener("click" , () =>{
    fpopup_sec.classList.add("show");
    overlay.classList.add("show");
});

overlay.addEventListener("click", ()=>{
    fpopup_sec.classList.remove("show");
    overlay.classList.remove("show");
})

closeBtn.forEach(cBtn => {
    cBtn.addEventListener("click" , ()=>{
        fpopup_sec.classList.remove("show");
        overlay.classList.remove("show");
    });
});
