import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './blocks/config/prod.config';
import { RamadamaAppModule } from './app.module';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

ProdConfig();

if (module['hot']) {
    module['hot'].accept();
}

platformBrowserDynamic().bootstrapModule(RamadamaAppModule)
    .then((success) => console.log(`Application started`))
    .catch((err) => console.error(err));

const anObserver = <Observer<String>>{
    next: (value: String) => {
        console.log('hello next()' + value);
    },
    complete: () => {
        console.log('hello complete');
    }
};

const anotherObserver = <Observer<String>>{
    next: (value: String) => {
        console.log('hello2 next()' + value);
    },
    complete: () => {
        console.log('hello2 complete');
    }
};

const anObservable = new Observable<String>((callObserver) => {

    let count = 0;

    const interval = setInterval(() => {

        callObserver.next(count++ + '');

    }, 1000);

    return () => {
        clearInterval(interval);
    };

});

const anSubscribtion: Subscription = anObservable.subscribe(anObserver);
const anotherSubscribtion: Subscription = anObservable.subscribe(anotherObserver);
