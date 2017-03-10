import { IDummyClient } from '../../../src/clients/version1/IDummyClient';
export declare class DummyClientFixture {
    private _client;
    constructor(client: IDummyClient);
    testCrudOperations(done: any): void;
}
