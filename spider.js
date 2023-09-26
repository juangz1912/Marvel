const ts = "1";
const apiKey = "3aa1cc7ff7c263759e5d658926966e52";
const hash = "f79fa7ebb9d54616ed5ed6adb73d2bd6";

// ID de Spider-Man en la API de Marvel
const spiderManId = 1009610;

const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${spiderManId}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

const characterInfo = document.querySelector(".character-info");

fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        const character = data.data.results[0];
        
        // Obtiene la imagen de Spider-Man
        const characterImageURL = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        const characterImage = document.createElement("img");
        characterImage.src = characterImageURL;
        characterImage.alt = character.name;
        
        // Obtiene la descripción de Spider-Man
        const characterDescription = document.createElement("div");
        characterDescription.textContent = character.description;

        // Agrega información al HTML
        characterInfo.appendChild(characterImage);
        characterInfo.appendChild(characterDescription);

        // Cantidad de comics, series, stories y events
        const comicsCount = character.comics.available;
        const seriesCount = character.series.available;
        const storiesCount = character.stories.available;
        const eventsCount = character.events.available;

        // Nombres de las 3 primeras series
        const series = character.series.items.slice(0, 3).map((seriesItem) => seriesItem.name);

        // Agregar información adicional al HTML
        const additionalInfo = document.createElement("div");
        additionalInfo.innerHTML = `
            <p>Cantidad de comics: ${comicsCount}</p>
            <p>Cantidad de series: ${seriesCount}</p>
            <p>Cantidad de stories: ${storiesCount}</p>
            <p>Cantidad de events: ${eventsCount}</p>
            <p>Ultimas 3 series: ${series.join(", ")}</p>
        `;
        characterInfo.appendChild(additionalInfo);
    })
    .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
    });
