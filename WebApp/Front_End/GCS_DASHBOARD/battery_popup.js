const bdash_sec = document.querySelector("#dash_info")
const bpopup_sec = document.querySelector("#bpopup")
const overlay = document.getElementById('overlay')
batteryBTN = bdash_sec.querySelector("#battery_btn"),
batteryicon = bdash_sec.querySelector("#battery_icon"),
closeBtn = bpopup_sec.querySelectorAll("#close"),
 

batteryicon.addEventListener("click" , () =>{
    bpopup_sec.classList.add("show");
    overlay.classList.add("show");
});

overlay.addEventListener("click", ()=>{
    bpopup_sec.classList.remove("show");
    overlay.classList.remove("show");
})

closeBtn.forEach(cBtn => {
    cBtn.addEventListener("click" , ()=>{
        bpopup_sec.classList.remove("show");
        overlay.classList.remove("show");
    });
});


