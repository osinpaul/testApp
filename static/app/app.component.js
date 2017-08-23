"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Event_1 = require("./Event");
var event_service_1 = require("./event.service");
require("rxjs/Rx");
var AppComponent = (function () {
    function AppComponent(serv) {
        this.serv = serv;
        this.title = 'Shedule service: ';
        this.events = []; // для хранения событий
        this.events = new Array();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadEvents(); //загрузка записей
    };
    AppComponent.prototype.loadEvents = function () {
        var _this = this;
        this.serv.getEvents()
            .subscribe(function (resp) {
            var eventList = resp.json().data; //let не видим за пределами?
            for (var index in eventList) {
                console.log('evlist: ', eventList[index].shedMsg);
                var event_1 = eventList[index];
                _this.events.push({ entryId: event_1.entryId, shedMsg: event_1.shedMsg, shedTime: event_1.shedTime });
            }
        });
    };
    AppComponent.prototype.addEvent = function (event) {
        this.newEvent = new Event_1.EventAdd(event.shedMsg, event.shedTime);
        console.log('NEW! event.shedMsg: ' + event.shedMsg + 'event.shedTime: ' + event.shedTime);
    };
    AppComponent.prototype.deleteEvent = function (event) {
        this.newEvent = new Event_1.EventAdd(event.shedMsg, event.shedTime);
        this.serv.deleteEvent();
    };
    // загружаем один из двух шаблонов
    AppComponent.prototype.loadTemplate = function (event) {
        return this.readOnlyTemplate;
    };
    AppComponent.prototype.timeTemplate = function (event) {
        return this.showTimeTemplate;
    };
    return AppComponent;
}());
__decorate([
    core_1.ViewChild('readOnlyTemplate'),
    __metadata("design:type", core_1.TemplateRef)
], AppComponent.prototype, "readOnlyTemplate", void 0);
__decorate([
    core_1.ViewChild('showTimeTemplate'),
    __metadata("design:type", core_1.TemplateRef)
], AppComponent.prototype, "showTimeTemplate", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'testApp',
        templateUrl: './app/app.component.html',
        providers: [event_service_1.EventService],
        styleUrls: ['app/app.component.css'],
    }),
    __metadata("design:paramtypes", [event_service_1.EventService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map