import player_rank_data from "../../assets/player_rank.json";
import { Player } from "../data/types";
import { updatePlayerSync } from "../data/wdfpData";
import { onPlayerRankUp } from "./delegates";
import { bisect } from "./utils";

export const getRankByPt = (rankPoint: number) => {
    const i_rank = bisect(player_rank_data, rankPoint, (el) => el.total_rp);
    return player_rank_data[i_rank >= player_rank_data.length ? player_rank_data.length - 1 : i_rank];
}

export const getRank = (rank: number) => player_rank_data[rank - 1]; // rank is 1-indexed

interface PlayerEx extends Player {
    _modified?: Set<keyof Player>
}

export const modifyPlayer = <K extends keyof Player>(player: Player, name: K, value: Player[K]) => {
    player[name] = value;
    const plex = player as PlayerEx;
    if (!plex._modified) plex._modified = new Set();
    plex._modified.add(name);
}

export const commitPlayer = (player: Player) => {
    const plex = player as PlayerEx;
    if (!plex._modified) return;
    const modified = plex._modified;
    delete plex._modified;
    if (!modified.size) return;
    const param: Partial<Player> & Pick<Player, 'id'> = Object.fromEntries([
        ['id', player.id],
        ...Array.from(modified).map(key => [key, player[key]])
    ]);
    return updatePlayerSync(param);
}

export const givePlayerRankPoint = (playerData: Player, rankPoint: number) => {
    // modify playerData in place
    if (!playerData) throw new Error("Player not found");
    const currentRank = getRankByPt(playerData.rankPoint);
    // playerData.rankPoint += rankPoint
    modifyPlayer(playerData, 'rankPoint', playerData.rankPoint + rankPoint);
    if (currentRank.rank < player_rank_data.length && playerData.rankPoint >= currentRank.total_rp) {
        const nextRank = getRank(currentRank.rank + 1);
        // playerData.stamina = nextRank.stamina;
        modifyPlayer(playerData, 'stamina', nextRank.stamina);
        onPlayerRankUp.call(playerData, nextRank.rank);
    }
    return playerData;
}
