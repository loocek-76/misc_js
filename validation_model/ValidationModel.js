const validateModel =
  validationModel =>
    model => {
      const failures =
        Reflect
          .ownKeys(validationModel)
          .reduce(
            (acc, key) => {
              const validate = validationModel[key];
              const value = model[key];

              if (!validate(value)) {
                acc.push(key);
              }
              return acc;
            },
            []);
      if (failures.length > 0) {
        throw new Error(`Validation failures: ${failures.join(', ')}`);
      }
      return model;
    };


export default validateModel;