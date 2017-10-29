import flatten from 'lodash.flatten';

function getProperties(resource) {
    if(!resource.types || Array.isArray(resource.types) === false){
         return [];
    }

    return resource.types
                .map(type => resource.apiDocumentation.getProperties(type))
                .reduce((acc, val) => [...acc, ...val]);
}

export {
    flatten,
    getProperties,
};
