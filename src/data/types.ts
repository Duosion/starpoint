// player
export interface RawAccount {
    id: number,
    app_id: string
    first_login_time: string
    idp_alias: string
    idp_code: string
    idp_id: string
    reg_time: string
    last_login_time: string
    status: string
}

export interface Account {
    id: number
    appId: string
    firstLoginTime: Date
    idpAlias: string
    idpCode: string
    idpId: string
    regTime: Date
    lastLoginTime: Date
    status: string
}

// zat session
export enum SessionType {
    ZAT,
    ZRT
}

export interface RawSession {
    token: string
    expires: string
    type: number
    player_id: number
}

export interface Session {
    token: string
    expires: Date
    type: SessionType
    playerId: number
}