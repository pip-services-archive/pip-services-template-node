import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { LambdaFunction } from 'pip-services-runtime-node';

import { DummyMicroservice } from '../run/DummyMicroservice';
import { IDummyBusinessLogic } from '../logic/IDummyBusinessLogic';

export class DummyLambdaFunction extends LambdaFunction {
    private _logic: IDummyBusinessLogic;

    constructor() {
        super(new DummyMicroservice());
    }

    public link(components: ComponentSet) {
		this._logic = <IDummyBusinessLogic>components.getOneOptional(
			new ComponentDescriptor(Category.BusinessLogic, "pip-services-dummy", "*", "*")
		);

        super.link(components);        

        this.registerCommands(this._logic.getCommands());
    }
    
    // private getDummies(params: any, callback: any): void {
    //     this._logic.getDummies(
    //         params.correlation_id,
    //         new FilterParams(params.filter),
    //         new PagingParams(params.paging),
    //         callback  
    //     );
    // }

    // private getDummyById(params: any, callback: any): void {
    //     this._logic.getDummyById(
    //         params.correlation_id,
    //         params.dummy_id,
    //         callback  
    //     );
    // }

    // private createDummy(params: any, callback: any): void {
    //     this._logic.createDummy(
    //         params.correlation_id,
    //         params.dummy,
    //         callback  
    //     );
    // }

    // private updateDummy(params: any, callback: any): void {
    //     this._logic.updateDummy(
    //         params.correlation_id,
    //         params.dummy_id,
    //         params.dummy,
    //         callback  
    //     );
    // }

    // private deleteDummy(params: any, callback: any): void {
    //     this._logic.deleteDummy(
    //         params.correlation_id,
    //         params.dummy_id,
    //         callback  
    //     );
    // }
    
    // protected register() {
    //     this.registerAction(
    //         'get_dummies',
    //         this.getDummies
    //     );

    //     this.registerAction(
    //         'get_dummy_by_id',
    //         this.getDummyById
    //     );

    //     this.registerAction(
    //         'create_dummy',
    //         this.createDummy
    //     );

    //     this.registerAction(
    //         'update_dummy',
    //         this.updateDummy
    //     );

    //     this.registerAction(
    //         'delete_dummy',
    //         this.deleteDummy
    //     );
    // }
}