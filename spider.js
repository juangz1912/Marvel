// Configuración de la API de Marvel
const ts = "1";
const apiKey = "3aa1cc7ff7c263759e5d658926966e52";
const hash = "f79fa7ebb9d54616ed5ed6adb73d2bd6";
const spiderManId = 1009610; // ID de Spider-Man en la API de Marvel

// Construye la URL de la API
const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${spiderManId}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

// Elemento HTML donde se mostrará la información del personaje
const characterInfo = document.querySelector(".character-info");

// Realiza la solicitud a la API de Marvel
fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        // Obtiene los datos del personaje
        const character = data.data.results[0];
        
        // Obtiene la imagen de Spider-Man
        const characterImageURL = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        // Obtiene la imagen de Spider-Man y agrega la clase "spider-image"
        const characterImage = document.createElement("img");
        characterImage.src = characterImageURL;
        characterImage.alt = character.name;
        characterImage.classList.add("spider-image");
        
        // Obtiene la descripción de Spider-Man
        const characterDescription = document.createElement("div");
        characterDescription.textContent = character.description;

        
        // Agrega la imagen y la descripción al HTML
        characterInfo.appendChild(characterImage);
        characterInfo.appendChild(characterDescription);

        // Obtiene la cantidad de comics, series, stories y events
        const comicsCount = character.comics.available;
        const seriesCount = character.series.available;
        const storiesCount = character.stories.available;
        const eventsCount = character.events.available;

        // Obtiene los nombres de las 3 primeras series
        const series = character.series.items.slice(0, 3).map((seriesItem) => seriesItem.name);

        // Agrega información adicional al HTML
        const additionalInfo = document.createElement("div");
        additionalInfo.innerHTML = `
            <p>Cantidad de comics: ${comicsCount}</p>
            <p>Cantidad de series: ${seriesCount}</p>
            <p>Cantidad de stories: ${storiesCount}</p>
            <p>Cantidad de events: ${eventsCount}</p>
            <p>Últimas 3 series: ${series.join(", ")}</p>
        `;
        characterInfo.appendChild(additionalInfo);
    })
    .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
    });
