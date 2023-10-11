// fetch('http://173.230.155.155:3000/api/data')
//     .then(res => {
//         return res.json();
//     })
//     .then(data => {
//         data.forEach(user => {
//             const markup = `<li>${user.base_mode}</li>`;

//             document.querySelector('ul').insertAdjacentHTML('beforeend',markup);
//         })
//     })
//     .catch(error => console.log(error));

const api_url = 'http://173.230.155.155:3000/api/data'
async function getISS() {
    const response  = await fetch(api_url);
    const data = await response.json();
    const {autopilot} = data;

    document.getElementById('auto').textContent = autopilot;
}

getISS();