import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Event } from './Event';
import { EventService } from './event.service';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
    selector: 'testApp',
    templateUrl: './app/app.component.html',
    providers: [EventService],
    styleUrls: ['app/app.component.css']
})

export class AppComponent implements OnInit {
    //типы шаблонов. TemplateRef используется для создания вложенных представлений.
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
    @ViewChild('showTimeTemplate') showTimeTemplate: TemplateRef<any>;

    events: Event[] = []; // для хранения событий
    message: string;

    constructor(private serv: EventService) {
        this.events = new Array<Event>();
    }

    ngOnInit() {
        this.loadSortEvents();//загрузка записей
    }

    public loadEvents() {
        this.serv.getEvents()
            .subscribe((resp: Response) => {
                let eventList = resp.json().data;//let не видим за пределами?
                for (let index in eventList) {
                    console.log('evlist: ', eventList[index].shedMsg);
                    let event = eventList[index];
                    this.events.push({ entryId: event.entryId, shedMsg: event.shedMsg, shedTime: event.shedTime });
                }
            });

    }

    public loadSortEvents() {
        this.serv.getEvents()
            .subscribe((resp: Response) => {
                let eventList = resp.json().data;//let не видим за пределами?
                for (let index in eventList) {
                    console.log('evlist: ', eventList[index].shedMsg);
                    let event = eventList[index];
                    this.events.push({ entryId: event.entryId, shedMsg: event.shedMsg, shedTime: '2000-01-01T'+event.shedTime+':00.000Z'});
                }
            });

    }


    // загружаем один из двух шаблонов
    loadTemplate(event: Event) {
        /*if (this.editedUser && this.editedUser.Id == user.Id) {
            return this.editTemplate;
        } else {*/
        return this.readOnlyTemplate;
    }

    timeTemplate(event: Event) {
        return this.showTimeTemplate;
    }
}