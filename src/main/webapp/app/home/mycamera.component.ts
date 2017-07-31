import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'jhi-mycamera',
    templateUrl: './mycamera.html',

})

export class MyCameraComponent implements AfterViewInit {

    private width = 320;    // We will scale the photo width to this
    private height = 0;     // This will be computed based on the input stream

    private streaming = false;

    private video: HTMLVideoElement;
    private canvas = null;
    private photo = null;
    private startbutton = null;

    constructor(el: ElementRef) {

    }

    public ngAfterViewInit() {

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

            this.video = <HTMLVideoElement>document.getElementById('video');
            this.canvas = document.getElementById('canvas');
            this.photo = document.getElementById('photo');
            this.startbutton = document.getElementById('startbutton');

            navigator.mediaDevices.getUserMedia({ video: {facingMode: 'environment'}, audio: false })
                .then((stream) => {
                    this.video.srcObject = stream;
                    this.video.play();
                })
                .catch((err) => {
                    alert('error: ' + err);
                });

            this.video.addEventListener('canplay', (ev) => {

                if (!this.streaming) {
                    this.height = this.video.videoHeight / (this.video.videoWidth / this.width);

                    this.video.setAttribute('width', String(this.width));
                    this.video.setAttribute('height', String(this.height));
                    this.canvas.setAttribute('width', String(this.width));
                    this.canvas.setAttribute('height', String(this.height));
                    this.streaming = true;

                }

            }, false);

        }

        this.clearphoto();

    }

    clearphoto() {

        const context = this.canvas.getContext('2d');
        context.fillStyle = '#AAA';
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const data = this.canvas.toDataURL('image/png');
        this.photo.setAttribute('src', data);

    }

    public takepicture() {

        const context = this.canvas.getContext('2d');

        if (this.width && this.height) {

            this.canvas.width = this.width;
            this.canvas.height = this.height;
            context.drawImage(this.video, 0, 0, this.width, this.height);

            const data = this.canvas.toDataURL('image/png');
            this.photo.setAttribute('src', data);

        } else {

            this.clearphoto();

        }
    }

}
