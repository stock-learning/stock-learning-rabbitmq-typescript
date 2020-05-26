import { RabbitMQServer } from '../server/rabbitmq-server';

export class Stub {

    private _server: RabbitMQServer;
    private _queueName: string;

    constructor(server: RabbitMQServer, queueName: string) {
        this._server = server;
        this._queueName = queueName;
    }

    protected send(primitive: string, content: any): boolean {
        return this._server.sendMessage(this._queueName, primitive, content);
    }

}
