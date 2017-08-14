import { Component, Input, OnChanges, ViewChild, OnInit, OnDestroy  } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { State } from '../../entities/state/state.model';
import { StateService } from '../../entities/state/state.service';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';
import { Action } from '../../entities/action/action.model';
import { ActionService } from '../../entities/action/action.service';
import { ActionCreatePopupService } from './action-create-popup.service';

@Component({
    selector: 'jhi-action-create-wizard',
    templateUrl: './action-create-wizard.rmdm.component.html'
})

export class ActionCreateWizardComponent {

    stateBefore = new State();
    stateAfter = new State();

    private isSaving: boolean;

    constructor(
        private dataUtils: JhiDataUtils,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private stateService: StateService,
        private actionService: ActionService,
        public activeModal: NgbActiveModal,
    ) { }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    setPictureDataAndSave(event, state: State) {
        console.log('setPictureDataAndSave');
        if (event && event.target.files && event.target.files[0]) {

            const file = event.target.files[0];

            if (!/^image\//.test(file.type)) {
                alert('not an image: ' + file.type);
                return;
            }

            this.dataUtils.toBase64(file, (base64Data) => {
                state.pictureData = base64Data;
                state.pictureDataContentType = file.type;
                this.saveState(state);
            });

        } else {
            alert('form delivered not the data expected');
        }

    }

    saveState(state: State) {

        if (state.id !== undefined) {
            this.subscribeToSaveStateResponse(state, this.stateService.update(state), false);
        } else {
            this.subscribeToSaveStateResponse(state, this.stateService.create(state), true);
        }

    }

    private subscribeToSaveStateResponse(origState: State, result: Observable<State>, isCreated: boolean) {
        result.subscribe((returnedState: State) =>
            this.onSaveStateSuccess(origState, returnedState, isCreated), (res: Response) => this.onSaveError(res)
        );
    }

    private onSaveStateSuccess(origState: State, returnedState: State, isCreated: boolean) {

        console.log('setting id to ' + returnedState.id);
        origState.id = returnedState.id;

        if (this.stateBefore.id && this.stateAfter.id) {
            this.createAction();
            this.stateBefore = new State();
            this.stateAfter = new State();        }
    }

    createAction() {

        const action = new Action();
        action.stateBeforeId = this.stateBefore.id;
        action.stateAfterId = this.stateAfter.id;

        console.log('saving action.stateBeforeId: ' + action.stateBeforeId);
        console.log('saving action.stateAfterId: ' + action.stateAfterId);

        this.isSaving = true;

        this.subscribeToSaveResponse(this.actionService.create(action), true);
    }

    private subscribeToSaveResponse(result: Observable<Action>, isCreated: boolean) {
        result.subscribe((res: Action) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Action, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'ramadamaApp.action.created'
                : 'ramadamaApp.action.updated',
            { param: result.id }, null);

        this.eventManager.broadcast({ name: 'actionListModification', content: 'OK' });
        this.isSaving = false;
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

}
@Component({
    selector: 'jhi-action-create-popup',
    template: ''
})
export class ActionCreateWizardPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private actionPopupService: ActionCreatePopupService
    ) {}

    ngOnInit() {
        this.actionPopupService.open(ActionCreateWizardComponent);
    }

    ngOnDestroy() {
        // this.routeSub.unsubscribe();
    }
}
