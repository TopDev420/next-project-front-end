/* eslint-disable no-console */
import config from '../config';

type SEVERITY = 'debug' | 'log' | 'warn' | 'error';

const SEVERITY_LEVELS: Record<SEVERITY, number> = {
  debug: 0,
  log: 1,
  warn: 2,
  error: 3,
};

const log = (severity: SEVERITY, ...args: any[]) => {
  const level = SEVERITY_LEVELS[severity];
  const minLevel = SEVERITY_LEVELS[config.LOG_LEVEL as SEVERITY] || 0;
  if (level <= minLevel) {
    return;
  }
  const logFn = console[severity];
  logFn.call(null, ...args);
};

export default {
  debug: (...args: any[]) => log('debug', ...args),
  log: (...args: any[]) => log('log', ...args),
  warn: (...args: any[]) => log('warn', ...args),
  error: (...args: any[]) => log('error', ...args),
};
