import { TemplateRef, ViewChild , Component, OnInit, Pipe, PipeTransform  } from '@angular/core';
import { Event, EventAdd } from './Event';
import { EventService } from './event.service';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
    selector: 'testApp',
    templateUrl: './app/app.component.html',
    providers: [EventService],
    styleUrls: ['app/app.component.css'],
})

export class AppComponent implements OnInit {
    //типы шаблонов. TemplateRef используется для создания вложенных представлений.
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
    @ViewChild('showTimeTemplate') showTimeTemplate: TemplateRef<any>;

    title: string = 'Shedule service: ';
    events: Event[] = []; // для хранения событий
    message: string;//для вывода статуса
    newEvent: EventAdd;

    constructor(private serv: EventService) {
        this.events = new Array<Event>();
    }

    ngOnInit() {
        this.loadEvents();//загрузка записей
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
    
    addEvent(event: EventAdd){
        this.newEvent = new EventAdd (event.shedMsg, event.shedTime);
        console.log('NEW! event.shedMsg: '+ event.shedMsg +'event.shedTime: '+ event.shedTime);
    }

    deleteEvent(event: EventAdd){
        this.newEvent = new EventAdd (event.shedMsg, event.shedTime);
        this.serv.deleteEvent()
    }


    // загружаем один из двух шаблонов
    loadTemplate(event: Event) {
        return this.readOnlyTemplate;
    }

    timeTemplate(event: Event) {
        return this.showTimeTemplate;
    }
}