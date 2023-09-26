const ts = "1";
const apiKey = "3aa1cc7ff7c263759e5d658926966e52";
const hash = "f79fa7ebb9d54616ed5ed6adb73d2bd6";

const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

const characterList = document.getElementById("character-list");

fetch(apiUrl)
    .then((response) => {
        if (response.status !== 200) {
            console.error("La solicitud no fue exitosa. Código de respuesta:", response.status);
            return;
        }
        return response.json();
    })
    .then((data) => {
        const characters = data.data.results;

        characters.forEach((character) => {
            const characterName = character.name;
            const characterThumbnail = character.thumbnail;
            const characterImage = `${characterThumbnail.path}.${characterThumbnail.extension}`;

            const characterElement = document.createElement("div");
            characterElement.innerHTML = `
                <h2>${characterName}</h2>
                <img src="${characterImage}" alt="${characterName}" width="200">
            `;

            characterList.appendChild(characterElement);
        });
    })
    .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
    });


