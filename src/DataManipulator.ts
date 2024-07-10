import { ServerRespond } from './DataStreamer';

export interface Row {
  price_def: number,   
  price_abc: number,
  ratio: number,      
  lower_bound: number,  
  upper_bound: number,  
  trigger_alert: number | undefined,
  timestamp: Date,  
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const upperBound = 1 + 0.05;
    const ratio = priceABC / priceDEF;
    const lowerBound = 1 - 0.05;
    return {
      ratio,
      price_abc: priceABC,
      price_def: priceDEF,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
        serverRespond[0].timestamp : serverRespond[1].timestamp,
      lower_bound: lowerBound,
      upper_bound: upperBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
       };
      };
    }

