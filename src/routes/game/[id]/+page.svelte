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
                console.error('Error encoding game data:', e);
                dataError = true;
            }
        } else {
            dataError = true;
        }

        console.log(gameConfig);
    }
</script>

{#if dataError}
    <p>Error loading game data.</p>
{:else}
    <h1>{gameConfig.name}</h1>
    <BingoGrid {gameConfig} />
{/if}
