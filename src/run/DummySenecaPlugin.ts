import { SenecaPlugin } from 'pip-services-runtime-node';

import { DummyMicroservice} from './DummyMicroservice';

export class DummySenecaPlugin extends SenecaPlugin {
    constructor() {
        super('dummy', new DummyMicroservice());
    }
}