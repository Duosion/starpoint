import { randomInt } from "crypto"

/**
 * Returns the current server time as a unix epoch.
 * 
 * @param data An optional date; The date to get the time of.
 * @returns The unix epoch.
 */
export function getServerTime(date: Date = new Date()): number {
    return Math.floor(date.getTime() / 1000)
}

/**
 * Generates an IdpAlias to identify a particular device.
 * 
 * @param appId 
 * @param idpId 
 * @param serialNo 
 * @returns The generated IdpAlias
 */
export function generateIdpAlias(
    appId: string,
    deviceId: string,
    serialNo: string
): string {
    return `${appId}:${deviceId}:${serialNo}`
}

/**
 * Generates a random viewer ID using the crypto library.
 * 
 * @returns A number between 100,000,000 and 999,999,999
 */
export function generateViewerId(): number {
    return randomInt(100000000, 999999999)
}