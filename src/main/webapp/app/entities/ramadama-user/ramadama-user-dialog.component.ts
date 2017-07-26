import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RamadamaUser } from './ramadama-user.model';
import { RamadamaUserPopupService } from './ramadama-user-popup.service';
import { RamadamaUserService } from './ramadama-user.service';

@Component({
    selector: 'jhi-ramadama-user-dialog',
    templateUrl: './ramadama-user-dialog.component.html'
})
export class RamadamaUserDialogComponent implements OnInit {

    ramadamaUser: RamadamaUser;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private ramadamaUserService: RamadamaUserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ramadamaUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ramadamaUserService.update(this.ramadamaUser), false);
        } else {
            this.subscribeToSaveResponse(
                this.ramadamaUserService.create(this.ramadamaUser), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<RamadamaUser>, isCreated: boolean) {
        result.subscribe((res: RamadamaUser) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: RamadamaUser, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'ramadamaApp.ramadamaUser.created'
            : 'ramadamaApp.ramadamaUser.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'ramadamaUserListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-ramadama-user-popup',
    template: ''
})
export class RamadamaUserPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ramadamaUserPopupService: RamadamaUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.ramadamaUserPopupService
                    .open(RamadamaUserDialogComponent, params['id']);
            } else {
                this.modalRef = this.ramadamaUserPopupService
                    .open(RamadamaUserDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
