console.log('Client side js is running!');
const local = false;

getBaseUrl = local ? 'http://localhost:3000/' : 'https://hamid-weather-app-node.herokuapp.com/' 

const renderSuccess = (data) => {
  const { address = '', location = {}, forecast } = data;
  const { country = '' } = location;
  const p = document.getElementById('searchSuccess');
  p.textContent = `${address}, ${country}. ${forecast}`;
}

const renderError = (message) => {
  const p = document.getElementById('searchError');
  p.textContent = message;
}

const getData = async (param) => {
  const url = `${getBaseUrl}weather?address=${param}`;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.forecast) {
        renderSuccess(data);
      } else if(data.error) {
        renderError(data.message);
      } else {
        renderError('Undefined Error');
      }
    }).catch((error) => {
      renderError('Error: ', error);
    });
  });
}

const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const param = document.getElementById('searchInput').value;
  // const res =
  getData(param);
})