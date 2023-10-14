fetch("http://173.230.155.155:3000/api/data")
    .then((data) =>{
        //console.log(data);  
        return data.json(); //convert to object
     }).then((objectData)=>{
         console.log(objectData['Sensor data'][0]); //shows data stored in array[0] of "Sensor Data"
         let tableData="";
         objectData.map((values)=>{
            // tableData+=`<tr>
            // <td>${values./*whatever data we want*/}</td>
            // <td>${values./*whatever data we want*/}</td>
            // <td>${values./*whatever data we want*/}</td>
            // </tr>`;
         });
         document.getElementById("table_body").
         innerHTML=tableData;
    })
    .catch((error)=>{
        console.log(error)
    })

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