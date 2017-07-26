import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RamadamaUserComponent } from './ramadama-user.component';
import { RamadamaUserDetailComponent } from './ramadama-user-detail.component';
import { RamadamaUserPopupComponent } from './ramadama-user-dialog.component';
import { RamadamaUserDeletePopupComponent } from './ramadama-user-delete-dialog.component';

import { Principal } from '../../shared';

export const ramadamaUserRoute: Routes = [
    {
        path: 'ramadama-user',
        component: RamadamaUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ramadamaApp.ramadamaUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ramadama-user/:id',
        component: RamadamaUserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ramadamaApp.ramadamaUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ramadamaUserPopupRoute: Routes = [
    {
        path: 'ramadama-user-new',
        component: RamadamaUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ramadamaApp.ramadamaUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ramadama-user/:id/edit',
        component: RamadamaUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ramadamaApp.ramadamaUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ramadama-user/:id/delete',
        component: RamadamaUserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ramadamaApp.ramadamaUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
