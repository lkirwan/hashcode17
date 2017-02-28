export class video {
    public size: number;
    public id: number;

    constructor(id: number, size?: number) {
        this.id = id;
        if (size != undefined) {
            this.size = size;
        }
    }
}