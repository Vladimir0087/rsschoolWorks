function getLocalData(data) {
    if (localStorage.getItem(data) !== null) {
        return JSON.parse(localStorage.getItem(data));
    } else {
        return [];
    };
};

export default getLocalData;