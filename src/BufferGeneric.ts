export class BufferGeneric<Type>{
    bufferSize: number;
    buffer: Type[] = [];

    constructor(bufferSize: number){
        this.bufferSize = bufferSize;
    }

    add(item: Type){
        if(this.buffer.length < this.bufferSize){
            this.buffer.push(item);
        }else{
            this.buffer.shift();
            this.buffer.push(item);
        }
    }

    get(): Type | undefined{
        return this.buffer.shift();
    }

}