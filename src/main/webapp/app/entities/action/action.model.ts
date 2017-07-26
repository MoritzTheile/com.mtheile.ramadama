import { BaseEntity } from './../../shared';

export class Action implements BaseEntity {
    constructor(
        public id?: number,
        public ramadamaUserId?: number,
        public stateBeforeId?: number,
        public stateAfterId?: number,
    ) {
    }
}
