import { IConsumer } from './iconsumer';

export class ConsumerMap {

    private _consumers: Map<string, IConsumer<any>>;

    constructor() {
        this._consumers = new Map();
    }

    public static builder(): ConsumerMapBuilder {
        return new ConsumerMapBuilder((instance: ConsumerMap, consumers: Map<string, IConsumer<any>>) => instance._consumers = consumers);
    }

    public get(consumerName: string): IConsumer<any> {
        return this._consumers.get(consumerName) || { consumerName: consumerName, consume: () => console.warn(`${consumerName} not implemented`) };
    }

    public has(consumerName: string): boolean {
        return this._consumers.has(consumerName);
    }

}

class ConsumerMapBuilder {

    private _consumers: Map<string, IConsumer<any>>;
    private _setInternalMapFunction: (consumerMap: ConsumerMap, consumers: Map<string, IConsumer<any>>) => void;

    constructor(_setInternalMapFunction: (consumerMap: ConsumerMap, consumers: Map<string, IConsumer<any>>) => void) {
        this._consumers = new Map();
        this._setInternalMapFunction = _setInternalMapFunction;
    }

    public register(consumer: IConsumer<any>): ConsumerMapBuilder {
        this._consumers.set(consumer.consumerName, consumer);
        return this;
    }

    public build(): ConsumerMap {
        const consumerMap: ConsumerMap = new ConsumerMap();
        this._setInternalMapFunction(consumerMap, this._consumers);
        return consumerMap;
    }

}
