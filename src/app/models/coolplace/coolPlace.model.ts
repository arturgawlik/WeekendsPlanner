export class CoolPlace {
    constructor(
        public name: string,
        public description: string,
        public showMoreAboutPlaceUrl: string,
        public weatherIcon: string,
        public weatherDegrees: number,
        public showMoreAboutWeatherUrl: string
    ) {
    }
}