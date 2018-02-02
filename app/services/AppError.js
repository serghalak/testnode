'use strict';
//
// class AppError extends Error {
//      constructor(httpStatus, message, developerMessage = '') {
//         //super(message);
//         this.name = this.constructor.name;
//         this.message = message;
//         this.developerMessage = developerMessage;
//         this.httpStatus = httpStatus;
//
//         if (typeof Error.captureStackTrace === 'function') {
//             Error.captureStackTrace(this, this.constructor);
//         } else {
//             this.stack = (new Error(message)).stack;
//         }
//      }
// }
//
// export default AppError;
exports = module.exports = {}

function AppError(httpStatus, message, developerMessage = ''){
    Error.call(this,message);
    this.name = "AppError";//this.constructor.name;
    this.message = message;
    this.developerMessage = developerMessage;
    this.httpStatus = httpStatus;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, AppError);
    } else {
        this.stack = (new Error()).stack;
    }
}

AppError.prototype = Object.create(Error.prototype);
//AppError.prototype.constructor = AppError;
exports.appError=AppError;