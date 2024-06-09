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