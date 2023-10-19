"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const yaml = require("js-yaml");
const path_1 = require("path");
const _ = require("lodash");
const YAML_COMMON_CONFIG_FILENAME = 'config.yaml';
const filePath = (0, path_1.join)(__dirname, '../config', YAML_COMMON_CONFIG_FILENAME);
const envPath = (0, path_1.join)(__dirname, '../config', `config.${process.env.NODE_ENV || 'dev'}.yaml`);
const commonConfig = yaml.load((0, fs_1.readFileSync)(filePath, 'utf8'));
const envConfig = yaml.load((0, fs_1.readFileSync)(envPath, 'utf8'));
exports.default = () => {
    return _.merge(commonConfig, envConfig);
};
//# sourceMappingURL=configuration.js.map