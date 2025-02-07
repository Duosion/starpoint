import { Player } from "../data/types";
import { Delegate } from "./utils";

export const onPlayerRankUp = new Delegate<(newPlayerData: Player, newRank: number) => void>();