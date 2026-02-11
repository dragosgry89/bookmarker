import { Injectable } from '@angular/core';

const MS_IN_A_DAY = 24 * 3600 * 1000;

@Injectable({
  providedIn: 'root',
})
export class DateUtilsService {
  /**
   * Receives a timestamp as a date-time string.
   * Returns difference in days commpared to today.
   * Examples:
   * If timestamp if from today, difference will be < 1
   * If timestamp is from yesterday, difference will be > 1, but < 2 etc.
   * 
   * 
   * @param timeStamp 
   * @returns 
   */
  public diffAgainstToday(timeStamp?: string) {
    const timeStampValue = this.getUnixTime(timeStamp);
    const todayValue = this.getUnixTime();

    return this.getDiffInDays(todayValue, timeStampValue);
  }

  private getUnixTime(timeStamp?: string) {
    return timeStamp ? 
      (new Date(timeStamp)).getTime() :
      (new Date()).getTime();
  }

  private getDiffInDays(unixTimeA: number, unixTimeB: number) {
    return (unixTimeA - unixTimeB) / MS_IN_A_DAY;
  }
}
