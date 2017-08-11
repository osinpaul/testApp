import json
import falcon
from testModel import Shedule


class DataResource(object):
    def on_get(self, request, response, shed_id=None):
        if shed_id is None:
            response.body = json.dumps([u.shedMsg for u in Shedule.select()])
        else:
            shedule = Shedule.get(shedMsg=shed_id)
            response.body = str(shedule)

    def on_post(self, request, response):
        raw = request.stream.read()  # read fail?
        data = json.loads(raw)  # json fail?
        if 'shedMsg' not in data or 'shedTime' not in data:
            raise falcon.HTTPError(falcon.HTTP_400, "Invalid JSON", "Please send a hash with 'shedMsg' and 'shedTime'")
        shedule = Shedule.create(shedMsg=data['shedMsg'], shedTime=data['shedTime'])
        shedule.save()
        response.status = falcon.HTTP_201
        response.location = '/%s' % shedule.shedMsg

    def on_delete(self, request, response, shed_id):
        shedule = Shedule.get(shedMsg=shed_id)
        shedule.delete_instance()
        response.location = '/'

    def on_put(self, request, response, shed_id):
        raw = request.stream.read()
        data = json.loads(raw)
        if 'shedMsg' not in data or 'shedTime' not in data:
            raise falcon.HTTPError(falcon.HTTP_400, "Invalid JSON", "Please send a right hash")
        shedule = Shedule.get(shedMsg=shed_id)
        shedule.shedMsg = data['shedMsg']
        shedule.shedTime = data['shedTime']
        shedule.save()
        response.location = '/%s' % shedule.shedMsg
