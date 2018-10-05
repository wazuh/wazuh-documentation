.. Copyright (C) 2018 Wazuh, Inc.

.. _api:

RESTful API
===========

The Wazuh API is an open source RESTful API that allows for interaction with the Wazuh manager from a web browser, command line tool like cURL or any script or program that can make web requests.  The Wazuh Kibana app relies on this heavily and Wazuh's goal is to accommodate complete remote management of the Wazuh infrastructure via the Wazuh Kibana app. Use the API to easily perform everyday actions like adding an agent, restarting the manager(s) or agent(s) or looking up syscheck details.

For more details, see the :ref:`Use Cases <wazuh_api_use_cases>`.

Wazuh API capabilities:

* Agent management
* Manager control & overview
* Rootcheck control & search
* Syscheck control & search
* Ruleset information
* Statistical information
* HTTPS and user authentication
* Error handling
* Query remote configuration


.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       getting-started
       configuration
       reference
       examples
