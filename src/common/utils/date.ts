import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
import * as jDate from 'moment-jalaali';

export const TIMEZONE = 'Asia/Tehran';

export function getGregorianDate(format = 'YYYY-MM-DD', date?: Date) {
  return momentTimezone(date).tz(TIMEZONE).format(format);
}

export function getJalaliDate(date: Date, format = 'jYYYY-jMM-jDD HH:mm') {
  return jDate(date).tz(TIMEZONE).format(format);
}

export function getShiftedIsoDate(
  shiftType: 'add' | 'subtract',
  shiftValue: number,
  shiftUnit:
    | 'years'
    | 'months'
    | 'weeks'
    | 'days'
    | 'hours'
    | 'minutes'
    | 'seconds'
    | 'milliseconds',
  shiftDate?: Date,
) {
  if (shiftType === 'add') {
    return moment(shiftDate).add(shiftValue, shiftUnit).utc().toDate();
  }
  return moment(shiftDate).subtract(shiftValue, shiftUnit).utc().toDate();
}

export function getShiftedJalaliDate(
  shiftType: 'add' | 'subtract',
  shiftValue: number,
  shiftUnit:
    | 'years'
    | 'months'
    | 'weeks'
    | 'days'
    | 'hours'
    | 'minutes'
    | 'seconds'
    | 'milliseconds',
  shiftDate?: Date,
) {
  if (shiftType === 'add') {
    return jDate(shiftDate)
      .add(shiftValue, shiftUnit)
      .format('jYYYY-jMM-jDD HH:mm');
  }
  return jDate(shiftDate)
    .subtract(shiftValue, shiftUnit)
    .format('jYYYY-jMM-jDD HH:mm');
}

export function getIsoDate(date: Date) {
  return moment(date).utc().toDate();
}
