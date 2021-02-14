export const utils = {
  randString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  },

  randInt(min: number, max: number) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}