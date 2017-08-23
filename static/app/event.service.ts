//Необходим для взаимодействия с сервером.
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers } from '@angular/http';
import { Event, EventAdd } from './Event';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {

    private url = "http://localhost/data/events";
    headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    constructor(private http: Http) { }

    //Интерфейс получения данных с сервера
    getEvents() {
        console.log("Осуществлен GET запрос, GetEvents ", this.url);
        return this.http.
            get(this.url).catch((error: any) => { return Observable.throw(error); });
    }

    //Интерфейс обновления времени (!!!)
    updateEvent(obj: EventAdd) {
        const body = JSON.stringify(obj);//так-то необязательно
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return 1;
    }

    //Интерфейс добавления новой записи в БД
    createEvent(obj: EventAdd, ) {
        const body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        console.log("Осуществлен PUSH запрос, CreateEvent");
        return this.http.post(this.url + '/', body, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); })
    };

    //Интерфейс для удаления записи из БД. На вход shedMsg & shedTime, которые передаются серверу
    deleteEvent(obj: EventAdd) {
        const body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.delete(this.url + '/' + body, {headers: headers})
    }
}
