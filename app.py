from flask import Flask, make_response, jsonify
from flask_restful import Api, Resource

from database.db import Database

db = Database('C:\\Users\\foggy\\Documents\\alcora\\alcora_database.db')
app = Flask(__name__)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)

def make_json_response(object):
    response = make_response(jsonify(object))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response

class ObjectTypeListResource(Resource):
    def get(self):
        type_list = db.get_object_types()
        return make_json_response(type_list)


class ObjectTypeResource(Resource):
    def get(self, type_id):
        type = db.get_object_type(type_id)
        return make_json_response(type)


api.add_resource(ObjectTypeListResource, '/object_type')
api.add_resource(ObjectTypeResource, '/object_type/<int:type_id>')

if __name__ == '__main__':
    app.run(threaded=False)