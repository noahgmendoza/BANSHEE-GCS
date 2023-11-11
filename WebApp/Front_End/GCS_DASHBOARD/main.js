const dashList = [
    {
        icon: "data_icon.png",
        title: "Flight Data",
        btnaction: "#dash_info",
        action: "flight_data.html", //make another html to route this and fetch the json file
        name: "flight_btn",
        iconid: "flight_icon",
        description:
            "Most recent Drone Flight Data collected.",
    },

    {
        icon: "battery_icon.png",
        title: "Battery Info",
        btnaction: "#dash_info",
        action: "battery_popup.html",
        name: "battery_btn",
        iconid: "battery_icon",
        description:
            "Saved battery voltages from BVM Battery Monitoring Set-up.",
    },

    {
        icon: "data_icon.png",
        title: "Live Footage",
        btnaction: "#live_cam_sec",
        action: "#live_cam_sec",
        name: "something1_btn",
        iconid: "something1_icon",
        description:
            "Whatever else you want.",
    },

    {
        icon: "data_icon.png",
        title: "Something",
        btnaction: "#dash_info",
        action: "#about_sec",
        name: "something2_btn",
        iconid: "something2_icon",
        description:
            "Whatever else you want.",
    },

    {
        icon: "data_icon.png",
        title: "Something",
        btnaction: "#dash_info",
        action: "#about_sec",
        name: "something3_btn",
        iconid: "something3_icon",
        description:
            "Whatever else you want.",
    },

    {
        icon: "data_icon.png",
        title: "Something",
        btnaction: "#dash_info",
        action: "#about_sec",
        name: "something4_btn",
        iconid: "something3_icon",
        description:
            "Whatever else you want.",
    },

];

const dashContent = document.querySelector("#dash_info .content");

const displayDash = () => {
    dashList.forEach(f => {
        const html = 
            `<div class="icon">
                <a href="${f.btnaction}">
                    <img src="${f.icon}" id="${f.iconid}" alt="" />
                </a>    
            </div>
            <h3><a href="${f.action}" id="${f.name}">${f.title}</a></h3>
            <p>
                ${f.description}
            </p>`;

        const dashCard = document.createElement("div");
        dashCard.classList.add("button_cards");
        dashCard.innerHTML = html;

        dashContent.appendChild(dashCard);
    });
};


displayDash();

// FOR POP-UP NOTIF
const ModalWindow = {
    init(){
        document.body.addEventListener("click", e => {
            if(e.target.classList.contains("modal__close")){
                this.closeModal(e.target);
            }
        });
    },

    getHtmlTemplate(modalOptions) {
        return `
            <div class="modal__overlay">
                <div class="modal__window">
                    <div class="modal__titlebar">
                        <span class="modal__title">${modalOptions.title}</span>
                        <button class="modal__close material-icons">close</button>
                    </div>
                    <div class="modal__content">${modalOptions.content}</div>
                </div>
            </div>
        `;
    },

    openModal(modalOptions = {}) {
        modalOptions = Object.assign({
            title: 'Modal Title',
            content: 'Modal Content'
        }, modalOptions);

        const modalTemplate = this.getHtmlTemplate(modalOptions);
        document.body.insertAdjacentHTML("afterbegin", modalTemplate);
    },

    closeModal(closeButton) {
        const modalOverlay = closeButton.parentElement.parentElement.parentElement;
        document.body.removeChild(modalOverlay);
    }
};


document.addEventListener("DOMContentLoaded", () => ModalWindow.init());

//ModalWindow.openModal({title: 'NOTIFICATION', content:'The UAV has landed.'}); //call this function when the UAV lands

