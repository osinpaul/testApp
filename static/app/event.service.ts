//Необходим для взаимодействия с сервером.
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers } from '@angular/http';
import { Event } from './Event';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {

    private url = "http://localhost/data/events";
    constructor(private http: Http) { }

    getEvents() {
        return this.http.get(this.url);
    }
}
