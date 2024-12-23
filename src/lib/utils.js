export function encodeGameConfig(size, phrases) {
    const config = JSON.stringify({ size, phrases });
    return btoa(config);
}

export function decodeGameConfig(encoded) {
    const decoded = atob(encoded);
    const { size, phrases } = JSON.parse(decoded);
    return { size, phrases };
}
