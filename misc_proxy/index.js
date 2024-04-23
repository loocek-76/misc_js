import { BrokerBase } from './BrokerBase.js';
import neverFail from './NeverFail.js';
import auditObject from './AuditObject.js';

const addTestApi = (broker) => {
  // api.print = (...args) => { console.log('print', args); };
  // api.add = (a, b) => a + b;
  broker.registerApiHandler('print', (...args) => { console.log('print', args); });
  broker.registerApiHandler('add', (a, b) => { return a + b; });
}


const registerModule = (moduleName) => {
  const broker = new BrokerBase({ moduleName });
  const api = broker.api.vendor.module;
  addTestApi(broker);

  return broker;
}


const testBroker = (broker, vendor, module) => {
  broker.api[vendor][module].print('jeden ', 'dwa ', 'czy');
  broker.api.vendor.module.print('jeden ', 'dwa ', 'czy');
}



const neverFailTest = () => {

  const testObj = {
    foo: 'bar',
    baz: {
      qux: 10,
      name: 'yoyo'
    }
  };
  return neverFail(testObj);
}

// const broker = registerModule('test broker module');
// testBroker(broker);
  
const auditObjectTest = () => {
  const audited = auditObject({});
  audited.firstName = 'First Name';
  audited.lastName = 'Last Name';
  console.log(audited.history);
};


function main() {
  const testObj = neverFailTest();

  console.log(testObj.dummy.not.existing.property);

  auditObjectTest();
}


main();

