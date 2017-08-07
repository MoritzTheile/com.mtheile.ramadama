import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { State } from '../../entities/state/state.model';
import { StateService } from '../../entities/state/state.service';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { Action } from '../../entities/action/action.model';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'jhi-state-create',
    templateUrl: './state-create.rmdm.component.html'
})

export class StateCreateComponent {

    @Input() state: State;

    stateCreateFormGroup: FormGroup;

    constructor(

        private dataUtils: JhiDataUtils,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private fb: FormBuilder,
        private stateService: StateService) {

        this.createForm();

        this.stateCreateFormGroup.get('pictureDataContentType').valueChanges.forEach((value: string) => {

            this.state.pictureDataContentType = value;
            this.save(this.state);

        });

    }

    createForm() {
        this.stateCreateFormGroup = this.fb.group({
            pictureDataContentType: '',

        });
    }

    save(state: State) {
        if (state.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stateService.update(state), false);
        } else {
            this.subscribeToSaveResponse(
                this.stateService.create(state), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<State>, isCreated: boolean) {
        result.subscribe((res: State) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: State, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'ramadamaApp.state.created'
                : 'ramadamaApp.state.updated',
            { param: result.id }, null);

        this.eventManager.broadcast({ name: 'stateListModification', content: 'OK' });
        // this.activeModal.dismiss(result);

    }

    private onSaveError(error) {
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
