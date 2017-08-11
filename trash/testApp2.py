import falcon
import json


# works underthegunicorn
class testApp2(object):
    def on_get(self, req, resp):
        """Handles GET requests"""
        resp.status = falcon.HTTP_200  # This is the default status
        resp.body = ('\nTwo things awe me most, the starry sky '
                     'above me and the moral law within me.\n'
                     '\n'
                     '    ~ Immanuel Kant\n\n')


''' def on_post(self,req,resp):
        try:
            raw_json = req.stream.read()
        except Exception as ex:
            raise falcon.HTTPError(falcon.HTTP_400,
                'Error',
                ex.message)

        try:
            result_json = json.loads(raw_json, encoding='utf-8')
        except ValueError:
            raise falcon.HTTPError(falcon.HTTP_400,
                'Malformed JSON',
                'Could not decode the request body. The '
                'JSON was incorrect.')
    '''
# falcon.API instances are callable WSGI apps
app = falcon.API()

# Resources are represented by long-lived class instances
testAppRoute = testApp2()

# things will handle all requests to the '/things' URL path
app.add_route('/', testAppRoute)
