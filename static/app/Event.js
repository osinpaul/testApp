"use strict";
//описываем используемые данные
var Event = (function () {
    function Event(entryId, shedMsg, shedTime) {
        this.entryId = entryId;
        this.shedMsg = shedMsg;
        this.shedTime = shedTime;
    }
    return Event;
}());
exports.Event = Event;
//представляет запись в расписании и содержит 
//3 общедоступных поля: entryId, shedMsg, shedTime 
//# sourceMappingURL=Event.js.map