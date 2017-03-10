let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { SenecaService } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { DummyController } from '../../logic/DummyController';
import { IDummyBusinessLogic } from '../../logic/IDummyBusinessLogic';

export class DummySenecaService extends SenecaService {       
	/**
	 * Unique descriptor for the DummySenecaService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-dummy", "seneca", "1.0"
	);

    private _logic: IDummyBusinessLogic;

    constructor() {
        super(DummySenecaService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IDummyBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-dummy", "*", "*")
		);

		super.link(components);		

        this.registerCommands('dummy', this._logic.getCommands());
	}

}
