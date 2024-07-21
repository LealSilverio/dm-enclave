import mongoose from "mongoose";
import { Character } from "../types/character";
import UserModel from "./user";

const CharacterSchema = new mongoose.Schema<Character>({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer. Character level must be an integer.",
    },
  },
  charClass: {
    type: String,
    enum: [
      "Artificer",
      "Barbarian",
      "Bard",
      "Cleric",
      "Druid",
      "Fighter",
      "Monk",
      "Paladin",
      "Ranger",
      "Rogue",
      "Sorcerer",
      "Warlock",
      "Wizard",
    ],
    required: true,
  },
  race: {
    type: String,
    enum: [
      "Dragonborn",
      "Dwarf",
      "Elf",
      "Gnome",
      "Half-Elf",
      "Half-Orc",
      "Halfling",
      "Human",
      "Tiefling",
    ],
    required: true,
  },
  type: {
    type: String,
    enum: ["player", "npc"],
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
});

const CharacterModel = mongoose.model("Character", CharacterSchema);

export default CharacterModel;
