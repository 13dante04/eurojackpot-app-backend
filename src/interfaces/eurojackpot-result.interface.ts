export interface EurojackpotResult {
    date: string;
    mainNumbers: number[];
    secondaryNumbers: number[];
    isTodaysDraw?: boolean;
    drawIsToday: boolean;
    // previousDraw?: EurojackpotResult;
}