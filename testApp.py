import falcon

from testController import *

api = falcon.API()
api.add_route('/events', eventRes())