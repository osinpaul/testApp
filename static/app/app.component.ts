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
    providers: [EventService]
})
export class AppComponent implements OnInit {
    //типы шаблонов. TemplateRef используется для создания вложенных представлений.
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;


    editedEvent: Event; //для хранения редактируемого события
    events: Array<Event>; // для хранения событий
    isNewRecord: boolean;
    statusMessage: string;

    constructor(private serv: EventService) {
        this.events = new Array<Event>();
    }

    ngOnInit() {
        this.loadEvents();//загрузка записей
    }

        private loadEvents() {
        this.serv.getEvents().subscribe((resp: Response) => {
            this.events = resp.json();
        });
    }
 
    // загружаем один из двух шаблонов
    loadTemplate(event: Event) {
        /*if (this.editedUser && this.editedUser.Id == user.Id) {
            return this.editTemplate;
        } else {*/
            return this.readOnlyTemplate;
        }
    }
  