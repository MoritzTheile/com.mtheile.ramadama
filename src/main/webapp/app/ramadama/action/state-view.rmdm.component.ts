import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { State } from '../../entities/state/state.model';
import { StateService } from '../../entities/state/state.service';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { Action } from '../../entities/action/action.model';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'jhi-state-view',
    templateUrl: './state-view.rmdm.component.html'
})

export class StateViewComponent implements OnInit {

    @Input() stateId: number;

    state: State;

    constructor(

        private dataUtils: JhiDataUtils,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private fb: FormBuilder,
        private stateService: StateService) {

    }

    ngOnInit(): void {
        this.loadState(this.stateId);
    }

    loadState(stateId: number) {

        this.stateService.find(stateId).subscribe(
            (res: State) => this.onFindSuccess(res),
            (res: Response) => this.onFindError(res)
        );

    }

    private onFindSuccess(result: State) {

        this.state = result;

    }

    private onFindError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.onError(error);
    }

    private onError(error) {

        this.alertService.error(error.message, null, null);
    }
}
