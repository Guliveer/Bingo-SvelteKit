<script>
    let pageTitle = 'Bingo Game'; // Made that way for future enhancements
</script>

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<slot />

<footer style="
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 20px;
    position: static;
    bottom: 0;
    left: 0;
    right: 0;
">
    Made with ❤️ by <a href="https://github.com/Guliveer/Bingo-SvelteKit" target="_blank">Guliveer</a>
</footer>