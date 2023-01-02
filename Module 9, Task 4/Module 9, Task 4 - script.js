// Module 9, Task 4

const imgForm = document.querySelector('.form');
const resultNode = document.querySelector(".j-result");


imgForm.addEventListener('submit', () => {
  event.preventDefault();
  const imgWidth = document.querySelector('#img-width').value;
  const imgHeight = document.querySelector('#img-height').value;
  const initImgGeneration = new Promise((resolve, reject) => {
    if (
      +imgWidth >= 100 &&
      +imgWidth <= 300 &&
      +imgHeight >= 100 &&
      +imgHeight <= 300
    ) {
      resolve({
        width: +imgWidth,
        height: +imgHeight,
      });
    } else {
      reject({
        message: "Одно из чисел вне диапазона от 100 до 300"
      });
    }
  });

  initImgGeneration
    .then((result) => {
    debugger;
      fetch(`https://picsum.photos/${result.width}/${result.height}`)
        .then((response) => {
          resultNode.innerHTML = `<img src='${response.url}'>`;
      })
        .catch(() => {
          resultNode.innerHTML = `<span>Error while receiving image</span>`
      })
    })
    .catch((error) => {
      resultNode.innerHTML = `<span>${error.message}</span>`;
    });
});
