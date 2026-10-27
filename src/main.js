
import { PREP_TIME } from './js/menu.js';

const form = document.querySelector('.form');
const listOder = document.querySelector('.order-log');

let newLi;

const addOrderRow = (nameDrink) => {
    
    newLi = listOder.appendChild(document.createElement('li'));
    newLi.textContent = ` ⏳ ${nameDrink}  у роботі...`;
    newLi.classList.add('row-pending');

     return newLi;
}

const makePromise = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  }); 
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const formState = Object.fromEntries(formData.entries());
    const row = addOrderRow(formState.drink);
    for (const key in PREP_TIME) {
        if (formState.drink === key) {
            makePromise(PREP_TIME[key], formState.state)
                .then(() => {
                    row.classList.remove('row-pending');
                    row.classList.add('row-ok');
                    row.textContent = `✅ ${formState.drink} · готове · ${PREP_TIME[key]} ms.`
                })
                .catch(() => {
                    row.classList.remove('row-pending');
                    row.classList.add('row-err');
                    row.textContent = `❌ ${formState.drink} · скасовано · ${PREP_TIME[key]} ms.`
                })
                .finally(() => {
                    row.textContent += ' ' + new Date().toLocaleTimeString("uk-UA");
                });
        }
    }
});