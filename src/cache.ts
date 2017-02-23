import { datacenter } from './datacenter';

export class cache extends datacenter {
    public maxsize: number;

    constructor(id: number, maxsize:number) {
        super();
        this.id = id;
        this.maxsize= maxsize;
    }
}