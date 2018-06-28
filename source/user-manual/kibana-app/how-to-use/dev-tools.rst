.. Copyright (C) 2018 Wazuh, Inc.

.. _dev_tools:

Dev tools
=========

The Wazuh App includes a useful tab to type requests and send them directly to the Wazuh API.

Due to security reasons you'll only be able to fetch data, this means using GET requests. 

The Dev tool is split into two panes: an editor pane (left) and a response pane (right).

.. thumbnail:: ../../../images/kibana-app/dev-tools/devtools-2.png
    :title: devtools-2
    :align: center
    :width: 100%

Editor pane
-----------

Here you type the route and request. Depending on the route your request could be empty.

.. thumbnail:: ../../../images/kibana-app/dev-tools/devtools-3.png
    :title: devtools-3
    :align: center
    :width: 100%

Example:

    .. code-block:: console

        GET /agents
        {
           "limit": 10
        }

The above request is the same as:

    .. code-block:: console

        curl -XGET localhost:55000/agents?limit=10

Since you could have multiple requests on your editor pane, the selected request (it'll be highlighted) is the request 
that will be sent. To send your request press the green *play* icon at the top right corner of the editor pane.


Response pane
-------------

Here is where you'll see the result of the request in JSON format.

.. thumbnail:: ../../../images/kibana-app/dev-tools/devtools-4.png
    :title: devtools-4
    :align: center
    :width: 100%


Saved requests
--------------

Everything you type in the editor pane is stored in the local storage from your browser in real time.

This means you can continue with your last request once the browser is closed and opened again.


Multiline comments
------------------

Commenting is allowed on the editor pane, and multiline comments are available too. You need to use 
the `#` character at the beginning of the comment line.

How the Wazuh API is being used?
--------------------------------

We store your Wazuh API credentials in Elasticsearch indices and make the requests from the server side using the stored credentials.
This means we are not sending your credentials on every request. 

It also means you are not sending the request from the Dev tools to the Wazuh API directly cause
we are fetching your request at server side and then requesting the Wazuh API, it's a double request indeed.

Which Wazuh API is being used?
------------------------------

The API used for the request is the current one selected in the Wazuh app.

.. thumbnail:: ../../../images/kibana-app/dev-tools/devtools-1.png
    :title: devtools-1
    :align: center
    :width: 100%

More information
----------------

https://documentation.wazuh.com/current/user-manual/api/index.html
