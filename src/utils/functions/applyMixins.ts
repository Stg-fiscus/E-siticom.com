/**
 * Function for applying mixins, from https://www.typescriptlang.org/docs/handbook/mixins.html
 * @param derivedCtor class we're extending with mixins
 * @param constructors the mixins
 */
export function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null),
      );
    });
  });
}
