<script>
    import { page } from '$app/state';
    import { decodeGameConfig } from '$lib/utils';
    import BingoGrid from '$lib/components/BingoGrid.svelte';

    let gameConfig = null;
    let dataError = false;

    $: {
        const params = new URLSearchParams(page.url.search);
        const encodedData = params.get('data');
        if (encodedData) {
            try {
                gameConfig = decodeGameConfig(encodedData); // Decode game data
            } catch (e) {
                console.error('Error encoding game data:', e);
                dataError = true;
            }
        } else {
            dataError = true;
        }
    }
</script>

{#if dataError}
    <p>Error loading game data.</p>
{:else}
    <h1>{gameConfig.name || gameConfig.id}</h1>
    <BingoGrid {gameConfig} />
{/if}
