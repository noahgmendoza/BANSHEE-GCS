fetch("http://149.28.81.138:80/api/data")
    .then((bdata) =>{
        //console.log(data);  
        return bdata.json(); //convert to object
     }).then((objectbData)=>{
         console.log(objectbData['Sensor data']); //shows data stored in array[0] of "Sensor Data"
         let btableData="";
         Object.keys(objectbData)
         objectbData['Sensor data'].map((values)=>{
              btableData+=`<tr>
            <td>${values.mavpackettype}</td>
            <td>${values.type}</td>
            
            </tr>`
         });
         document.getElementById("btable_body").
         innerHTML=btableData;
    })
    .catch((error)=>{
        console.log(error)
    })
