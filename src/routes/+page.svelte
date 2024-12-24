<script>
    import { goto } from '$app/navigation';
    import {encodeGameConfig, shortenURL} from '$lib/utils';
    import { onMount } from 'svelte';

    let newGame = { size: 3, phrases: '' }; // Each phrase in a new line
    let savedGames = [];
    let errorMessage = '';

    // Wczytaj zapisane gry z localStorage
    onMount(() => {
        savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
    });

    function createGame() {
        const phrases = newGame.phrases.split('\n').filter((p) => p.trim() !== '');
        const requiredPhrases = newGame.size * newGame.size;

        if (phrases.length < requiredPhrases) {
            errorMessage = `You need at least ${requiredPhrases - phrases.length} more phrases for a ${newGame.size}x${newGame.size} board!`;
            return;
        }

        const encoded = encodeGameConfig(newGame.size, phrases);
        const id = crypto.randomUUID();
        const gameConfig = { id, size: newGame.size, phrases };

        // Dodaj nową grę do zapisanych
        savedGames = [...savedGames, gameConfig];
        localStorage.setItem('savedGames', JSON.stringify(savedGames));

        // Przejdź do nowej gry
        goto(`/game/${id}?data=${encoded}`);
    }

    async function shareGame(game) {
        const target = shortenURL(`${window.location.origin}/game/${game.id}?data=${encodeGameConfig(game.size, game.phrases)}`);
        await navigator.clipboard.writeText(target);
        alert('Game URL copied to clipboard!');
    }

    function deleteGame(id) {
        if (!confirm('Are you sure you want to delete this game?')) { // Confirm before deleting
            return;
        }
        savedGames = savedGames.filter((game) => game.id !== id);
        localStorage.setItem('savedGames', JSON.stringify(savedGames));
    }

    function editGame(id) {
        goto(`/edit/${id}`);
    }
</script>

<h1>Main Menu</h1>

<section>
    <h2>New game</h2>
    <form on:submit|preventDefault={createGame}>
        <label>
            Board size:
            <input bind:value={newGame.size} max="10" min="3" type="number" />
        </label>
        <label>
            Phrases (one per line):
            <textarea bind:value={newGame.phrases} rows="10"></textarea>
        </label>
        {#if errorMessage}
            <p style="color: red;">{errorMessage}</p>
        {/if}
        <button type="submit">Create game</button>
    </form>
</section>

{#if savedGames.length !== 0}
<section>
    <h2>Saved games</h2>
        <ul>
            {#each savedGames as game}
                <li>
                    <!--if game.name does not exist or is empty, then show game.id, else game.name-->
                    {game.name || game.id}

                    <div class="actions">
                    <button on:click={() => goto(`/game/${game.id}?data=${encodeGameConfig(game.size, game.phrases)}`)}>
                            Play
                    </button>
                    <button on:click={() => shareGame(game)}>Copy Link</button>
                    <button on:click={() => editGame(game.id)}>Edit</button>
                    <button on:click={() => deleteGame(game.id)}>Delete</button>
                    </div>
                </li>
            {/each}
        </ul>
</section>
{/if}
