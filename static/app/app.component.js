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
var core_2 = require("@angular/core");
var event_service_1 = require("./event.service");
require("rxjs/Rx");
var AppComponent = (function () {
    function AppComponent(serv) {
        this.serv = serv;
        this.events = new Array();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadEvents(); //загрузка записей
    };
    AppComponent.prototype.loadEvents = function () {
        var _this = this;
        this.serv.getEvents().subscribe(function (resp) {
            _this.events = resp.json();
        });
    };
    // загружаем один из двух шаблонов
    AppComponent.prototype.loadTemplate = function (event) {
        /*if (this.editedUser && this.editedUser.Id == user.Id) {
            return this.editTemplate;
        } else {*/
        return this.readOnlyTemplate;
    };
    return AppComponent;
}());
__decorate([
    core_1.ViewChild('readOnlyTemplate'),
    __metadata("design:type", core_1.TemplateRef)
], AppComponent.prototype, "readOnlyTemplate", void 0);
AppComponent = __decorate([
    core_2.Component({
        selector: 'testApp',
        templateUrl: './app/app.component.html',
        providers: [event_service_1.EventService]
    }),
    __metadata("design:paramtypes", [event_service_1.EventService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map