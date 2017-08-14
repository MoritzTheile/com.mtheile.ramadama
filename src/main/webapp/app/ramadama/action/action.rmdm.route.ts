import { Routes } from '@angular/router';

import { ActionCreateWizardComponent } from './action-create-wizard.rmdm.component';

export const actionPopupRoute: Routes = [
    {
        path: 'action-create-new',
        component: ActionCreateWizardComponent,
        outlet: 'popup'
    }
];
