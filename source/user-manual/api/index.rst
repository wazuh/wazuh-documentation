.. _api:

.. warning::

    You are looking at documentation for an older release. Not what you want? See the `current release documentation <https://documentation.wazuh.com/current/user-manual/api/index.html>`_.

RESTful API
==========================

The Wazuh API is an open source RESTful API that allows the Wazuh manager to be interacted with from a web browser, command line tool like cURL, or any script or program that can make web requests.  The Wazuh Kibana app relies on this heavily, and Wazuh's goal is to accommodate complete remote management of the Wazuh infrastructure via the Wazuh Kibana app. Use the API to easily perform everyday actions like adding an agent, restarting the manager/agent(s), or looking up syscheck details.

For more details, see :ref:`Use Cases <wazuh_api_use_cases>`.

Wazuh API capabilities:

* Agent management
* Manager control & overview
* Rootcheck control & search
* Syscheck control & search
* Ruleset information
* Statistical information
* HTTPS and user authentication
* Error handling


.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       getting-started
       configuration
       reference
       examples
