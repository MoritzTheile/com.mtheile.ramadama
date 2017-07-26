import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { RamadamaUser } from './ramadama-user.model';
import { RamadamaUserPopupService } from './ramadama-user-popup.service';
import { RamadamaUserService } from './ramadama-user.service';

@Component({
    selector: 'jhi-ramadama-user-delete-dialog',
    templateUrl: './ramadama-user-delete-dialog.component.html'
})
export class RamadamaUserDeleteDialogComponent {

    ramadamaUser: RamadamaUser;

    constructor(
        private ramadamaUserService: RamadamaUserService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ramadamaUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ramadamaUserListModification',
                content: 'Deleted an ramadamaUser'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('ramadamaApp.ramadamaUser.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-ramadama-user-delete-popup',
    template: ''
})
export class RamadamaUserDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ramadamaUserPopupService: RamadamaUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.ramadamaUserPopupService
                .open(RamadamaUserDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
