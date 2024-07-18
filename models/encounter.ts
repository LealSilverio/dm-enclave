import mongoose from "mongoose";
import { Encounter } from "../types/encounter";

const EncounterSchema = new mongoose.Schema<Encounter>({
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

const EncounterModel = mongoose.model("Encounter", EncounterSchema);

export default EncounterModel;
