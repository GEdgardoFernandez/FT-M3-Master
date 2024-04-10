'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

class $Promise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError("executor debe ser una function");
    };

    this._handlerGroups = [];
    this._state = 'pending';
    this._value = undefined;
    const resolve = (value) => {
      this._internalResolve(value);
    }
    const reject = (reason) => {
      this._internalReject(reason);
    }
    executor(resolve, reject);
  }
  _internalResolve = (value) => {
    if (this._state !== 'pending') return;
    this._state = 'fulfilled';
    this._value = value;
    this._callHandlers(value);

  };
  _internalReject = (reason) => {
    if (this._state !== 'pending') return;
    this._state = 'rejected';
    this._value = reason;
    this._callHandlers(reason);
  };




  then = (successCb, errorCb) => {
    const handleGroup = {
      successCb: typeof successCb === 'function' ? successCb : null,
      errorCb: typeof errorCb === 'function' ? errorCb : null
    }
    this._handlerGroups.push(handleGroup);
    this._state !== 'pending' && this._callHandlers(this._value);
  }

  catch = (errorCb) => {
    this.then(null, errorCb);
  }
  
  _callHandlers = (value) =>{
    while (this._handlerGroups.length > 0) {
      const currentHandler = this._handlerGroups.shift();
      if(currentHandler.successCb && this._state === 'fulfilled'){
        currentHandler.successCb(value);
    }
    if(currentHandler.errorCb && this._state === 'rejected'){
      currentHandler.errorCb(this._value);
    }
  }


};
}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
