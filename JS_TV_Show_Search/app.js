const searchResultMsg = document.querySelector('#searchResult');
const form = document.querySelector('#searchForm');
const imgContainer = document.querySelector('#imgList');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  removeSearchItems();
  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm } };
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
  searchResultMsg.innerHTML = `Here are your search results for <span>"${searchTerm}"</span>:`;
  addImages(res.data);
  form.elements.query.value = '';
})

const removeSearchItems = () => {
  while (imgContainer.firstChild) {
    imgContainer.removeChild(imgContainer.firstChild)
  }
}


const addImages = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      const showInfo = document.createElement('div');
      showInfo.classList.add('m-2', 'card', 'has-background-black-bis')
      showInfo.innerHTML = `
  <div class="card-image">
    <figure class="image">
      <img src=${result.show.image.medium} alt="Placeholder image">
    </figure>
  </div>
  <footer class="card-footer">
    <a href=${result.show.url} target="_blank" class="card-footer-item">
        <figure class="is-flex is-align-items-center is-justify-content-center image ">
          <img src="https://static.tvmaze.com/images/tvm-header-logo.png" alt="Placeholder image">
        </figure>
    </a>
  </footer>
            `
      imgContainer.append(showInfo)
    }
  }
}