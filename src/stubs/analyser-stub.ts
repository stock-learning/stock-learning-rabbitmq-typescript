import { RabbitMQServer } from '../server/rabbitmq-server';
import { Stub } from './stub';
import { RealTimeValueAdditionModel } from '../models/real-time-value-addition-model';

export class AnalyserStub extends Stub {

    constructor(server: RabbitMQServer) {
        super(server, 'stock-learning-analyser');
    }

    public dailyPredictionStartupHandler() {
        super.send('daily-prediction-startup-handler',  {});
    }

    public dailyPredictionClosingHandler() {
        super.send('daily-prediction-closing-handler',  {});
    }

    public realTimeValueAdditionHandler(content: RealTimeValueAdditionModel) {
        super.send('real-time-value-addition-handler',  content);
    }

}
