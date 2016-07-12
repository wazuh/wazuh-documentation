.. _ossec_api_getting_started:

Getting started
======================

Before starting to use the API, you must keep in mind:

* The *base URL* for each request is: *https://IP:55000/*
* All responses are in *JSON format* with the following structure:

  * error: 0 if everything was fine and an error code otherwise.
  * data: data requested or empty if error is different to 0.
  * message: error description or empty if error is equal to 0
  
  * Examples:

    * Response without errors: ``{ "error": "0", "data": "...", "message": "" }``
    * Response with errors: ``{ "error": "NOT 0", "data": "", "message": "..." }``

* All responses have a HTTP Status code: 2xx (success), 4xx (client error), 5xx (server error), etc.

Find some :ref:`ossec_api_examples` of how to use this API with :ref:`curl-label`, :ref:`powershell-label` and :ref:`python-label`.



Versioning
---------------------------------

We want to keep our API as backward compatible as possible. So, the client can specify what API version wants to use. The version is determined by the incoming client request, and may either be based on the request URL, or based on the request headers. If you don't specify the version, you will use the lastest version available. Right now, the API just has a version available: **v1.2**.

Below it is detailed how to use the API Versioning.


URL Versioning
+++++++++++++++++++++++++
API version is specified into the URL: ::

    GET https://IP:55000/v1.2/agents

Header Versioning
+++++++++++++++++++++++++
The normal URL but add the header **api-version**: ::

    GET https://IP:55000/agents
    api-version: v1.2
