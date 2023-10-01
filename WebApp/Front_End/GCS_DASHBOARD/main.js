const dashList = [
    {
        icon: "data_icon.png",
        title: "Flight Data",
        action: "#about_sec",
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