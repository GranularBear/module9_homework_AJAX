const resultNode = document.querySelector('.j-result');
const imgForm = document.querySelector('#get-img-form');

addEventListener('DOMContentLoaded', () => {
  let preSavedImgs = localStorage.getItem('images');
  resultNode.innerHTML = preSavedImgs;
})

  imgForm.addEventListener('submit', () => {
    event.preventDefault();
    const pageNum = document.querySelector('#page-number').value;
    const limitNum = document.querySelector('#limit-number').value;
    
    const initImgGeneration = new Promise((resolve, reject) => {
      if (
        +pageNum >= 1 &&
        +pageNum <= 10 &&
        +limitNum >= 1 &&
        +limitNum <= 10
      ) {
        resolve({
          pageNumber: pageNum,
          limitNumber: limitNum
        })
      } else if (
        (+pageNum >= 1 &&
        +pageNum <= 10) &&
        (+limitNum < 1 ||
        +limitNum > 10)
      ) {
        reject({
          message: 'Limit outside the range from 1 to 10'
        })
      } else if (
        (+limitNum >= 1 &&
        +limitNum <= 10) &&
        (+pageNum < 1 ||
        +pageNum > 10)
      ) {
        reject({
          message: 'Page number outside the range from 1 to 10'
        })
      } else if (
        (+pageNum < 1 ||
        +pageNum > 10) &&
        (+limitNum < 1 ||
        +limitNum > 10)
      ) {
        reject({
          message: 'Page number and limit outside the range from 1 to 10'
        })
      }
  });
    
  
  initImgGeneration
  .then((result) => {
    fetch(`https://picsum.photos/v2/list?page=${result.pageNumber}&limit=${result.limitNumber}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let images = '';
      json.forEach(item => {
        let imageBlock = `<div class="image-block">
        <img
          src="${item.download_url}"
          class="image"
        />
        <p>${item.author}</p>
      </div>
    `;
       images += imageBlock;
      }) 
     resultNode.innerHTML = images;
     localStorage.clear();
     localStorage.setItem('images', images);
    })
    .catch(() => {
      resultNode.innerHTML = '<span>Error while receiving image</span>'
    })
  })
  .catch((error) => {
    resultNode.innerHTML = `<span>${error.message}</span>`;
  })
  })

