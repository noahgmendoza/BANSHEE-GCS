fetch("http://149.28.81.138:80/api/data")
    .then((data) =>{
        //console.log(data);  
        return data.json(); //convert to object
     }).then((objectData)=>{
         console.log(objectData['Sensor data']); //shows data stored in array[0] of "Sensor Data"
         let tableData="";
         Object.keys(objectData)
         objectData['Sensor data'].map((values)=>{
              tableData+=`<tr>
            <td>${values.mavpackettype}</td>
            <td>${values.type}</td>
            <td>${values.autopilot}</td>
            <td>${values.base_mode}</td>
            <td>${values.custom_mode}</td>
            <td>${values.system_status}</td>
            <td>${values.mavlink_version}</td>
            
            </tr>`
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