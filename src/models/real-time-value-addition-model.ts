import { StockModel } from './stock-model';

export interface RealTimeValueAdditionModel {
    isPredict: number;
    stocks: StockModel[];
}
