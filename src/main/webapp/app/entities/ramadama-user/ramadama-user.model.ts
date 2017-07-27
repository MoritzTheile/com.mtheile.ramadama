import { BaseEntity } from './../../shared';

export class RamadamaUser implements BaseEntity {
    constructor(
        public id?: number,
        public actions?: BaseEntity[],
    ) {
    }
}
