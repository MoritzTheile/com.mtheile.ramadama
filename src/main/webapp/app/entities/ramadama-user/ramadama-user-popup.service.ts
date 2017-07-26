import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RamadamaUser } from './ramadama-user.model';
import { RamadamaUserService } from './ramadama-user.service';

@Injectable()
export class RamadamaUserPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private ramadamaUserService: RamadamaUserService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.ramadamaUserService.find(id).subscribe((ramadamaUser) => {
                this.ramadamaUserModalRef(component, ramadamaUser);
            });
        } else {
            return this.ramadamaUserModalRef(component, new RamadamaUser());
        }
    }

    ramadamaUserModalRef(component: Component, ramadamaUser: RamadamaUser): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ramadamaUser = ramadamaUser;
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
