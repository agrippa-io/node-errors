"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./ErrorAPI"), exports);
__exportStar(require("./constants"), exports);
__exportStar(require("./ErrorBadRequest"), exports);
__exportStar(require("./ErrorForbidden"), exports);
__exportStar(require("./ErrorIncompleteDataModification"), exports);
__exportStar(require("./ErrorInvalidData"), exports);
__exportStar(require("./ErrorInvalidUploadStrategy"), exports);
__exportStar(require("./ErrorJWTWhitelistMissing"), exports);
__exportStar(require("./ErrorMissingArgument"), exports);
__exportStar(require("./ErrorMissingDependency"), exports);
__exportStar(require("./ErrorMissingMongooseHookRegistration"), exports);
__exportStar(require("./ErrorMongoose"), exports);
__exportStar(require("./ErrorNeedsTypeScriptConversion"), exports);
__exportStar(require("./ErrorReadOnly"), exports);
__exportStar(require("./ErrorResourceAlreadyExists"), exports);
__exportStar(require("./ErrorResourceNotFound"), exports);
__exportStar(require("./ErrorServer"), exports);
__exportStar(require("./ErrorUnauthorized"), exports);
