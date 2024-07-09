import { Types } from "mongoose";

export interface Character {
  name: string;
  level: number;
  charClass:
    | "Artificer"
    | "Barbarian"
    | "Bard"
    | "Cleric"
    | "Druid"
    | "Fighter"
    | "Monk"
    | "Paladin"
    | "Ranger"
    | "Rogue"
    | "Sorcerer"
    | "Warlock"
    | "Wizard";
  race:
    | "Dragonborn"
    | "Dwarf"
    | "Elf"
    | "Gnome"
    | "Half-Elf"
    | "Half-Orc"
    | "Halfling"
    | "Human"
    | "Tiefling";
  type: "player" | "npc";
  ownerId: Types.ObjectId;
}
