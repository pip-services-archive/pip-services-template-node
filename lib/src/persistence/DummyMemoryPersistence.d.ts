import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DummyFilePersistence } from './DummyFilePersistence';
import { IDummyPersistence } from './IDummyPersistence';
export declare class DummyMemoryPersistence extends DummyFilePersistence implements IDummyPersistence {
    /**
     * Unique descriptor for the DummyFilePersistence component
     */
    static Descriptor: ComponentDescriptor;
    constructor();
    configure(config: ComponentConfig): void;
    save(callback: (err: any) => void): void;
}
