export const isValidUrl = (url: string): boolean => {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
    return pattern.test(url);
};  