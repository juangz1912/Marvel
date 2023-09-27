const marvel = {
    render: () => {
        // Configuración de la API de Marvel
        const ts = "1";
        const apiKey = "3aa1cc7ff7c263759e5d658926966e52";
        const hash = "f79fa7ebb9d54616ed5ed6adb73d2bd6";
        const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=${ts}&apikey=${apiKey}&hash=${hash}`;
      
        // Elemento HTML donde se mostrará la lista de personajes
        const container = document.querySelector(".character-list");
        let contentHTML = "";
      
        // Realiza la solicitud a la API de Marvel
        fetch(apiUrl)
          .then((res) => res.json())
          .then((json) => {
            // Obtiene la lista de personajes
            const characters = json.data.results;
      
            // Recorre la lista de personajes y crea las tarjetas
            for (const character of characters) {
              let characterName = character.name;
              let characterThumbnail = character.thumbnail;
              let characterImageURL = `${characterThumbnail.path}.${characterThumbnail.extension}`;
      
              // Filtra las imágenes no disponibles o en formato GIF
              if (characterImageURL.endsWith("image_not_available.jpg") || characterImageURL.endsWith(".gif")) {
                continue;
              }
      
              // Construye la tarjeta del personaje
              contentHTML += `
                <div class="character-card">
                    <h2>${characterName}</h2>
                    <img src="${characterImageURL}" alt="${characterName}" width="200">
                </div>
              `;
            }
      
            // Agrega las tarjetas al contenedor en el HTML
            container.innerHTML = contentHTML;
          })
          .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
          });
    },
};

// Llama a la función para renderizar la lista de personajes
marvel.render();
