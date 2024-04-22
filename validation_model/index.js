import validateModel from "./ValidationModel.js";
import transformModel from "./TransformationModel.js";


const isNonEmptyString =
  value => typeof value === 'string';

const isNumber =
  value => Number.isFinite(value);

const validatePersonModel =
  validateModel({
    "firstName": isNonEmptyString,
    "lastName": isNonEmptyString,
    "age": isNumber
  });

const transformPersonModel =
  transformModel({
    fname: (value, model) => model.firstName.trim(),
    lname: (value, model) => model.lastName.trim().toUpperCase(),
    birthdate: (value, model) => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - model.age);
      return date.toDateString();
    }
  });

try {

  const person = validatePersonModel({
    "firstName": "Dave",
    "lastName": "Kuczynski",
    "age": 42
  });

  const transPerson = transformPersonModel(person);
  console.log(transPerson);

} catch (err) {
  console.error(err.message);
}