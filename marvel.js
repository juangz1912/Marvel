const marvel = {
    render: () => {
      const ts = "1";
      const apiKey = "3aa1cc7ff7c263759e5d658926966e52";
      const hash = "f79fa7ebb9d54616ed5ed6adb73d2bd6";
      const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=${ts}&apikey=${apiKey}&hash=${hash}`;
  
      const container = document.querySelector(".character-list");
      let contentHTML = "";
  
      fetch(apiUrl)
        .then((res) => res.json())
        .then((json) => {
          const characters = json.data.results;
  
          for (const character of characters) {
            let characterName = character.name;
            let characterThumbnail = character.thumbnail;
            let characterImageURL = `${characterThumbnail.path}.${characterThumbnail.extension}`;
  
            if (characterImageURL.endsWith("image_not_available.jpg") || characterImageURL.endsWith(".gif")) {
              continue;
            }
  
            contentHTML += `
              <div class="character-card">
                  <h2>${characterName}</h2>
                  <img src="${characterImageURL}" alt="${characterName}" width="200">
              </div>
            `;
          }
  
          container.innerHTML = contentHTML;
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
    },
  };
  
  marvel.render();
  