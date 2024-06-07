/**
 * Returns the current server time as a unix epoch.
 * 
 * @returns The unix epoch.
 */
export function getServerTime(): number {
    return Math.floor(new Date().getTime() / 1000)
}