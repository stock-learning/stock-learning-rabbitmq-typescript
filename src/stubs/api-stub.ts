import { RabbitMQServer } from '../server/rabbitmq-server';
import { Stub } from './stub';

export class ApiStub extends Stub {

    constructor(server: RabbitMQServer) {
        super(server, 'stock-learning-api');
    }

    public infomoneyIbovespaLiveUpdate(): boolean {
        return super.send('infomoney-ibovespa-live-update',  {});
    }
    
    public infomoneyIbovespaInitialLoad(): boolean {
        return super.send('infomoney-ibovespa-initial-load',  {});
    }

}
