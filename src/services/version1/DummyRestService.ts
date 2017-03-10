let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { RestService } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IDummyBusinessLogic } from '../../logic/IDummyBusinessLogic';

export class DummyRestService extends RestService {       
	/**
	 * Unique descriptor for the DummyRestService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-dummy", "rest", "1.0"
	);
    
	private _logic: IDummyBusinessLogic;

    constructor() {
        super(DummyRestService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IDummyBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-dummy", "*", "*")
		);

		super.link(components);		
	}
    
    private getDummies(req, res) {
        this._logic.getDummies(
            req.params.correlation_id,
            new FilterParams(req.params),
            new PagingParams(req.params),
            this.sendResult(req, res)
        );
    }

    private getDummyById(req, res) {
        this._logic.getDummyById(
            req.params.correlation_id,
            req.params.dummyId,
            this.sendResult(req, res)
        );
    }

    private createDummy(req, res) {
        this._logic.createDummy(
            req.params.correlation_id,
            req.body,
            this.sendCreatedResult(req, res)
        );
    }

    private updateDummy(req, res) {
        this._logic.updateDummy(
            req.params.correlation_id,
            req.params.dummyId,
            req.body,
            this.sendResult(req, res)
        );
    }

    private deleteDummy(req, res) {
        this._logic.deleteDummy(
            req.params.correlation_id,
            req.params.dummyId,
            this.sendDeletedResult(req, res)
        );
    }    
        
    protected register() {
        this.registerRoute('get', '/dummies', this.getDummies);
        this.registerRoute('get', '/dummies/:dummyId', this.getDummyById);
        this.registerRoute('post', '/dummies', this.createDummy);
        this.registerRoute('put', '/dummies/:dummyId', this.updateDummy);
        this.registerRoute('delete', '/dummies/:dummyId', this.deleteDummy);
    }
}
