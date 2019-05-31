export class FetchWeatherResult {
    constructor(
        public date?: Date,
        public type?: string,
        public temperatureHigh?: number,
        public temperatureLow?: number
    ) {
    }
}