import falcon
# import json
from testController import DataResource

app = falcon.API()

data_resource = DataResource()

app.add_route("/", data_resource)
app.add_route("/{shed_id}", data_resource)