
class BrokerBase {

  constructor(params) {
    ({
      moduleName: this.moduleName
    } = params);

    this.apiHandlers = new Map();

    this.initProxy();
  }

  initProxy() {
    this.api = new Proxy({}, {

      get: (_, vendorName) => {
        return new Proxy({}, {
          get: (_, moduleName) => {
            return this.getMethodProxy(vendorName, moduleName);
          },

          set: (_, moduleName, api) => {
            if (typeof api !== "object") {
              throw new Error("API must be set to object");
            }

            for (const [methodName, handler] of Object.entries(api)) {
              if (typeof handler !== "function") {
                throw new Error('Handler must be a function');
              }

              this.registerApiHandler(methodName, handler);
            }

            return true;
          }

        });
      },
      set: () => {
        console.warn('Module name and method name are required');
        return false;
      }
    });
  }

  getMethodProxy() {
    return new Proxy({}, {
      get: (_, methodName) => {
        const signature = `${this.moduleName}.${methodName}`;
        if (!this.apiHandlers.has(signature)) {
          throw new Error(`method not found: ${methodName}`);          
        }

        return (...args) => {
          this.apiHandlers.get(signature).messageHandler(args);
        };
      },
    });
  }

  registerApiHandler(messageType, messageHandler) {
    const signature = `${this.moduleName}.${messageType}`;

    if (this.apiHandlers.has(signature)) return false;

    this.apiHandlers.set(signature, {
      relay: false,
      messageHandler
    });
  }
}

export { BrokerBase };