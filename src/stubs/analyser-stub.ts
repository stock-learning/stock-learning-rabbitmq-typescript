import { RabbitMQServer } from '../server/rabbitmq-server';
import { Stub } from './stub';

export class AnalyserStub extends Stub {

    constructor(server: RabbitMQServer) {
        super(server, 'stock-learning-analyser');
    }

}
