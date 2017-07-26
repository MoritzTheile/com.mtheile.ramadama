import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { RamadamaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RamadamaUserDetailComponent } from '../../../../../../main/webapp/app/entities/ramadama-user/ramadama-user-detail.component';
import { RamadamaUserService } from '../../../../../../main/webapp/app/entities/ramadama-user/ramadama-user.service';
import { RamadamaUser } from '../../../../../../main/webapp/app/entities/ramadama-user/ramadama-user.model';

describe('Component Tests', () => {

    describe('RamadamaUser Management Detail Component', () => {
        let comp: RamadamaUserDetailComponent;
        let fixture: ComponentFixture<RamadamaUserDetailComponent>;
        let service: RamadamaUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RamadamaTestModule],
                declarations: [RamadamaUserDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RamadamaUserService,
                    JhiEventManager
                ]
            }).overrideTemplate(RamadamaUserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RamadamaUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RamadamaUserService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RamadamaUser(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.ramadamaUser).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
