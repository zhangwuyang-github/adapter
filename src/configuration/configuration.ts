import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as _ from 'lodash';
import { Configuration } from './configuration.interface';

const YAML_COMMON_CONFIG_FILENAME = 'config.yaml';

const filePath = join(__dirname, '../../config', YAML_COMMON_CONFIG_FILENAME);

const envPath = join(
  __dirname,
  '../../config',
  `config.${process.env.NODE_ENV || 'dev'}.yaml`,
);

const commonConfig = yaml.load(readFileSync(filePath, 'utf8'));

const envConfig = yaml.load(readFileSync(envPath, 'utf8'));

// 因为ConfigModule有一个load方法->函数
export default () => {
  return _.merge(commonConfig, envConfig) as Configuration;
};
