import { Hydra } from 'alcaeus';
import * as SchemaImage from './resources/SchemaImage';

Hydra.resourceFactory.mixins.push(SchemaImage);

export {
    Hydra
};
