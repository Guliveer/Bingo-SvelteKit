<script>
    import { goto } from '$app/navigation';
    import { encodeGameConfig, decodeGameConfig } from '$lib/utils';
    import { onMount } from 'svelte';

    let id = crypto.randomUUID();
    let newGame = { name: id, size: 3, phrases: '' }; // Each phrase in a new line
    let savedGames = [];
    let recentGames = [];
    let recentGamesData = [];
    let errorMessage = '';

    // Load saved games from localStorage
    onMount(() => {
        savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
        recentGames = JSON.parse(localStorage.getItem('recentGames')) || [];

        // decode recentGames 'data' param using decodeGameConfig to recentGamesData (array)
        // array scheme: {name: string, size: number, phrases: string[]}
        recentGamesData = recentGames.map((url) => {
            const params = new URLSearchParams(url.split('?')[1]);
            const encodedData = params.get('data');
            if (encodedData) {
                try {
                    return decodeGameConfig(encodedData);
                } catch (e) {
                    console.error('Error decoding game data:', e);
                }
            }
            return null;
        }).filter((game) => game !== null);
    });

    function createGame() {
        const phrases = newGame.phrases
            .split('\n')
            .map((p) => p.trim()) // Delete whitespaces
            .filter((p) => p !== ''); // Filter empty strings

        const requiredPhrases = newGame.size * newGame.size;

        if (phrases.length < requiredPhrases) {
            errorMessage = `You need at least ${requiredPhrases - phrases.length} more phrases for a ${newGame.size}x${newGame.size} board!`;
            return;
        }

        const encoded = encodeGameConfig(id, newGame.size, phrases);
        const gameConfig = { id, name: id, size: newGame.size, phrases };

        // Add new game to savedGames at the beginning
        savedGames = [gameConfig, ...savedGames];
        localStorage.setItem('savedGames', JSON.stringify(savedGames));

        // Redirect to the game page
        goto(`/game/${id}?data=${encoded}`);
    }

    function copyLink(game) {
        const url = `${window.location.origin}/game/${game.id}?data=${encodeGameConfig(game.name, game.size, game.phrases)}`;

        // copy to clipboard
        navigator.clipboard.writeText(url);

        alert('Link copied to clipboard!');
    }

    function removeRecentGame(index) {
        recentGames = recentGames.filter((_, i) => i !== index);
        recentGamesData = recentGamesData.filter((_, i) => i !== index);
        localStorage.setItem('recentGames', JSON.stringify(recentGames));
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

<h1>Create new Bingo</h1>
<section>
    <form on:submit|preventDefault={createGame}>
        <label>
            Board size:
            <input bind:value={newGame.size} max="9" min="3" step="2" type="number" />
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
                    {game.name || game.id}

                    <div class="actions">
                    <button on:click={() => goto(`/game/${game.id}?data=${encodeGameConfig(game.name, game.size, game.phrases)}`)}>
                            Play
                    </button>
                    <button on:click={() => copyLink(game)}>Copy Link</button>
                    <button on:click={() => editGame(game.id)}>Edit</button>
                    <button on:click={() => deleteGame(game.id)}>Delete</button>
                    </div>
                </li>
            {/each}
        </ul>
</section>
{/if}

{#if recentGames.length !== 0}
<section>
    <h2>Recent games</h2>
        <ul>
            <!-- List as [name](url)-->
            {#each recentGamesData as gameData, i}
                {#if gameData}
                    <li>
                        {gameData.name || gameData.id}
                        <div class="actions">
                            <button on:click={() => goto(recentGames[i])}>Play Again</button>
                            <button on:click={() => copyLink(gameData)}>Copy Link</button>
                            <button on:click={() => removeRecentGame(i)}>Remove</button>
                        </div>
                    </li>
                {/if}
            {/each}
        </ul>
</section>
{/if}
