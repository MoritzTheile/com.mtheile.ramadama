import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Action } from '../../entities/action/action.model';
import { ActionService } from '../../entities/action/action.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-action-list',
    templateUrl: './action-list.rmdm.component.html'
})
export class ActionListComponent implements OnInit, OnDestroy {

    actions: Action[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private actionService: ActionService,
        private parseLinks: JhiParseLinks,
        private alertService: JhiAlertService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig
    ) {

        this.itemsPerPage = ITEMS_PER_PAGE;

        this.page = 0;
        this.previousPage = 0;
        this.reverse = false;
        this.predicate = '';
        this.currentSearch = '';

        this.loadAll();

    }

    loadAll() {
        if (this.currentSearch) {
            this.actionService.search({
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
                (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
        }
        this.actionService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
            );
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {

        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.loadAll();
    }
    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;

        this.loadAll();
    }

    ngOnInit() {

        this.loadAll();

        // leads to: ERROR TypeError: _this.connectedPromise is not a function
        // this.principal.identity()
        //  .then((account) => {
        //     this.currentAccount = account;
        // });

        this.registerChangeInActions();

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Action) {
        return item.id;
    }
    registerChangeInActions() {
        this.eventSubscriber = this.eventManager.subscribe('actionListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.actions = data;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
