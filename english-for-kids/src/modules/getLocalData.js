function getLocalData(data) {
    if (localStorage.getItem(data) !== null) {
        return JSON.parse(localStorage.getItem(data));
    }
        return [];
}

export default getLocalData;
