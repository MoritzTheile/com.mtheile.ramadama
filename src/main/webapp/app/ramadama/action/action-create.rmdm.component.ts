import { Component, Input, OnChanges } from '@angular/core';
import { State } from '../../entities/state/state.model';
import { StateService } from '../../entities/state/state.service';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';
import { Action } from '../../entities/action/action.model';
import { ActionService } from '../../entities/action/action.service';

@Component({
    selector: 'jhi-action-create',
    templateUrl: './action-create.rmdm.component.html'
})

export class ActionCreateComponent {

    stateBefore = new State();
    stateAfter = new State();

    private isSaving: boolean;

    constructor(
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private stateService: StateService,
        private actionService: ActionService,
    ) {
        this.stateBefore.pictureDataContentType = 'greetings from parent';
    }

    createAction() {

        const action = new Action();
        action.stateBeforeId = this.stateBefore.id;
        action.stateAfterId = this.stateAfter.id;

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
