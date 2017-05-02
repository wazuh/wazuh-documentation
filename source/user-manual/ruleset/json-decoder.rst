.. _ruleset_json-decoder:

JSON decoder
=============

.. versionadded:: 3.0

Wazuh incorporates an integrated decoder for JSON format. This decoder allows us to extract data from any source in JSON format.

The decoder is able to extract the following data types:

+------------------+--------------------------------------------------------------------------------------------+
|**Numbers**       | Integer or decimal numbers.                                                                |
+------------------+--------------------------------------------------------------------------------------------+
|**Strings**       | A sequence of zero or more characters.                                                     |
+------------------+--------------------------------------------------------------------------------------------+
|**Booleans**      | Either of the values *true* or *false*.                                                    |
+------------------+--------------------------------------------------------------------------------------------+
|**Null values**   | Empty values.                                                                              |
+------------------+--------------------------------------------------------------------------------------------+
|**Arrays**        | List with zero or more values. These values may be different, but they must belong to      |
|                  | some of the above. **An array of objects is not supported.**                               |
+------------------+--------------------------------------------------------------------------------------------+
|**Objects**       | Collection of key/value pairs where the keys are strings.                                  |
+------------------+--------------------------------------------------------------------------------------------+

Extracted fields are casted to strings, stored as :doc:`Dynamic Fields <dynamic-fields>` and can be used for rules generation.

Example:
::

    { "time":"[02/May/2017:10:20:16 +0000]", "remoteIP":"127.0.0.1", "host":"localhost","request":"/index.html", "query":"", "method":"GET", "status":"200", "userAgent":"ApacheBench/2.3", "referer":"-" }

::

    **Phase 1: Completed pre-decoding.
           full event: '{ "time":"[02/May/2017:10:20:16 +0000]", "remoteIP":"127.0.0.1", "host":"localhost","request":"/index.html", "query":"", "method":"GET", "status":"200", "userAgent":"ApacheBench/2.3", "referer":"-" }'
           hostname: 'ip-172-31-22-19'
           program_name: '(null)'
           log: '{ "time":"[02/May/2017:10:20:16 +0000]", "remoteIP":"127.0.0.1", "host":"localhost","request":"/index.html", "query":"", "method":"GET", "status":"200", "userAgent":"ApacheBench/2.3", "referer":"-" }'

    **Phase 2: Completed decoding.
           decoder: 'json'
           time: '[02/May/2017:10:20:16 +0000]'
           remoteIP: '127.0.0.1'
           host: 'localhost'
           request: '/index.html'
           query: ''
           method: 'GET'
           status: '200'
           userAgent: 'ApacheBench/2.3'
           referer: '-'

    **Phase 3: Completed filtering (rules).
           Rule id: '100002'
           Level: '5'
           Description: 'Apache Rules JSON'
    **Alert to be generated.
