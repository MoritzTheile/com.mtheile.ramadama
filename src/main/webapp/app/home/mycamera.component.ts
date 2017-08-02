import { Component, AfterViewInit } from '@angular/core';
import { State } from '../entities/state/state.model';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';
import { StateService } from '../entities/state/state.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-mycamera',
    templateUrl: './mycamera.html',
    styleUrls: [
        'home.css'
    ]
})

export class MyCameraComponent {

    state: State = new State();
    isSaving = false;

    constructor(
        // public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private alertService: JhiAlertService,
        private stateService: StateService,
        private eventManager: JhiEventManager
    ) { }

    setPictureDataAndSave(event) {
       if (event && event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if ( !/^image\//.test(file.type)) {
                alert('not an image: ' + file.type);
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                this.state.pictureData = base64Data;
                this.state.pictureDataContentType = file.type;
                this.save();
            });

        }
       
    }

    save() {
        this.isSaving = true;
        if (this.state.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stateService.update(this.state), false);
        } else {
            this.subscribeToSaveResponse(
                this.stateService.create(this.state), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<State>, isCreated: boolean) {
        result.subscribe((res: State) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: State, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'ramadamaApp.state.created'
                : 'ramadamaApp.state.updated',
            { param: result.id }, null);

        this.eventManager.broadcast({ name: 'stateListModification', content: 'OK' });
        this.isSaving = false;
        // this.activeModal.dismiss(result);

    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

}
