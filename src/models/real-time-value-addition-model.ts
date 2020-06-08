import { StockModel } from './stock-model';

export interface RealTimeValueAdditionModel {
    isPredict: boolean;
    stocks: StockModel[];
}
