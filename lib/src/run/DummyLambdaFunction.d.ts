import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaFunction } from 'pip-services-runtime-node';
export declare class DummyLambdaFunction extends LambdaFunction {
    private _logic;
    constructor();
    link(components: ComponentSet): void;
}
