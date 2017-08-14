import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Action } from '../../entities/action/action.model';
import { ActionService } from '../../entities/action/action.service';

@Injectable()
export class ActionCreatePopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private actionService: ActionService

    ) {}

    open(component: Component): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        return this.actionModalRef(component, new Action());

    }

    actionModalRef(component: Component, action: Action): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.action = action;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
