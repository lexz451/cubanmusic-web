export function decodeBase64Image(data, type) {
    return `data:${type};base64,${data}`;
}