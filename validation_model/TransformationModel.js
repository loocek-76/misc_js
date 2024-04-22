const transformModel =
  transformationModel =>
    model => {
      return Reflect
        .ownKeys(transformationModel)
        .reduce(
          (acc, key) => {
            const xform = transformationModel[key];
            const sourceValue = model[key];

            Reflect.defineProperty(
              acc,
              key,
              {
                enumerable: true,
                value: xform(sourceValue, model)
              });
            
            return acc;
          }, {});
    };

export default transformModel;