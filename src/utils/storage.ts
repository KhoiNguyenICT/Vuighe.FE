export const storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (e) {
            console.warn('localStorage', e)
        }
    },

    get(key: string) {
        try {
            return JSON.parse(localStorage.getItem(key) || '')
        } catch (e) {
            console.warn('localStorage', e)
        }
    },

    remove(key) {
        localStorage.removeItem(key)
    },

    clear() {
        localStorage.clear()
    },
}
