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


export const bisect = <EL_T, K_T>(arr: EL_T[], find: K_T, key?: (el: EL_T) => K_T, compare?: (a: K_T, b: K_T) => number) => {
    // find the index of the first element in arr that is not less than find
    // if all elements are less than find, return arr.length
    // arr[result] >= find
    if (!compare) compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
    if (!key) key = (el) => el as any as K_T;
    let lo = 0, hi = arr.length;
    while (lo < hi) {
        const mid = lo + hi >>> 1;
        const cmp = compare(key(arr[mid]), find);
        if (cmp < 0) lo = mid + 1;
        else if (cmp > 0) hi = mid;
        else return mid;
    }
    return lo;
}

export class Handles {
    private _nextHandle = 1;
    private _freeHandles: number[] = [];

    public get() {
        if (this._freeHandles.length) {
            return this._freeHandles.pop()!;
        }
        return this._nextHandle++;
    }

    public is_used(handle: number) {
        return 0 < handle && handle < this._nextHandle && !this._freeHandles.includes(handle);
    }

    public free(handle: number) {
        if (!this.is_used(handle)) return false;
        this._freeHandles.push(handle);
        return true;
    }
}

export class Delegate<F extends (...args: any) => any> {
    private _callbacks: { [handle: number]: F } = {};
    private _handles = new Handles();

    public add(callback: F) {
        const handle = this._handles.get();
        this._callbacks[handle] = callback;
        return handle;
    }

    public remove(handle: number) {
        if (!this._handles.free(handle)) return false;
        delete this._callbacks[handle];
        return true;
    }

    public call(...args: Parameters<F>) {
        for (const callback of Object.values(this._callbacks)) {
            callback(...args);
        }
    }

    public callR(ret: (result: ReturnType<F>) => void, ...args: Parameters<F>) {
        for (const callback of Object.values(this._callbacks)) {
            ret(callback(...args));
        }
    }

    public aCall(...args: Parameters<F>) {
        const promises = Object.values(this._callbacks).map(callback => callback(...args));
        return Promise.all(promises);
    }
}
