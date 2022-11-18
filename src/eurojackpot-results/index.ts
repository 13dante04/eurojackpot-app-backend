
import fetch from 'node-fetch';
import * as cheerio from 'cheerio'
import { EurojackpotResult } from '../interfaces/eurojackpot-result.interface';
import { nextFriday, nextTuesday, previousFriday, previousTuesday, isSameDay, addDays, isTuesday, isFriday } from 'date-fns';
const EUROJACKPOT_RESULT_SITE = 'https://www.eurojackpot.org/en/results';

export async function getWebpageContent(url: string): Promise<string> {
        try {
            const response = await fetch(url);
            return await response.text();
        } catch (error) {
            console.error('Error scraping webpage: ' + url);
            console.error(error);
            return null;
        }
}

export function getResultFromPage(page: string, date: Date): EurojackpotResult {
    try {
        let $page = cheerio.load(page); 
        try {
            let mainNumbersResult = $page('main  ul.results li.lottery-ball:not(.extra)').toArray().map(x => $page(x).text());
            let extraNumbersResult = $page('main ul.results li.lottery-ball.extra').toArray().map(x => $page(x).text());

            let result: EurojackpotResult = {
                date: formatDate(date),
                mainNumbers: mainNumbersResult.map(x => parseInt(x)),
                secondaryNumbers: extraNumbersResult.map(x => parseInt(x)),
                drawIsToday: isFriday(new Date()) || isTuesday(new Date()),
                isTodaysDraw: isSameDay(date, new Date()),
                
            } 
            return result;
        } catch(error) {
            console.error('Error parsing page');
            console.error(error);
        }
    } catch(error) {
        console.error('Error getting numbers div');
        console.error(error);
    }
}


export async function getResults(): Promise<EurojackpotResult> {
    if(isTuesday(new Date()) || isFriday(new Date())) {
        let drawUrl = `${EUROJACKPOT_RESULT_SITE}/${formatDate(new Date())}`;
        let page = await getWebpageContent(drawUrl);
        let pageResult: EurojackpotResult | undefined;
        if(page) {
            pageResult = getResultFromPage(page, new Date());
            if(!pageResult?.mainNumbers.length) {
                return await getPreviousDrawResults();
            } else {
                return pageResult;
            }
        }
    } else {
        return await getPreviousDrawResults();
    }
}
async function getPreviousDrawResults(): Promise<EurojackpotResult> {
    let previousDrawDate = previousTuesdayOrFriday();
    let previousDrawUrl = `${EUROJACKPOT_RESULT_SITE}/${formatDate(previousDrawDate)}`;
    let previousDrawPage = await getWebpageContent(previousDrawUrl);
    let previousDrawResult = getResultFromPage(previousDrawPage, previousDrawDate);
    return previousDrawResult;
}



function previousTuesdayOrFriday(): Date {
    let today = new Date();
    let prevTue = previousTuesday(today);
    let prevFri = previousFriday(today);
    let prevDate = prevTue > prevFri ? prevTue : prevFri;
    return prevDate;

}


function formatDate(date: Date): string {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
}