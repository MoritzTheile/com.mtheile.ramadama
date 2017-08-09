import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {

    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    // /////////////////////////////////////////////////////////////////////
    // // from https://jsfiddle.net/awolf2904/qww6g0a6/

    // snapshotData: any;
    // _video: any = null
    // patData: any = null;

    // patOpts: any = { x: 0, y: 0, w: 25, h: 25 };

    // // Setup a channel to receive a video property
    // // with a reference to the video element
    // // See the HTML binding in main.html
    // channel = {};

    // webcamError = false;
    // onError = function (err) {
    //     alert(err)
    // };

    // onSuccess() {
    //     // The video element contains the captured camera data
    //     this._video = this.channel.video;
    //     $apply(function () {
    //         this.patOpts.w = this._video.width;
    //         this.patOpts.h = this._video.height;
    //         //$scope.showDemos = true;
    //     });
    // };

    // onStream(stream) {
    //     // You could do something manually with the stream.
    // };

    // makeSnapshot() {
    //     if (this._video) {
    //         var patCanvas = document.querySelector('#snapshot');
    //         if (!patCanvas) return;

    //         patCanvas.width = this._video.width;
    //         patCanvas.height = this._video.height;
    //         var ctxPat = patCanvas.getContext('2d');

    //         var idata = getVideoData(patOpts.x, patOpts.y, patOpts.w, patOpts.h);
    //         ctxPat.putImageData(idata, 0, 0);

    //         sendSnapshotToServer(patCanvas.toDataURL());

    //         patData = idata;
    //     }
    // };

    // /**
    //  * Redirect the browser to the URL given.
    //  * Used to download the image by passing a dataURL string
    //  */
    // downloadSnapshot(dataURL) {
    //     window.location.href = dataURL;
    // };

    // getVideoData(x, y, w, h) {
    //     var hiddenCanvas = document.createElement('canvas');
    //     hiddenCanvas.width = this._video.width;
    //     hiddenCanvas.height = this._video.height;
    //     var ctx = hiddenCanvas.getContext('2d');
    //     ctx.drawImage(this._video, 0, 0, this._video.width, this._video.height);
    //     return ctx.getImageData(x, y, w, h);
    // };

    // /**
    //  * This function could be used to send the image data
    //  * to a backend server that expects base64 encoded images.
    //  *
    //  * In this example, we simply store it in the scope for display.
    //  */
    // sendSnapshotToServer(imgBase64) {
    //     this.snapshotData = imgBase64;
    // };
}
