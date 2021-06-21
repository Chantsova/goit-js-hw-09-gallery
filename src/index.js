import './sass/main.scss';

import images from './js/images.js';

  const refs = {
  imagesBox: document.querySelector('.js-gallery'),
  originalImage: document.querySelector('.gallery__image'),
  lightboxEl: document.querySelector('.lightbox'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxCloseBtn: document.querySelector('.lightbox__button'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
}

const imagesCardsMarkup = makeImageCard(images);
refs.imagesBox.insertAdjacentHTML('beforeend', imagesCardsMarkup);

function makeImageCard(images) {
  return images
    .map(({preview, original, description}, index) => {
      return `
      <li class='gallery__item'>
        <a class='gallery__link' href='${original}'>
          <img class='gallery__image' src='${preview}' data-source='${original}' alt='${description}' index='${index}'/> 
        </a>
      </li>
      `;
    })
    .join('');
};

function onImageClick(event) {
  event.preventDefault();
  
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onNavigationKeysPress);
  const isImageBoxEl = event.target.classList.contains('gallery__image');

  if (!isImageBoxEl) {
    return;
  }
  
  refs.lightboxEl.classList.add('is-open');

  const source = event.target.dataset.source;
  const altName = event.target.getAttribute('alt');
  const index = event.target.getAttribute('index');
  refs.lightboxImg.setAttribute('src', source);
  refs.lightboxImg.setAttribute('alt', altName);
  refs.lightboxImg.setAttribute('index', index);
  }

function forCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onNavigationKeysPress);
  
  refs.lightboxEl.classList.remove('is-open');
  refs.lightboxImg.setAttribute('src', '');
  refs.lightboxImg.setAttribute('alt', '');
  refs.lightboxImg.setAttribute('index', '');
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;
  if (isEscKey) {
    forCloseModal();
  }
}

function onNavigationKeysPress(event) {
  let currentIndex = refs.lightboxImg.getAttribute('index');
  let numberCurrentIdx = parseInt(currentIndex);
  const imagesLength = images.length;
  

  if (event.code === 'ArrowRight') {
    let newIndexIncr = numberCurrentIdx + 1;
    
     if (newIndexIncr === imagesLength) {
       newIndexIncr = 0;
    }

    refs.lightboxImg.src = images[newIndexIncr].original;
    refs.lightboxImg.alt = images[newIndexIncr].description;
    refs.lightboxImg.setAttribute('index', newIndexIncr);
    }
    
  if (event.code === 'ArrowLeft') {
    let newIndexDecr = numberCurrentIdx - 1;

    if (newIndexDecr === -1) {
       newIndexDecr = imagesLength - 1;
    }

    refs.lightboxImg.src = images[newIndexDecr].original;
    refs.lightboxImg.alt = images[newIndexDecr].description;
    refs.lightboxImg.setAttribute('index', newIndexDecr);
  }
}

refs.imagesBox.addEventListener('click', onImageClick);
refs.lightboxCloseBtn.addEventListener('click', forCloseModal);
refs.lightboxOverlay.addEventListener('click', forCloseModal);