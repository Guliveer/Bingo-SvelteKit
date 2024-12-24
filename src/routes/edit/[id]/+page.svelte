<script>
    import { page } from '$app/state';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let gameId = ''; // ID gry
    let gameName = ''; // Nazwa gry
    let size = 3; // Rozmiar planszy
    let phrases = []; // Hasła gry
    let errorMessage = '';

    $: gameId = page.params.id; // Pobieramy ID gry z parametrów trasy

    // Wczytujemy dane gry z `localStorage`
    onMount(() => {
        const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
        const game = savedGames.find((g) => g.id === gameId);

        if (game) {
            size = game.size;
            phrases = [...game.phrases];
            gameName = game.name;
        } else {
            errorMessage = 'Game not found.';
        }
    });

    function saveChanges() {
        const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
        const gameIndex = savedGames.findIndex((g) => g.id === gameId);

        if (gameIndex !== -1) {
            savedGames[gameIndex] = { id: gameId, name: gameName, size, phrases };
            localStorage.setItem('savedGames', JSON.stringify(savedGames));
            goto('/');
        } else {
            errorMessage = 'Error saving game.';
        }
    }

    function addPhrase() {
        phrases = [...phrases, ''];
    }

    function removePhrase(index) {
        phrases = phrases.filter((_, i) => i !== index);
    }
</script>

<h1>Edit Game</h1>

{#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
{:else}
    <form on:submit|preventDefault={saveChanges}>
        <label>
            Board size:
            <input type="number" bind:value={size} min="3" max="9" step="2" />
        </label>
        <label>
            Custom name:
            <input type="text" bind:value={gameName} />
        </label>
        <h2>Phrases</h2>
        <ul>
            {#each phrases as phrase, index}
                <li>
                    <input type="text" bind:value={phrases[index]} />
                    <button type="button" on:click={() => removePhrase(index)}>Remove</button>
                </li>
            {/each}
        </ul>
        <button type="button" on:click={addPhrase}>Add Phrase</button>
        <button type="submit">Save Changes</button>
    </form>

    <button class='btn' on:click={() => goto('/')}>Back to Menu</button>
{/if}

<style>
    form {
        margin-top: 20px;
    }

    label {
        display: block;
        margin-bottom: 10px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 10px;
    }

    .btn {
        display: block;
        margin: 20px auto;
        background-color: #198754;
        color: white;
    }
</style>