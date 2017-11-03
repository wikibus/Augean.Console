import flatten from 'lodash.flatten';

function uniqBy(arr, predicate) {
    const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];

    return [...arr.reduce((map, item) => {
        const key = cb(item);

        map.has(key) || map.set(key, item);

        return map;
    }, new Map()).values()];
}

function getProperties(resource) {
    if(!resource.types || Array.isArray(resource.types) === false){
         return [];
    }

    const allProperties = resource.types
                .map(type => resource.apiDocumentation.getProperties(type))
                .reduce((acc, val) => [...acc, ...val], []);

    return uniqBy(allProperties, sp => sp.property.id);
}

export {
    flatten,
    getProperties,
};
