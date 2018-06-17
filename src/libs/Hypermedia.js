import { Hydra } from 'alcaeus';
import * as SchemaImage from './resources/SchemaImage';

Hydra.mediaTypeProcessors.RDF.resourceFactory.mixins.push(SchemaImage);

export {
    Hydra
};
