export const getNamesRequestN = async () => {
    return await fetch('/data/names.json')
        .then(response => response.json())
}

export const getPricesRequestN = async () => {
    return await fetch('/data/data.json')
        .then(response => response.json())
}