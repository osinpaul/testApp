//описываем используемые данные
export class Event {
    constructor(
        public entryId: string,
        public shedMsg: string,
        public shedTime: string) { }
}

//представляет запись в расписании и содержит 
//3 общедоступных поля: entryId, shedMsg, shedTime