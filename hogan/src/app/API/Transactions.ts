import XStatus = API.Client.XStatus;
import {StandardAccountInfo} from "./StandardAccountInfo";
import {FinancialInfo} from "./FinancialInfo";
import {TransactionInfo} from "./TransactionInfo";
/**
 * Created by luizsilva on 7/14/17.
 */
export interface Transactions {
  xStatus: XStatus;
  limit: number;
  offset: string;
  standardAccountInfo: StandardAccountInfo;
  financialInfo: FinancialInfo;
  transactionInfo: TransactionInfo[];
}
