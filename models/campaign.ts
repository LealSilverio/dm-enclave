import mongoose from "mongoose";
import { Campaign } from "../types/campaign";

const CampaignSchema = new mongoose.Schema<Campaign>({
  name: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const CampaignModel = mongoose.model("Campaign", CampaignSchema);

export default CampaignModel;
