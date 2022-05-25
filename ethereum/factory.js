import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x88D589544dFB9C6E54e4d85465449db9AadA6737"
  //"0xd0ffF7D8319a106A34194C0227d22Ff95784Bce7"
);

export default instance;
