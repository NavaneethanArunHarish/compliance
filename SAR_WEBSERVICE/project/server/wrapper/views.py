from flask import make_response, jsonify


def wrapper(data,msg,code):
    if code == 200 or code == 201:
        if isinstance(data, list):
            result = {
             'success': {
                 'message': msg,
                  'code': code
              },
             'data': data,
             'count': len(data)
         }
        else:
            result = {
                'success': {
                    'message': msg,
                    'code': code
                },
                'data': data,
            }
        return make_response(jsonify(result))

    if code == 500:
        result = {
            'error': {
                'message': msg,
                'code': code
            },
            'data': [],
            'count': 0
        }
        return make_response(jsonify(result))