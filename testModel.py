import json

import peewee

db = peewee.SqliteDatabase('shedule.db')


class BaseModel(peewee.Model):
    class Meta:
        database = db


# noinspection SyntaxError,SyntaxError,SyntaxError,SyntaxError,SyntaxError
class Shedule(BaseModel):
    shedTime = peewee.DateTimeField()
    shedMsg = peewee.CharField()

    def __str__(self):
        return json.dumps({
            'shedTime': self.shedTime,
            'shedMsg': self.shedMsg(unique=True)
        })
