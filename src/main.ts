import isMatch from 'date-fns/isMatch';
import isDate from 'date-fns/isDate';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isAfter';
import isValid from 'date-fns/isValid';
import parse from 'date-fns/parse';

import type {
  PluginValueType,
  PluginContextType,
} from 'just-validate/dist/modules/interfaces';

interface ConfigInterface {
  format?: string;
  isAfter?: string | Date;
  isBefore?: string | Date;
}

type KeysEnum<T> = { [P in keyof Required<T>]: boolean };

const getParsedDate = (
  value: string,
  format?: string
): Date | typeof NaN | null => {
  return format ? parse(value, format, new Date()) : new Date(value);
};

const getComparedDate = (
  sourceDate?: Date | typeof NaN | null,
  configValue?: string | Date,
  format?: string
): Date | null => {
  let comparedDate;
  if (isDate(configValue)) {
    comparedDate = configValue as Date;
  } else if (typeof configValue === 'string') {
    comparedDate = getParsedDate(configValue, format);
  }

  if (!isValid(comparedDate)) {
    console.error(
      'isBefore/isAfter fields should be a Date or a valid date string! The result will be always invalid'
    );

    return null;
  }

  if (!isValid(sourceDate)) {
    console.error(
      'It is impossible convert value to the valid Date. Dates should be in the same format as defined in format field. The result will be always invalid'
    );

    return null;
  }

  return comparedDate as Date;
};

const checkIsBefore = (
  configValue: string | Date,
  sourceDate?: Date | typeof NaN | null,
  format?: string
) => {
  const comparedDate = getComparedDate(sourceDate, configValue, format);
  if (comparedDate === null) {
    return false;
  }

  return isBefore(comparedDate, sourceDate as Date);
};

const checkIsAfter = (
  configValue: string | Date,
  sourceDate?: Date | typeof NaN | null,
  format?: string
) => {
  const comparedDate = getComparedDate(sourceDate, configValue, format);
  if (comparedDate === null) {
    return false;
  }

  return isAfter(sourceDate as Date, comparedDate);
};

const pluginDate =
  (func: (fields: PluginContextType) => ConfigInterface) =>
  (value: PluginValueType, fields: PluginContextType) => {
    const config = func(fields);
    const valid: KeysEnum<ConfigInterface> = {
      format: true,
      isAfter: true,
      isBefore: true,
    };

    if (typeof value !== 'string') {
      console.error(
        'Value should be a string! The result will be always invalid'
      );

      return false;
    }

    if (config.format !== undefined) {
      if (typeof config.format !== 'string') {
        console.error(
          'Format field should be a string! The result will be always invalid'
        );
        valid.format = false;
      } else {
        valid.format = isMatch(value, config.format);
      }
    }

    const sourceDate = getParsedDate(value, config.format);

    if (config.isBefore !== undefined) {
      valid.isBefore = checkIsBefore(
        config.isBefore,
        sourceDate,
        config.format
      );
    }

    if (config.isAfter !== undefined) {
      valid.isAfter = checkIsAfter(config.isAfter, sourceDate, config.format);
    }

    return Object.values(valid).every((item) => item);
  };

export default pluginDate;
