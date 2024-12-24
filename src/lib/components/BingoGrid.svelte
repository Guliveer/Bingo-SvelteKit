<script>
    import {onMount} from "svelte";

    export let gameConfig;

    let size = gameConfig.size; // Rozmiar planszy
    let shuffled = [...gameConfig.phrases].sort(() => Math.random() - 0.5).slice(0, size * size); // Losowe rozmieszczenie fraz na planszy
    let marked = new Set(); // Zaznaczone pola
    let savedGames = [];
    let hasWon = false;

    // Wczytaj zapisane gry z localStorage
    onMount(() => {
        savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
    });

    function toggleMark(index) {
        if (marked.has(index)) {
            marked.delete(index);
        } else {
            marked.add(index);
        }
        marked = new Set(marked);
        checkWin();
    }

    function checkWin() {
        // Sprawdzanie warunków wygranej (wiersze, kolumny, przekątne)
        const checkLine = (indices) => indices.every((idx) => marked.has(idx));
        for (let i = 0; i < size; i++) {
            if (
                checkLine(Array.from({ length: size }, (_, j) => i * size + j)) || // Wiersz
                checkLine(Array.from({ length: size }, (_, j) => j * size + i))   // Kolumna
            ) {
                hasWon = true;
                return;
            }
        }
        // Sprawdzanie przekątnych
        const diag1 = Array.from({ length: size }, (_, i) => i * size + i);
        const diag2 = Array.from({ length: size }, (_, i) => (i + 1) * size - (i + 1));
        hasWon = (checkLine(diag1) || checkLine(diag2));
    }

    function saveConfig() {
        const curConfig = {
            id: gameConfig.id,
            name: gameConfig.name,
            size: gameConfig.size,
            phrases: gameConfig.phrases
        };

        savedGames = [...savedGames, curConfig];
        localStorage.setItem('savedGames', JSON.stringify(savedGames));

        alert('Configuration saved!');
    }

    function copyLink() {
        // copy current window URL to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
</script>

<div class="grid" style="grid-template-columns: repeat({size}, 1fr);">
    {#each shuffled as phrase, index}
        <div
                class="cell {marked.has(index) ? 'marked' : ''}"
                on:click={() => toggleMark(index)}>
            {phrase}
        </div>
    {/each}
</div>

{#if hasWon}
    <p class="win-message">You won!</p>
{/if}

<div class="actions">
    <button on:click={saveConfig}>Save Configuration</button>
    <button on:click={() => (window.location.href = '/')}>Go to Main Menu</button>
    <button on:click={copyLink}>Copy Link</button>
</div>

<style>
    .grid {
        display: grid;
        gap: 10px;
        max-width: 600px;
        margin: 20px auto;
    }

    .cell {
        padding: 20px;
        text-align: center;
        background: #fff;
        border: 2px solid #dee2e6;
        border-radius: 5px;
        font-weight: bold;
        font-size: 1.2rem;
        color: #495057;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
    }

    .cell:hover {
        background-color: #0d6efd;
        color: #fff;
    }

    .cell.marked {
        background-color: #198754;
        color: #fff;
    }

    .win-message {
        text-align: center;
        margin-top: 20px;
        color: #198754;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .actions {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }

    .actions button {
        padding: 10px 20px;
        font-size: 1rem;
        background-color: #0d6efd;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .actions button:hover {
        background-color: #0b5ed7;
    }
</style>