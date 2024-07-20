document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
            document.getElementById('pokemon-id').textContent = data.id;
            document.getElementById('weight').textContent = data.weight;
            document.getElementById('height').textContent = data.height;
            document.getElementById('hp').textContent = data.stats[0].base_stat;
            document.getElementById('attack').textContent = data.stats[1].base_stat;
            document.getElementById('defense').textContent = data.stats[2].base_stat;
            document.getElementById('special-attack').textContent = data.stats[3].base_stat;
            document.getElementById('special-defense').textContent = data.stats[4].base_stat;
            document.getElementById('speed').textContent = data.stats[5].base_stat;

            const typesContainer = document.getElementById('types');
            typesContainer.innerHTML = '';
            data.types.forEach(type => {
                const typeElement = document.createElement('span');
                typeElement.textContent = type.type.name.toUpperCase();
                typeElement.className = 'type-badge';
                typesContainer.appendChild(typeElement);
            });

            const sprite = document.getElementById('sprite');
            sprite.src = data.sprites.front_default;
            sprite.alt = `${data.name} sprite`;

            document.getElementById('pokemon-container').style.display = 'block';
        })
        .catch(error => {
            alert('Pokémon not found');
            document.getElementById('pokemon-container').style.display = 'none';
        });
});
