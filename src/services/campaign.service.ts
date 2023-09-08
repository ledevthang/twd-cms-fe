import AXIOS from "./axios";
import { ICampaignParams, ICampaignResponse } from "@/types/campaign";

export function getCampaignList(param: ICampaignParams): Promise<ICampaignResponse> {
    return AXIOS.get(`campaigns?page=${param.page}&size=${param.size}`);
  }
  