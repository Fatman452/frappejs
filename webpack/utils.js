import { existsSync } from 'fs';
import { join, resolve } from 'path';
import { yellow } from 'chalk';
import defaultsDeep from 'lodash/defaultsDeep';
import logger from './logger';

const frappeConf = 'frappe.conf.js';

function getAppDir() {
  let dir = process.cwd();

  if (existsSync(join(dir, frappeConf))) {
    return dir;
  }

  warn = logger('utils', 'red')

  warn();
  warn(`Looks like this is not the root of a FrappeJS project`);
  warn(`Please run this command from a folder which contains ${yellow(frappeConf)} file`);
  warn();
  process.exit(1);
}

function getAppConfig() {
  const defaults = {
    syncModel: false, 
    dev: {
      devServerHost: 'localhost',
      devServerPort: 8000
    }
  }
  let appConfig = {}
  try {
    appConfig = require(resolve(getAppDir(), frappeConf));
  } catch (error) {
    
  }
  return defaultsDeep(defaults, appConfig);
}

function resolveAppDir(...args) {
  return resolve(getAppDir(), ...args);
}

export default {
  getAppDir,
  getAppConfig,
  resolveAppDir
}
