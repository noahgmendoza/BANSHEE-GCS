fetch("http://149.28.81.138:80/api/voltage")
    .then((bdata) =>{
        //console.log(data);  
        return bdata.json(); //convert to object
     }).then((objectbData)=>{
         console.log(objectbData['Voltage Data']); //shows data stored in array[0] of "Sensor Data"
         let btableData="";
         Object.keys(objectbData)
         objectbData['Voltage Data'].map((values)=>{
              btableData+=`<tr>
            <td>${values.BatteryID}</td>
            <td>${values['Total Voltage']}</td>
            <td>${values['Cell 1']}</td>
            <td>${values['Cell 2']}</td>
            <td>${values['Cell 3']}</td>
            <td>${values['Cell 4']}</td>

            </tr>`
         });
         document.getElementById("btable_body").
         innerHTML=btableData;
    })
    .catch((error)=>{
        console.log(error)
    })
