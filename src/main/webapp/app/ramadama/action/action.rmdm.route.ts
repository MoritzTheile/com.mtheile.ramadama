import { Routes } from '@angular/router';

import { ActionCreateWizardPopupComponent } from './action-create-wizard.rmdm.component';

export const actionPopupRoute: Routes = [
    {
        path: 'action-create-new',
        component: ActionCreateWizardPopupComponent
    }
];
