"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bypass = exports.BYPASS_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.BYPASS_KEY = '__bypass_key__';
function Bypass() {
    return (0, common_1.SetMetadata)(exports.BYPASS_KEY, true);
}
exports.Bypass = Bypass;
//# sourceMappingURL=bypass.decorator.js.map