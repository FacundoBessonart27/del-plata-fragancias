/** Manejo de URL Parameters */

export const URLParams = {
    get(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    set(param, value) {
        const url = new URL(window.location);
        url.searchParams.set(param, value);
        window.history.pushState({}, '', url);
    },

    getAll() {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {};
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
        return params;
    }
};