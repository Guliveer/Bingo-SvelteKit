<script>
    import { page } from '$app/stores';
    import { decodeGameConfig } from '$lib/utils';
    import BingoGrid from '$lib/components/BingoGrid.svelte';

    let gameConfig = null;
    let dataError = false;

    $: {
        const params = new URLSearchParams($page.url.search);
        const encodedData = params.get('data');
        if (encodedData) {
            try {
                gameConfig = decodeGameConfig(encodedData); // Dekoduj konfigurację gry
            } catch (e) {
                console.error('Błąd dekodowania danych gry:', e);
                dataError = true;
            }
        } else {
            dataError = true;
        }
    }
</script>

{#if dataError}
    <p>Błąd: Nie można załadować danych gry.</p>
{:else}
    <h1>Bingo: {gameConfig.size}x{gameConfig.size}</h1>
    <BingoGrid {gameConfig} />
{/if}
