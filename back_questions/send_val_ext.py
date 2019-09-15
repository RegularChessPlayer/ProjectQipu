from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from models.converter import dExtenso
from models.format_str import format_real, format_centavo

app=Flask(__name__)
CORS(app)
ext = dExtenso()

@app.route("/")
def index():
   return "<h1>Hello Site<h1>"

@app.route("/convert", methods=['POST'])
def convert():
   content = request.get_json()
   original_value_list = content['value_to_convert'].split(',')

   if len(original_value_list) == 2:
       converted_value = format_real(ext.getExtenso(original_value_list[0])) + ' e ' + format_centavo(ext.getExtenso
                                                                                            (original_value_list[1]))
   else:
       converted_value = format_real(ext.getExtenso(original_value_list[0]))

   data = {'value_to_convert': content['value_to_convert'], 'converted_value': converted_value}
   resp = jsonify(data)
   resp.status_code = 200
   return resp


if __name__ == '__main__':
   # app.run(debug = True)
   app.run(host='0.0.0.0', port=8090)
