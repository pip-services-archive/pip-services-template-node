import { ProcessRunner } from 'pip-services-runtime-node';

import { DummyMicroservice } from './DummyMicroservice';

/**
 * Dummy process runner
 * 
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-06
 */
export class DummyProcessRunner extends ProcessRunner {
    /**
     * Creates instance of dummy process runner
     */
    constructor() {
        super(new DummyMicroservice());
    }
}