// Module 9, Task 3


function useRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    
    xhr.onload = function () {
      if (xhr.status === 200) {
        let result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.send();
  }
  
  let resultNode = document.querySelector('.j-result');
  let btnNode = document.querySelector('.btn');
  let inputNode = document.querySelector('#n-input');
  
  function displayResult(apiData) {
    let images = '';
    
    apiData.forEach(item => {
      let imageBlock = `<div class="image-block">
          <img
            src="${item.download_url}"
            class="image"
          />
          <p>${item.author}</p>
        </div>
      `;
      images += imageBlock;     
    });
    
    resultNode.innerHTML = images;
  }
  
  btnNode.addEventListener('click', () => {
    if (inputNode.value < 1 || inputNode.value > 10) {
      resultNode.innerHTML = `<span>Число вне диапазона от 1 до 10</span>` 
    } else {
      useRequest(`https://picsum.photos/v2/list/?limit=${inputNode.value}`, displayResult);
    }
  })
  
  
  
  