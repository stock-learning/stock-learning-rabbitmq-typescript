import { InfomoneyIbovespaLiveUpdateModel } from '../models/infomoney-ibovespa-live-update-model';
import { RabbitMQServer } from '../server/rabbitmq-server';
import { InfomoneyIbovespaHistoricDataModel } from './../models/infomoney-ibovespa-historic-data-model';
import { Stub } from './stub';

export class WebScrapperStub extends Stub {

    constructor(server: RabbitMQServer) {
        super(server, 'stock-learning-web-scrapper');
    }

    public infomoneyIbovespaCompanyData(): boolean {
        return super.send('infomoney-ibovespa-company-data',  {});
    }

    public infomoneyIbovespaLiveUpdate(content: InfomoneyIbovespaLiveUpdateModel): boolean {
        return super.send('infomoney-ibovespa-live-update',  content);
    }

    public infomoneyIbovespaHistoricData(content: InfomoneyIbovespaHistoricDataModel): boolean {
        return super.send('infomoney-ibovespa-historic-data',  content);
    }

}
