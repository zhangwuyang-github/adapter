"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessException = void 0;
const common_1 = require("@nestjs/common");
class BusinessException extends common_1.HttpException {
    constructor(error, code = 403) {
        super(common_1.HttpException.createBody({
            code,
            message: error,
        }), common_1.HttpStatus.OK);
        this.errorCode = code;
    }
    getErrorCode() {
        return this.errorCode;
    }
}
exports.BusinessException = BusinessException;
//# sourceMappingURL=biz.exception.js.map