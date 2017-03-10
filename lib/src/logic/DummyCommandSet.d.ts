import { CommandSet } from 'pip-services-runtime-node';
import { IDummyBusinessLogic } from './IDummyBusinessLogic';
export declare class DummyCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IDummyBusinessLogic);
    private makeGetDummiesCommand();
    private makeGetDummyByIdCommand();
    private makeCreateDummyCommand();
    private makeUpdateDummyCommand();
    private makeDeleteDummyCommand();
}
