import { Channel, connect as connectToRabbitMQ, Message } from 'amqplib/callback_api';
import { WebScrapperStub } from '../stubs/web-scrapper-stub';
import { AnalyserStub } from './../stubs/analyser-stub';
import { ApiStub } from './../stubs/api-stub';
import { ConsumerMap } from './consumer-map';


export class RabbitMQServer {

    private static _instance: RabbitMQServer;

    public static createServer(amqpConnectionString: string): RabbitMQServer {
        this._instance = new RabbitMQServer(amqpConnectionString);
        return this._instance;
    }

    public static getInstance(): RabbitMQServer {
        if (!this._instance) {
            throw Error('RabbitMQ server not initialized');
        }
        return this._instance;
    }

    private _channel: Channel | undefined;
    private _consumerMap: ConsumerMap;
    private _amqpConnectionString: string;
    private _analyserStub: AnalyserStub;
    private _apiStub: ApiStub;
    private _webScrapperStub: WebScrapperStub;

    private constructor(amqpConnectionString: string) {
        this._amqpConnectionString = amqpConnectionString;
        this._consumerMap = new ConsumerMap();
        this._analyserStub = new AnalyserStub(this);
        this._apiStub = new ApiStub(this);
        this._webScrapperStub = new WebScrapperStub(this);
    }

    public usingConsumers(consumerMap: ConsumerMap): RabbitMQServer {
        this._consumerMap = consumerMap;
        return this;
    }

    public listenToQueue(queueName: string): Promise<Channel> {
        return new Promise((resolve, reject) => {
            if (!this._amqpConnectionString) {
                reject(new Error('RABBITMQ_CONNECTION_STRING not defined'));
            } else {
                connectToRabbitMQ(this._amqpConnectionString || '', (err0, conn) => {
                    if (err0) {
                        reject(err0);
                    } else {
                        conn.createChannel((err1, channel) => {
                            if (err1) {
                                reject(err1);
                            } else {
                                this._channel = channel;
                                this._channel.assertQueue(queueName, { durable: false });
                                this._channel.consume(queueName, (msg: Message | null) => {
                                    const message = JSON.parse(msg?.content?.toString() || '');
                                    if (message?.primitive && message?.content && !!this._consumerMap.has(message?.primitive)) {
                                        console.info(`Message being handled ${message?.primitive}.`);
                                        this._consumerMap.get(message?.primitive).consume(message?.content);
                                    } else {
                                        console.warn(`Cannot handle message\nconsumers: ${JSON.stringify(this._consumerMap.toString())}\nmessage: ${JSON.stringify(message)}`);
                                    }
                                }, {
                                    noAck: true
                                });
                                resolve(channel);
                            }
                        })
                    }
                });
            }
        });
    }

    public sendMessage(queue: string, primitive: string, content: any): boolean {
        return this._channel?.sendToQueue(queue, Buffer.from(JSON.stringify({ primitive: primitive, content: content }))) || false;
    }

    public getAnalyserStub(): AnalyserStub {
        return this._analyserStub;
    }

    public getApiStub(): ApiStub {
        return this._apiStub;
    }

    public getWebScrapperStub(): WebScrapperStub {
        return this._webScrapperStub;
    }

}
