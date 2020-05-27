import { RabbitMQServer } from './../server/rabbitmq-server';
import { Stub } from './stub';

export class ApiStub extends Stub {

    constructor(server: RabbitMQServer) {
        super(server, 'stock-learning-api');
    }

    // public infomoneyIbovespaLiveUpdate(): boolean {
    //     return super.send('infomoney-ibovespa-live-update',  {});
    // }
    
    // public infomoneyIbovespaHistoricData(message: IStockDataCollectionModel): boolean {
    //     return super.send('infomoney-ibovespa-historic-data',  {});
    // }

}
