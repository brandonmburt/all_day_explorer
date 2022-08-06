export const getEditionsMap = (editions) => {

    const myMap = new Map();
    editions.forEach(e => {
        myMap.set(e.id, e);
    });

    return myMap;

}