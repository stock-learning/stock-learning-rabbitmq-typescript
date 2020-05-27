import { RabbitMQServer } from '../server/rabbitmq-server';
import { Stub } from './stub';

export class WebScrapperStub extends Stub {

    constructor(server: RabbitMQServer) {
        super(server, 'stock-learning-web-scrapper');
    }

    public infomoneyIbovespaCompanyData(): boolean {
        return super.send('infomoney-ibovespa-company-data',  {});
    }

    public infomoneyIbovespaLiveUpdate(): boolean {
        return super.send('infomoney-ibovespa-live-update',  {});
    }

    public infomoneyIbovespaHistoricData(): boolean {
        return super.send('infomoney-ibovespa-historic-data',  {});
    }

}
