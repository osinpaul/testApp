import falcon
import os

# Falcon follows the REST architectural style, meaning (among
# other things) that you think in terms of resources and state
# transitions, which map to HTTP verbs.
class testApp(object):
    def on_get(self, req, resp):
     """Handles GET requests"""
#Value of the Content-Type header, or None if the header is missing.
     resp.content_type = "text/html"
#HTTP status line (e.g., ‘200 OK’). Falcon requires the full status line, not just the code (e.g., 200). This design makes the framework more efficient because it does not have to do any kind of conversion or lookup when composing the WSGI response.
     resp.status = falcon.HTTP_200  # This is the default status
#Either a file-like object with a read() method that takes an optional size argument and returns a block of bytes, or an iterable object, representing response content, and yielding blocks as byte strings. Falcon will use wsgi.file_wrapper, if provided by the WSGI server, in order to efficiently serve file-like objects.
     resp.stream = open(os.path.join("static", "index.html"))
# falcon.API instances are callable WSGI apps
app = falcon.API()
# Resources are represented by long-lived class instances
testApp = testApp()
# things will handle all requests to the '/things' URL path
app.add_route('/', testApp)
