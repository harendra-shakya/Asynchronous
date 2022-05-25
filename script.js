'use strict';



const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className='') {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} M</p>
      <p class="country__row"><span>🗣️</span>${languages[0]}</p>
      <p class="country__row"><span>💰</span>${currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  // countriesContainer.style.opacity = 1;
}

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforebegin', msg)
  // countriesContainer.style.opacity = 1;
}






///////////////////////////////////////
/*
const getCountryAndNeighbour = function (country){
  const requests = new XMLHttpRequest();
  requests.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  requests.send();
*/
  
/*
  requests.addEventListener('load', function(){
      // console.log(this.responseText);

      const [data] = JSON.parse(this.responseText);
      console.log(data);

      renderCountry(data);

      //neighbour countryies
      const [neighbour] = data.borders;
      console.log(neighbour);

      //AJAX call
      const requests2 = new XMLHttpRequest();
      requests2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
      requests2.send();

      requests2.addEventListener('load', function(){
        // console.log(this.responseText);
  
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);
        renderCountry(data2, 'neighbour');
      })


  })
};

getCountryAndNeighbour('usa');
*/

// const requests = new XMLHttpRequest();
// requests.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// requests.send();


// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response) {
//     return response.json()
//   }).then(function(data){
//     console.log(data);
//     renderCountry(data[0])
//   })
// }



// const getCountryData = function (country) {
//   // country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response)
//       if(!response.ok) 
//         throw new Error(`Country not found (${response.status}).`)

//       return response.json()
//     })
//     .then(data => {
//       renderCountry(data[0])

//       // country 2
//       const [neighbour] = data[0].borders;
//       if(!neighbour) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//     })
//     .then(response => {
//       console.log(response)
//       if(!response.ok) 
//         throw new Error(`Country not found (${response.status}).`)
        
//       return response.json()
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       renderError(`Something went wrong. ${err.message} Try again!`)
      
//       console.error(err)
//     })
//     .finally(() => countriesContainer.style.opacity = 1)
      
    
// }
























// btn.addEventListener('click', function() {
//   getCountryData('usa');
// })

// getCountryData('sdsdsdsd')


const getJSON = function (url, errMsg= 'Something went wrong') {
  const country = fetch(url).then(response => {
    console.log(response)
    if(!response.ok) throw new Error(`${errMsg} (${response.status}).`)

    return response.json();
  });

  return country;
}


const getCountryData = function (country) {
  // country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
  .then(data => {
    renderCountry(data[0])
    console.log(data[0])

    // country 2
    const neighbours = data[0].borders;
    console.log('neighbour', neighbours)
    if(!neighbours) 
      throw new Error('No neighbour found');

    const neighbour = neighbours[0]

    return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found')
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong. ${err.message} Try again!`)
      
      console.error(err)
    })
    .finally(() => countriesContainer.style.opacity = 1)
      
    
}


/*
btn.addEventListener('click', function() {
  getCountryData('usa');
})

getCountryData('australia');
*/
///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀


const json = function (url, errMsg='Spmething went wrong') {
  const data = fetch(url)
  .then(response => {
    if (!response.ok) 
      throw new Error(`Geocoding problem ${response.status}`);
    return response.json()
  })

  return data;
};

const whereAmI = function (lat, lng) {
  json(`https://geocode.xyz/${lat},${lng}?geoit=json`, 'Could not found')
  .then(data => {
    console.log(`You are in ${data.city}, ${data.country}`)
    const country = data.country.toLowerCase()
    return getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Could not found')
  })
  .then(data => {
    console.log(data[0])
    renderCountry(data[0])
    // countriesContainer.style.opacity = 1;
})
  .catch(err => {
    renderError(` Something went wrong. Place not found`)

    console.error(err)
  })
  .finally(() => countriesContainer.style.opacity = 1)
};

whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
*/

// ---------Creating promises -----------
const lotteryPromis  = new Promise(function(resolve, reject){

  console.log('Paisa hi paisa hoga');

  setTimeout(() => {
    if (Math.random() >= 0.5 ){
      resolve('21 mai paisa double $$')
    } else {
      reject(new Error('Laxmi Chit Fund tha'))
    }
  }, 2000);
})

lotteryPromis.then(res => console.log(res)).catch(err => console.error(err))

console.log('paisa');

setTimeout(() => {
  console.log('Raju bhai is our saviour')
}, 1000)

// Promisifying set timeout
const wait = function (seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

wait(1)
  .then(() => {
    console.log('1 sec Passed')
    return wait(1)
  }).then(() => {
    console.log('2 sec Passed')
    return wait(1)
  }).then(() => {
    console.log('3 sec Passed')
    return wait(1)
  })

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem with abc')).catch(x => console.error(x));
