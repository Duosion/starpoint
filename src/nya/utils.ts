import { SessionType } from "../data/types";
import { getAccountPlayers, getSession, getAccountFromPlayerIdSync, getAccountSessionsOfType } from "../data/wdfpData";

export class ClientError extends Error { }

export const viewer_id_to_player_id = async (viewerId: number) => {
    if (!viewerId) throw new ClientError(`Invalid viewerId.`);
    const viewerIdSession = await getSession(viewerId.toString());
    if (!viewerIdSession) throw new ClientError(`Invalid viewerId.`);
    const playerId = (await getAccountPlayers(viewerIdSession.accountId))[0];
    if (!playerId) throw new ClientError(`No players bound to account.`);
    return playerId;
}

export const player_id_to_vieser_id = async (player_id: number) => {
    const account = await (new Promise<number | undefined>((resolve, reject) => {
        try {
            resolve(getAccountFromPlayerIdSync(player_id)?.id);
        } catch (e) {
            reject(e);
        }
    }));
    if (!account) throw new ClientError(`Invalid player_id.`);
    const viewerIds = await getAccountSessionsOfType(account, SessionType.VIEWER);
    if (!viewerIds[0]) throw new ClientError(`No viewerIds bound to account.`);
    const viewerId = Number.parseInt(viewerIds[0].token);
    if (!viewerId) throw new ClientError(`No viewerIds bound to account.`);
    return viewerId;
}

