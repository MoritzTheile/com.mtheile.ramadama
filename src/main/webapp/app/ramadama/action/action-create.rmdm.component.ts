import { Component, Input, OnChanges } from '@angular/core';
import { State } from '../../entities/state/state.model';
import { StateService } from '../../entities/state/state.service';
import { JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'jhi-action-create',
    templateUrl: './action-create.rmdm.component.html'
})

export class ActionCreateComponent {

    stateBefore  = new State();
    stateAfter = new State();

    constructor(
        private alertService: JhiAlertService,
        private stateService: StateService) {
        this.stateBefore.pictureDataContentType = 'greetings from parent';
    }

 }
