export const buildUrl = (endpoint, apiKey, options) => {
    const baseURL = new URL('https://api.getAddress.io').concat(endpoint)
    baseURL.searchParams.append('api-key', apiKey)
    const params = new URLSearchParams(options).toString()
    return baseURL.href.concat('&').concat(params)
}
