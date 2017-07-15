/**
 * Created by luizsilva on 7/14/17.
 */
export interface StandardAccountInfo {
  companyNbr: number;
  ownerLevel1?: any;
  ownerLevel2?: any;
  ownerLevel3?: any;
  channelCd?: any;
  accountNbr: string;
  accountTypeCd: string;
  accountName: string;
  accountStatusCd: string;
  accountStatusReasonCd?: any;
  currencyCd: string;
}
