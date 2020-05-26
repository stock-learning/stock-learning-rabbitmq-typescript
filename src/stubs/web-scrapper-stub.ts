import { RabbitMQServer } from '../server/rabbitmq-server';
import { Stub } from './stub';

export class WebScrapperStub extends Stub {

    constructor(server: RabbitMQServer) {
        super(server, 'stock-learning-web-scrapper');
    }

    public infomoneyIbovespaLiveUpdate(): boolean {
        return super.send('infomoney-ibovespa-live-update',  {});
    }

    public infomoneyIbovespaInitialLoad() {
        return super.send('infomoney-ibovespa-initial-load',  {});
    }

}
