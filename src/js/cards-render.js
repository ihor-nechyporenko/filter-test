import refs from "./refs";
import CardItemTpl from '../templates/card-item.hbs';
import data from '../api/data.json';

const ASSET_TYPES = {
  template: 0,
  image: 1,
  video: 2,
  pdf: 3,
  gif: 4,
  article: 5,
};

refs.checkbox.forEach(check => check.addEventListener('click', onCheckboxClick));

function onCheckboxClick(e) {
  let checkedFilterData = [];
  let deletedFilterData = [];
  let deletedId = [];

  if (e.target.checked) {
    refs.gallery.innerHTML = '';
    // const typeFilteredData = data.filter(el => el['type'] === ASSET_TYPES[e.target.value]);

    refs.checkbox.forEach(check => {
      if (check.checked) {
        checkedFilterData = [...checkedFilterData, ...data.filter(el => el['type'] === ASSET_TYPES[check.value])];
        // console.log(checkedFilterData);
      };
    });
  }
  if (!e.target.checked) {
    deletedFilterData = data.filter(el => el['type'] === ASSET_TYPES[e.target.value]);
    const arrayId = deletedFilterData.forEach(el => deletedId.push(el.id))
    // console.log(deletedId)
    console.log(checkedFilterData);

    checkedFilterData.filter(el => el.id !== deletedId.includes(el.id));
  }

  // console.log(deletedId)
  // console.log(checkedFilterData);


  const totalCountFilteredData = checkedFilterData.sort((a, b) =>
    parseFloat(b['used-total-count']) - parseFloat(a['used-total-count']));

  appendCardsMarkup(totalCountFilteredData);
};


function appendCardsMarkup(dataset) {
  refs.gallery.insertAdjacentHTML('afterbegin', CardItemTpl(dataset.slice(0, 50)));
};

const defaultFilteredData = data.sort((a, b) =>
  parseFloat(b['used-total-count']) - parseFloat(a['used-total-count']));

appendCardsMarkup(defaultFilteredData);