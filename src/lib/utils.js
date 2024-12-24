export function encodeGameConfig(name, size, phrases) {
    const config = JSON.stringify({ name, size, phrases });
    return btoa(config);
}

export function decodeGameConfig(encoded) {
    const decoded = atob(encoded);
    const { name, size, phrases } = JSON.parse(decoded);
    return { name, size, phrases };
}
