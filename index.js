const apiKey = '878ccfcbfee4ad2f3999a8c498741ab3';
const keyRespons = true;
let searchQuery = 'all';
const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&extras=url_h&format=json&nojsoncallback=1&per_page=9&text=${
  searchQuery || 'all'
}`;

const transforms = [
  `translate(100%, 100%) rotateZ(12deg)`,
  `translate(0px, 100%) rotateZ(9deg)`,
  `translate(-100%, 100%) rotateZ(6deg)`,
  `translate(100%, 0px) rotateZ(3deg)`,
  `translate(0px, 0px) rotateZ(0deg)`,
  `translate(-100%, 0px) rotateZ(-3deg)`,
  `translate(100%, -100%) rotateZ(-6deg)`,
  `translate(0, -100%) rotateZ(-9deg)`,
  `translate(-100%, -100%) rotateZ(-12deg)`,
];

const srcUrl = Array(9).fill('./assets/defolt.jpg');

const arrImgContainer = document.querySelectorAll('.image-container');
const arrImg = document.querySelectorAll('.image');
const input = document.querySelector('.input');
const clearIcon = document.querySelector('.clear-icon');

clearIcon.addEventListener('click', () => {
  if (input.value.trim() === '') return;
  input.value = '';
  setSrcUrl();
});

input.addEventListener('change', (e) => {
  searchQuery = e.target.value;
  console.log('searchQuery====', searchQuery);
  setSrcUrl();
});

const setSrcUrl = async () => {
  arrImgContainer.forEach((imageContainer, index) => {
    imageContainer.style.transform = transforms[index];
  });

  arrImg.forEach((image, index) => {
    image.src = srcUrl[index];
  });

  const respons = await getFetchdata();
  const newSrcUrl = respons.map((el) =>
    el.secret
      ? `https://farm${el.farm}.staticflickr.com/${el.server}/${el.id}_${el.secret}.jpg`
      : el
  );

  arrImg.forEach((image, index) => {
    image.src = newSrcUrl[index] || srcUrl[0];
  });

  arrImgContainer.forEach((imageContainer, index) => {
    setTimeout(() => {
      imageContainer.style.transform = 'none';
    }, 2000);
  });
};

setSrcUrl();

async function getFetchdata() {
  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&extras=url_h&format=json&nojsoncallback=1&per_page=9&text=${
    searchQuery || 'all'
  }`;
  try {
    const resflickr = await fetch(url);
    const dataflickr = await resflickr.json();
    return [...dataflickr.photos.photo];
  } catch (error) {
    console.warn(error);
    return [...srcUrl];
  }
}
