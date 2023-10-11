/** Logger which outputs to the browser console */

const NO_OP = (message, ...optionalParams) => {};

export const LogLevelOptions = [
  {
    key: 'info',
    label: 'Information',
  },
  {
    key: 'warn',
    label: 'Warning',
  },
  {
    key: 'error',
    label: 'Error',
  },
];

export class Logger {
  log;
  warn;
  error;
  level;

  constructor(options) {
    const { level } = options || {};

    this.error = console.error.bind(console);

    this.set(level);
  }

  set = (level) => {
    this.level = level;
    if (level === 'error') {
      this.warn = NO_OP;
      this.log = NO_OP;

      return;
    }

    this.warn = console.warn.bind(console);

    if (level === 'warn') {
      this.log = NO_OP;

      return;
    }

    this.log = console.log.bind(console);
  };

  setLogLevel = (level) => {
    if (this.level !== undefined) {
      this.log('Setting loglevel from ' + this.level + ' to ' + level);
    }

    this.set(level);
  };
}

export const logger = new Logger('info');

export const setLogger = ({ level }) => {
  logger.setLogLevel(level);
};
