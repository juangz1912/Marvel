const ts = "1";
const apiKey = "3aa1cc7ff7c263759e5d658926966e52";
const hash = "f79fa7ebb9d54616ed5ed6adb73d2bd6";

// ID de Spider-Man en la API de Marvel
const spiderManId = 1009610;

const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${spiderManId}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

const characterImage = document.querySelector(".character-image");
const characterDescription = document.querySelector(".character-description");

fetch(apiUrl)
    .then((response) => {
        if (response.status !== 200) {
            console.error("La solicitud no fue exitosa. Código de respuesta:", response.status);
            return;
        }
        return response.json();
    })
    .then((data) => {
        const character = data.data.results[0];
        const characterDescriptionText = character.description;
        const characterImageURL = `${character.thumbnail.path}.${character.thumbnail.extension}`;

        characterImage.src = characterImageURL;
        characterDescription.textContent = characterDescriptionText;
    })
    .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
    });
