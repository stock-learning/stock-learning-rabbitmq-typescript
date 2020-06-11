import { RabbitMQServer } from './../server/rabbitmq-server';
import { Stub } from './stub';

export class ApiStub extends Stub {

    constructor(server: RabbitMQServer) {
        super(server, 'stock-learning-api');
    }

    public companyNews(message: any): boolean {
        return super.send('company-news', message);
    }

    public getDailyCompanies() {
        super.send('get-daily-companies',  {});
    }

    public getAllCompanies() {
        super.send('get-all-companies',  {});
    }

    public infomoneyIbovespaCompanyData(message: any): boolean {
        return super.send('infomoney-ibovespa-company-data',  {});
    }

    public infomoneyIbovespaHistoricData(message: any): boolean {
        return super.send('infomoney-ibovespa-historic-data',  {});
    }

    public infomoneyIbovespaLiveUpdate(): boolean {
        return super.send('infomoney-ibovespa-live-update',  {});
    }

}
