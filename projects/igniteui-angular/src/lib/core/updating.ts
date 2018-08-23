export class IgxUpdatingAPIService {
    protected buffer: Map<any, any> = new Map<any, any>();

    public add(cellID, cellInfo) {
        this.buffer.set(cellID, cellInfo);
    }

    public get() {
        return this.buffer;
    }

    /*public submit() {
        this.buffer.clear();
    }*/

    public clear() {
        this.buffer.clear();
    }

    public isEmpty() {
        return this.buffer.size === 0;
    }

    public first() {
        return this.buffer.entries().next().value;
    }
}
