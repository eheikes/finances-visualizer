declare namespace jasmine {
  interface Matchers<T> {
    // Add our custom matchers to the definition.
    toBeTransaction(): boolean
  }
}
