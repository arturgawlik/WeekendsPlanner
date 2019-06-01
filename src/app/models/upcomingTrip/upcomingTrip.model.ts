// export class UpcomingTrip {
//     name: string;
//     degrees: number;
//     icon: string;
//}
export class UpcomingTrip {
    
    constructor(
        public name?: string,
        public minTemp?: number,
        public maxTemp?: number,
        public weatherType?: string,
        public date?: number
    ) {
    }

}
