<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import BingoGrid from '$lib/components/BingoGrid.svelte';

    let gameConfig = null;
    let gameId = $page.params.id;

    // Załaduj grę na podstawie ID z URL
    onMount(() => {
        const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
        const game = savedGames.find(game => game.id === gameId);
        if (game) {
            gameConfig = game.config;
        }
    });

    // Funkcja zapisująca edytowaną grę
    function saveEditedGame() {
        const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
        const gameIndex = savedGames.findIndex(game => game.id === gameId);
        if (gameIndex !== -1) {
            savedGames[gameIndex].config = gameConfig;
            localStorage.setItem('savedGames', JSON.stringify(savedGames));
            goto('/');
        }
    }

    // Funkcja anulująca edycję
    function cancelEdit() {
        goto('/');
    }

    // Funkcje dodawania/usuwania haseł
    function addPhrase() {
        gameConfig.phrases.push(`Hasło ${gameConfig.phrases.length + 1}`);
    }

    function removePhrase(index) {
        gameConfig.phrases.splice(index, 1);
    }
</script>

<h1>Edytuj grę</h1>

{#if gameConfig}
    <BingoGrid {gameConfig} />
    <div class="phrases">
        <h3>Hasła:</h3>
        {#each gameConfig.phrases as phrase, index}
            <div>
                <input type="text" bind:value={gameConfig.phrases[index]} />
                <button on:click={() => removePhrase(index)}>Usuń hasło</button>
            </div>
        {/each}

        <button on:click={addPhrase}>Dodaj hasło</button>
    </div>

    <div>
        <button on:click={saveEditedGame}>Zapisz zmiany</button>
        <button on:click={cancelEdit}>Anuluj</button>
    </div>
{:else}
    <p>Nie znaleziono gry do edycji.</p>
{/if}

<style>
    button {
        padding: 10px;
        margin: 10px;
        background-color: #198754;
        color: white;
        border: none;
        cursor: pointer;
    }

    button:hover {
        background-color: #157347;
    }

    .phrases div {
        margin-bottom: 5px;
    }
</style>
