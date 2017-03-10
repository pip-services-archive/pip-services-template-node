import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { SenecaService } from 'pip-services-runtime-node';
export declare class DummySenecaService extends SenecaService {
    /**
     * Unique descriptor for the DummySenecaService component
     */
    static Descriptor: ComponentDescriptor;
    private _logic;
    constructor();
    link(components: ComponentSet): void;
}
