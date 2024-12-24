export function encodeGameConfig(name, size, phrases) {
    const config = JSON.stringify({ name, size, phrases });
    return btoa(config);
}

export function decodeGameConfig(encoded) {
    const decoded = atob(encoded);
    const { name, size, phrases } = JSON.parse(decoded);
    return { name, size, phrases };
}

export async function shortenURL(url){
    // get request to https://is.gd/create.php?format=simple&url=target_url
    const targetUrl = "https://is.gd/create.php?format=simple&url=";
    const response = await fetch(targetUrl + url);
    return response.text();
}
