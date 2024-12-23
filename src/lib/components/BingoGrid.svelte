<script>
    export let gameConfig;

    let shuffled = [];
    let marked = new Set(); // Zestaw indeksów zaznaczonych pól
    let size = gameConfig.size; // Rozmiar planszy
    let hasWon = false;

    // Losowe rozmieszczenie fraz na planszy
    $: shuffled = [...gameConfig.phrases]
        .sort(() => Math.random() - 0.5)
        .slice(0, size * size);

    function toggleMark(index) {
        if (marked.has(index)) {
            marked.delete(index); // Odznacz pole
        } else {
            marked.add(index); // Zaznacz pole
        }
        marked = new Set(marked); // Ustawienie nowego Set (dla reaktywności)
        checkWin(); // Sprawdzaj warunki wygranej po każdej zmianie
    }

    function checkWin() {
        // Tworzymy tablicę z zaznaczonymi indeksami
        const markedArray = Array.from(marked);

        // Sprawdź wiersze
        for (let row = 0; row < size; row++) {
            const rowIndices = Array.from({ length: size }, (_, i) => row * size + i);
            if (rowIndices.every((idx) => marked.has(idx))) {
                hasWon = true;
                return;
            }
        }

        // Sprawdź kolumny
        for (let col = 0; col < size; col++) {
            const colIndices = Array.from({ length: size }, (_, i) => col + i * size);
            if (colIndices.every((idx) => marked.has(idx))) {
                hasWon = true;
                return;
            }
        }

        // Sprawdź przekątne
        const diagonal1 = Array.from({ length: size }, (_, i) => i * size + i);
        if (diagonal1.every((idx) => marked.has(idx))) {
            hasWon = true;
            return;
        }

        const diagonal2 = Array.from({ length: size }, (_, i) => (i + 1) * size - (i + 1));
        if (diagonal2.every((idx) => marked.has(idx))) {
            hasWon = true;
            return;
        }

        hasWon = false; // Jeśli nie ma wygranej
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
    <p class="win-message">Gratulacje! Wygrałeś!</p>
{/if}

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
</style>
