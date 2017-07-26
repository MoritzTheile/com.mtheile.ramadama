import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { RamadamaUser } from './ramadama-user.model';
import { RamadamaUserService } from './ramadama-user.service';

@Component({
    selector: 'jhi-ramadama-user-detail',
    templateUrl: './ramadama-user-detail.component.html'
})
export class RamadamaUserDetailComponent implements OnInit, OnDestroy {

    ramadamaUser: RamadamaUser;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ramadamaUserService: RamadamaUserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRamadamaUsers();
    }

    load(id) {
        this.ramadamaUserService.find(id).subscribe((ramadamaUser) => {
            this.ramadamaUser = ramadamaUser;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRamadamaUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ramadamaUserListModification',
            (response) => this.load(this.ramadamaUser.id)
        );
    }
}
