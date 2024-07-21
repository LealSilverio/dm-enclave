import mongoose from "mongoose";
import { Campaign } from "../types/campaign";
import UserModel from "./user";

const CampaignSchema = new mongoose.Schema<Campaign>({
  name: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
});

const CampaignModel = mongoose.model("Campaign", CampaignSchema);

export default CampaignModel;
