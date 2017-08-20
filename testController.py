import os
import rethinkdb as r
from rethinkdb.errors import RqlRuntimeError, RqlDriverError
import falcon
import json

RDB_HOST = os.environ.get('RDB_HOST') or 'localhost'
RDB_PORT = os.environ.get('RDB_PORT') or 28015

PROJECT_DB = 'shedule'
PROJECT_TABLE = 'events'

db_connection = r.connect(RDB_HOST, RDB_PORT)

def dbSetup():
    print(PROJECT_DB, db_connection)
    try:
        r.db_create(PROJECT_DB).run(db_connection)
        print('Настройка подключения завершена \n')
    except RqlRuntimeError:
        try:
            r.db(PROJECT_DB).table_create(PROJECT_TABLE).run(db_connection)
            print('Таблица создана. Попытка подключения. \n')
        except:
            print('Таблица существует. Действий не требуется. \n')


class eventRes:
    #Обрабатываем GET-запрос
    def on_get(self, req, resp):
        print ('Получен запрос: ', id, '\n')
        if req.get_param("id"):
            result = {'single': r.db(PROJECT_DB).table(PROJECT_TABLE).get(req.get_param("id")).run(db_connection)}
        else:
            eventCursor = r.db(PROJECT_DB).table(PROJECT_TABLE).run(db_connection)
            result = {'multiply': [i for i in eventCursor]}
        print('Результат выполнения GET запроса: ', result, '\n')
        resp.body = json.dumps(result)

    #Обрабатываем POST-запрос
    def on_post(self, req, resp):
        try:
            raw_json = req.stream.read().decode('utf-8')
            print('Получен  POST запрос: ', raw_json, '\n')

        except Exception as ex:
            raise falcon.HTTPError(falcon.HTTP_400,
                                   'Error',
                                   ex.message)
        try:
            result = json.loads(raw_json, encoding='utf-8')
            eventCursor = r.db(PROJECT_DB).table(PROJECT_TABLE).insert({'shedMsg': result['shedMsg'], 'shedTime': result['shedTime']}).run(db_connection)
            print('Результат выполнения POST запроса: ', eventCursor, '\n')
            resp.body = 'inserted %s' % eventCursor
        except ValueError:
            raise falcon.HTTPError(falcon.HTTP_400,
                                   'Invalid JSON',
                                   'Could not decode the request body. The '
                                   'JSON was incorrect.')

    #Обрабатываем DELETE-запрос
    def on_delete(self, req, resp):
        try:
            raw_json = req.stream.read().decode('utf-8')
            print('Получен DELETE запрос: ', raw_json, '\n')

        except Exception as ex:
            raise falcon.HTTPError(falcon.HTTP_400,
                                   'Error',
                                   ex.message)
        try:
            result = json.loads(raw_json, encoding='utf-8')
            eventCursor = r.db(PROJECT_DB).table(PROJECT_TABLE).filter({'shedMsg': result['shedMsg'], 'shedTime': result['shedTime']}).delete().run(db_connection)
            print('Результат выполнения DELETE запроса: ', eventCursor, '\n')
            resp.body = 'inserted %s' % eventCursor
        except ValueError:
            raise falcon.HTTPError(falcon.HTTP_400,
                                   'Invalid JSON',
                                   'Could not decode the request body. The '
                                   'JSON was incorrect.')

dbSetup()
