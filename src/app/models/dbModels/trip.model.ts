export class Trip {

    constructor(
        public id?: string,
        public uId?: string,
        public name?: string,
        public place?: string,
        public date?: number,
        public notes?: string,
        public minTemp?: string,
        public maxTemp?: string,
        public lat?: number,
        public lng?: number,
        public weatherType?: string
    ) {
    }

}
