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

    constructor(

        private dataUtils: JhiDataUtils,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private fb: FormBuilder,
        private stateService: StateService) {

    }

   setPictureDataAndSave(event, state: State) {

        if (event && event.target.files && event.target.files[0]) {

            const file = event.target.files[0];

            if ( !/^image\//.test(file.type)) {
                alert('not an image: ' + file.type);
                return;
            }

            this.dataUtils.toBase64(file, (base64Data) => {
                state.pictureData = base64Data;
                state.pictureDataContentType = file.type;
                this.saveState(state);
            });

        }

    }

    saveState(state: State) {

        if (state.id !== undefined) {
            this.subscribeToSaveStateResponse(
                this.stateService.update(state), false);
        } else {
            this.subscribeToSaveStateResponse(
                this.stateService.create(state), true);
        }

    }

    private subscribeToSaveStateResponse(result: Observable<State>, isCreated: boolean) {
        result.subscribe((res: State) =>
            this.onSaveStateSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveStateSuccess(result: State, isCreated: boolean) {

        this.state.id = result.id;

        this.alertService.success(

            isCreated ? 'ramadamaApp.state.created'
                : 'ramadamaApp.state.updated',
            { param: result.id }, null);

        this.eventManager.broadcast({ name: 'stateListModification', content: 'OK' });

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
