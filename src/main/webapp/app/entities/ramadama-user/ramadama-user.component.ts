import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { RamadamaUser } from './ramadama-user.model';
import { RamadamaUserService } from './ramadama-user.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-ramadama-user',
    templateUrl: './ramadama-user.component.html'
})
export class RamadamaUserComponent implements OnInit, OnDestroy {
ramadamaUsers: RamadamaUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ramadamaUserService: RamadamaUserService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ramadamaUserService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ramadamaUsers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRamadamaUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RamadamaUser) {
        return item.id;
    }
    registerChangeInRamadamaUsers() {
        this.eventSubscriber = this.eventManager.subscribe('ramadamaUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
