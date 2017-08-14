import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Action } from '../../entities/action/action.model';

@Injectable()
export class ActionCreatePopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router

    ) {}

    open(component: Component): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        return this.actionModalRef(component);

    }

    actionModalRef(component: Component): NgbModalRef {

        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        // modalRef.componentInstance.action = action;
        modalRef.result.then((result) => {
            // alert('result gklargl');
            this.router.navigate(['']);
            // this.router.navigate(['/']);
            this.isOpen = false;
        }, (reason) => {
            // alert('reason erzu');
            this.router.navigate(['']);
            // this.router.navigate(['/']);
            this.isOpen = false;
        });
        return modalRef;
    }
}
