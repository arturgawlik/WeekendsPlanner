export class WikiInfoResult {
    constructor(
        public pageId?: number,
        public title?: string,
        public fullurl?: string,
        public lat?: number,
        public lon?: number,
        public description?: string,
        public imageUrl?: string
    ) {
    }
}