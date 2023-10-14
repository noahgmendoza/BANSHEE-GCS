const dashList = [
    {
        icon: "data_icon.png",
        title: "Flight Data",
        action: "flight_data.html", //make another html to route this and fetch the json file
        name: "flight_btn",
        description:
            "Most recent Drone Flight Data collected.",
    },  

    {
        icon: "battery_icon.png",
        title: "Battery Info",
        action: "#about_sec",
        name: "battery_btn",
        description:
            "Saved battery voltages from BVM Battery Monitoring Set-up.",
    },

    {
        icon: "data_icon.png",
        title: "Something",
        action: "#about_sec",
        name: "something1_btn",
        description:
            "Whatever else you want.",
    },

    {
        icon: "data_icon.png",
        title: "Something",
        action: "#about_sec",
        name: "something2_btn",
        description:
            "Whatever else you want.",
    },

    {
        icon: "data_icon.png",
        title: "Something",
        action: "#about_sec",
        name: "something3_btn",
        description:
            "Whatever else you want.",
    },

    {
        icon: "data_icon.png",
        title: "Something",
        action: "#about_sec",
        name: "something4_btn",
        description:
            "Whatever else you want.",
    },

];

const dashContent = document.querySelector("#dash_info .content");

const displayDash = () => {
    dashList.forEach(f => {
        const html = `<div class="icon">
                <img src="${f.icon}" alt="" />
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


//FOR POP-UP NOTIF
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

ModalWindow.openModal({title: 'NOTIFICATION', content:'The UAV has landed.'}); //call this function when the UAV lands