const teste = "teste"

const dialog = document.querySelector("#modal");
const btnOpenDialog = document.querySelector("#btn-open-dialog");
const btnCloseDialog = document.querySelector("#btn-close-dialog");

btnOpenDialog.addEventListener("click", () => dialog.showModal());
btnCloseDialog.addEventListener("click", () => dialog.close());

const tabMenus = document.querySelectorAll(".tab-item");
tabMenus.forEach((tab, key) => {
  tab.addEventListener("click", () =>{
    tabMenus.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach((tabContent, contentKey) => {
      if (key === contentKey) {
        tabContent.classList.add("active");
      } else {
        tabContent.classList.remove("active")
      }
    });
  })
})

async function getRandomImages(numImages) {
  const imageUrls = [];

  for (let i = 0; i < numImages; i++) {
    try {
      const response = await fetch('https://source.unsplash.com/photos/random');
      
      if (response.ok) {
        imageUrls.push(response.url);
      } else {
        throw new Error("Erro ao obter imagem");
      }
    } catch (error) {
      console.error("Erro:", error);
      // Se houver um erro, ainda adicionamos um valor nulo para manter a contagem
      imageUrls.push(null);
    }
  }
  
  return imageUrls;
}

const numImages = document.querySelectorAll('.grid-item');

// getRandomImages(numImages.length).then((urls) => {
//   console.log("Imagens aleatórias geradas:", urls);
  
//   // Exemplo de como exibir as imagens no HTML
//   const container = document.getElementById(".grid");
//   container.childNodes.forEach((child, key) => {
//     createImageElement(child, urls[key]);
//   });
// })


function createImageElement(element, url) {
  if (url) {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Imagem aleatória";
    img.width = 200;
    img.height = 150;
    container.appendChild(img);
  }
}
