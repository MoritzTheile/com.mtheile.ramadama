import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Action } from './action.model';
import { ActionPopupService } from './action-popup.service';
import { ActionService } from './action.service';
import { RamadamaUser, RamadamaUserService } from '../ramadama-user';
import { State, StateService } from '../state';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-action-dialog',
    templateUrl: './action-dialog.component.html'
})
export class ActionDialogComponent implements OnInit {

    action: Action;
    authorities: any[];
    isSaving: boolean;

    ramadamausers: RamadamaUser[];

    statebefores: State[];

    stateafters: State[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private actionService: ActionService,
        private ramadamaUserService: RamadamaUserService,
        private stateService: StateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.ramadamaUserService.query()
            .subscribe((res: ResponseWrapper) => { this.ramadamausers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.stateService
            .query({filter: 'action-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.action.stateBeforeId) {
                    this.statebefores = res.json;
                } else {
                    this.stateService
                        .find(this.action.stateBeforeId)
                        .subscribe((subRes: State) => {
                            this.statebefores = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.stateService
            .query({filter: 'action-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.action.stateAfterId) {
                    this.stateafters = res.json;
                } else {
                    this.stateService
                        .find(this.action.stateAfterId)
                        .subscribe((subRes: State) => {
                            this.stateafters = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.action.id !== undefined) {
            this.subscribeToSaveResponse(
                this.actionService.update(this.action), false);
        } else {
            this.subscribeToSaveResponse(
                this.actionService.create(this.action), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Action>, isCreated: boolean) {
        result.subscribe((res: Action) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Action, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'ramadamaApp.action.created'
            : 'ramadamaApp.action.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'actionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
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

    trackRamadamaUserById(index: number, item: RamadamaUser) {
        return item.id;
    }

    trackStateById(index: number, item: State) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-action-popup',
    template: ''
})
export class ActionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private actionPopupService: ActionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.actionPopupService
                    .open(ActionDialogComponent, params['id']);
            } else {
                this.modalRef = this.actionPopupService
                    .open(ActionDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
