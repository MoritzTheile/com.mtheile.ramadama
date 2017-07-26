import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Action } from './action.model';
import { ActionPopupService } from './action-popup.service';
import { ActionService } from './action.service';

@Component({
    selector: 'jhi-action-delete-dialog',
    templateUrl: './action-delete-dialog.component.html'
})
export class ActionDeleteDialogComponent {

    action: Action;

    constructor(
        private actionService: ActionService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.actionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'actionListModification',
                content: 'Deleted an action'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('ramadamaApp.action.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-action-delete-popup',
    template: ''
})
export class ActionDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private actionPopupService: ActionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.actionPopupService
                .open(ActionDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
