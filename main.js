// using fetch async await
const getFetchData =async(url)=> {
  
  const datas = await fetch(url);
  return datas.json();
  
}

// get data users
(async()=> {
  
  const users = await getFetchData('https://jsonplaceholder.typicode.com/users');
  
  let cards = '';
  const images = await userImage();
  cardsArr = users.map((user, i) => {
    cards += card(user, images[i]);
    return {name: user.name, username: user.username, email: user.email, phone: user.phone}
  });
  document.querySelector('.cards-contain').innerHTML = cards;
  
})();
// get users image
async function userImage() {
  const images = await getFetchData('https://api.unsplash.com/search/photos?query=person&client_id=vr0oE5tnoJmz6vpc7BetYnnfQI8EYr74uZOOBHjnzCQ');
  return images.results.map(img => img.urls.thumb);
}

function card(user, img) {
  const phones = user.phone;
  return `
        <div class="card">
          <div class="head-card">
           <div class="user-img"><img src="${img}" alt=""></div>
           <div class="username-address">
             <h2 class="username">${user.username}</h2>
             <p class="address">${user.address.street}, ${user.address.city}</p>
           </div>
          </div>
          <h3 class="name">${user.name}</h3>
          <p class="email">${user.email}</p>
          <p class="phone">${user.phone}</p>
        </div>`
}


// FUNCTIONS SEARCH
let cardsArr = [];
((search)=> {
  search.addEventListener('input', ()=> {
    
    const value = search.value.toLowerCase();
     cardsArr.forEach((card, i) => {
       const isVisible = card.name.toLowerCase().includes(value) || card.username.toLowerCase().includes(value) || card.email.toLowerCase().includes(value) || card.phone.includes(value);
       
       document.querySelectorAll('.card')[i].classList.toggle('hide', !isVisible);
     });
    
  });
})(document.querySelector('.search-input'));