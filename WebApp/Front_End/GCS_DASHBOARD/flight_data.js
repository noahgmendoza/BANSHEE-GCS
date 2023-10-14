fetch("http://173.230.155.155:3000/api/data")
    .then((data) =>{
        //console.log(data);  
        return data.json(); //convert to object
     }).then((objectData)=>{
         console.log(objectData['Sensor data'][0]); //shows data stored in array[0] of "Sensor Data"
         let tableData="";
         objectData.map((values)=>{
            tableData+=`<tr>
            <td>${values./*whatever data we want*/}</td>
            <td>${values./*whatever data we want*/}</td>
            <td>${values./*whatever data we want*/}</td>
            </tr>`;
         });
         document.getElementById("table_body").
         innerHTML=tableData;
    })
    .catch((error)=>{
        console.log(error)
    })