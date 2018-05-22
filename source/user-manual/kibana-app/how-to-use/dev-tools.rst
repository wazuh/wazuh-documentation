.. Copyright (C) 2018 Wazuh, Inc.

.. _dev_tools:

Dev tools
=========

The Wazuh App includes a useful tab to type requests and send them directly to the Wazuh API.
Due to security reasons you'll be only able to fetch data, this means using GET requests. You won't be able 
to modify existing data, add new data or remove data. The Dev tool is split into two panes: an editor pane (left) 
and a response pane (right).

.. thumbnail:: ../../../images/kibana-app/dev-tools/devtools-2.png
    :title: devtools-2
    :align: center
    :width: 100%

Editor pane
-----------

Here you type your route and your request. Depending on the route your request could be empty.

.. thumbnail:: ../../../images/kibana-app/dev-tools/devtools-3.png
    :title: devtools-3
    :align: center
    :width: 100%

The usage is as simple as type the method, the route and finally the body in JSON format. 

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
which will be sent. To send your request press the green *play* icon at the top right corner of the editor pane.


Response pane
-------------

Here is where you'll see the result of your request in JSON format.

.. thumbnail:: ../../../images/kibana-app/dev-tools/devtools-4.png
    :title: devtools-4
    :align: center
    :width: 100%

If something went wrong while fetching the data you'll see the result too.


Saved requests
--------------

Everything in the editor pane is stored on the local storage from your browser in real time.
This means you could continue with your last request once the browser is closed and opened again unless you 
clear the local storage from your browser.


Multiline comments
------------------

Commenting is allowed on the editor pane, and multiline comments are available too. The only need for you is to use 
the `#` character before the comment line.

How the Wazuh API is being used?
--------------------------------

We store your Wazuh API credentials in Elasticsearch indices and make the requests from the server side using the stored credentials.
This means we are not sending your credentials on every request. Also means you are not sending the request from the Dev tools to the Wazuh API directly cause
we are fetching your request at server side and then requesting the Wazuh API, it's a double request indeed.

Which Wazuh API is being used?
------------------------------

You could have more than one Wazuh API, it's right, but you can only be using one at the same time through the Wazuh App.
The Wazuh API to be used is your selected Wazuh API.

.. thumbnail:: ../../../images/kibana-app/dev-tools/devtools-1.png
    :title: devtools-1
    :align: center
    :width: 100%

More information
----------------

https://documentation.wazuh.com/current/user-manual/api/index.html