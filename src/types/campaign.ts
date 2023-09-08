export interface ICampaign {
    id: number;
    title: string;
    description: string;
    localtion: string;
    startAt: Date;
    endAt: Date;
    goal: number;
    currentAmount: number;
    investor: number;
    creatorId: number;
    campaignTags: string[];
    imageUrl: string;
    backgroundUrl: string;
    status:string[]
  }

  export interface ICampaignParams {
    page?: number;
    size?: number;
  }

  export interface ICampaignResponse {
    data: ICampaign[];
    size: number;
    totalElement: number;
    totalPages: number;
  }

