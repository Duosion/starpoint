/**
 * Returns the current server time as a unix epoch.
 * 
 * @returns The unix epoch.
 */
export function getServerTime(): number {
    return Math.floor(new Date().getTime() / 1000)
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