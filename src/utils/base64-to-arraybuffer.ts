export const base64ToArrayBuffer = (base64: string) => {
  return Uint8Array.from(globalThis.atob(base64), (b) => b.charCodeAt(0))
}
