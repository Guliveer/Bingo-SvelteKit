<script>
    import { goto } from '$app/navigation';
    import { encodeGameConfig } from '$lib/utils';

    let newGame = { size: 3, phrases: '' }; // Każde hasło w nowej linii
    let savedGames = [];
    let errorMessage = '';

    function createGame() {
        const phrases = newGame.phrases.split('\n').filter((p) => p.trim() !== '');
        const requiredPhrases = newGame.size * newGame.size;

        if (phrases.length < requiredPhrases) {
            errorMessage = `Potrzeba co najmniej ${requiredPhrases} haseł dla planszy ${newGame.size}x${newGame.size}.`;
            return;
        }

        const encoded = encodeGameConfig(newGame.size, phrases);
        const id = crypto.randomUUID();
        savedGames.push({ id, size: newGame.size, phrases });
        goto(`/game/${id}?data=${encoded}`);
    }

    function deleteGame(id) {
        savedGames = savedGames.filter((game) => game.id !== id);
    }
</script>

<h1>Menu główne</h1>

<section>
    <h2>Nowa gra</h2>
    <form on:submit|preventDefault={createGame}>
        <label>
            Rozmiar planszy:
            <input bind:value={newGame.size} max="10" min="3" type="number" />
        </label>
        <label>
            Hasła (jedno w linii):
            <textarea bind:value={newGame.phrases} rows="10"></textarea>
        </label>
        {#if errorMessage}
            <p style="color: red;">{errorMessage}</p>
        {/if}
        <button type="submit">Stwórz grę</button>
    </form>
</section>

<section>
    <h2>Zapisane gry</h2>
    <ul>
        {#each savedGames as game}
            <li>
                <a href={`/game/${game.id}`}>{game.id}</a>
                <button on:click={() => deleteGame(game.id)}>Usuń</button>
                <a href={`/edit/${game.id}`}>Edytuj</a>
            </li>
        {/each}
    </ul>
</section>
