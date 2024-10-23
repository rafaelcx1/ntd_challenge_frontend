export const mapToQueryParam = (params: any) => {
    return params
        ? '?' + Object.entries(params)
            .filter(([_, value]) => value !== null && value !== undefined)
            .flatMap(([key, value]) => [value].flat().map(v => [key, v]))
            .map(it => it.join("="))
            .join("&")
        : "";
}