const rndUpTo =
    maxLen =>
    Math.floor(Math.random() * maxLen) + 1

const randomString =
    maxLen =>
    Math.random().toString(36).substring(2, rndUpTo(maxLen) + 2)
