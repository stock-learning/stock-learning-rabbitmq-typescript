import { RabbitMQServer } from './../server/rabbitmq-server';
import { Stub } from './stub';

export class ApiScrapperStub extends Stub {

    constructor(server: RabbitMQServer) {
        super(server, 'stock-learning-api-scrapper');
    }

    public fetchCompanyNews(message: any): boolean {
        return super.send('fetch-company-news', message);
    }

}
