import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { RestService } from 'pip-services-runtime-node';
export declare class DummyRestService extends RestService {
    /**
     * Unique descriptor for the DummyRestService component
     */
    static Descriptor: ComponentDescriptor;
    private _logic;
    constructor();
    link(components: ComponentSet): void;
    private getDummies(req, res);
    private getDummyById(req, res);
    private createDummy(req, res);
    private updateDummy(req, res);
    private deleteDummy(req, res);
    protected register(): void;
}
