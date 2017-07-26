import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { State } from './state.model';
import { StatePopupService } from './state-popup.service';
import { StateService } from './state.service';

@Component({
    selector: 'jhi-state-delete-dialog',
    templateUrl: './state-delete-dialog.component.html'
})
export class StateDeleteDialogComponent {

    state: State;

    constructor(
        private stateService: StateService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stateListModification',
                content: 'Deleted an state'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('ramadamaApp.state.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-state-delete-popup',
    template: ''
})
export class StateDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private statePopupService: StatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.statePopupService
                .open(StateDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
