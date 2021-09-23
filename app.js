const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  galleryContainer: document.querySelector('ul.js-gallery'),
  modalWindow: document.querySelector('.js-lightbox'),
  closeBtn: document.querySelector('.lightbox__button'),
  currentImage: document.querySelector('.lightbox__image'),
  overlay: document.querySelector('.lightbox__overlay'),
}

const galleryMarkup = createGalleryCard(galleryItems);

refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup)
refs.galleryContainer.addEventListener('click', openModalWindow)
refs.closeBtn.addEventListener('click', closeModalWindow)
refs.overlay.addEventListener('click', closeModalWindow)

function createGalleryCard(galleryItem) {
  return galleryItem.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
    <a class="gallery__link"
    ${original}>
    <img class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}" />
    </a>
    </li>`
  })
  .join('')
}


function openModalWindow (evt) {
  if (!evt.target.classList.contains('gallery__image')) return
  evt.preventDefault()
  refs.currentImage.attributes.src.nodeValue = ''
  refs.modalWindow.classList.add('is-open')
  reloadImage(evt.target.dataset.source, evt.target.alt)
  window.addEventListener('keydown', pressKey)
}

function closeModalWindow() {
  refs.modalWindow.classList.remove('is-open')
  window.removeEventListener('keydown', pressKey);
  }

function closeModalByKey(evt) {
    if (evt.code === 'Escape'){
      closeModalWindow()
  }
}

function reloadImage(src, alt) {
  refs.currentImage.src = src
  refs.currentImage.alt = alt
}



function pressKey(evt) {
  if (!refs.modalWindow.classList.contains('is-open')) return;
  if (evt.code === 'Escape'){
      closeModalWindow()
  }
  if (evt.code === 'ArrowLeft'){
      prevImage()
  }
  if (evt.code === 'ArrowRight'){
      nextImage()
  }
}

function nextImage() {
  let currentImageIndex = imageIndex(refs.currentImage.getAttribute('src'))
  if (currentImageIndex === galleryItems.length - 1) currentImageIndex = -1;
  reloadImage(
    galleryItems[currentImageIndex + 1].original,
    galleryItems[currentImageIndex + 1].description,
  )
 }

function prevImage() {
  let currentImageIndex = imageIndex(refs.currentImage.getAttribute('src'))
  if (currentImageIndex === 0) currentImageIndex = galleryItems.length
  reloadImage(
  galleryItems[currentImageIndex - 1].original,
  galleryItems[currentImageIndex - 1].description,
  )
}

function imageIndex(src) {
  return galleryItems.indexOf(galleryItems.find(element => element.original === src)) 
}