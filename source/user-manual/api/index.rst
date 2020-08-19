.. Copyright (C) 2019 Wazuh, Inc.

.. _api:

RESTful API
===========

The Wazuh API is an open source RESTful API that allows for interaction with the Wazuh manager from a web browser, command line tool like cURL or any script or program that can make web requests. The Wazuh UI relies on this heavily and Wazuh's goal is to accommodate complete remote management of the Wazuh infrastructure via the Wazuh Kibana app. Use the API to easily perform everyday actions like adding an agent, restarting the manager(s) or agent(s) or looking up syscheck details.

Here is a list of the Wazuh API capabilities:

* Agent management
* Manager control and overview
* Syscheck control and search
* MITRE attacks and CISCAT overview
* Ruleset information
* Access restriction and security
* Statistical information
* HTTPS and user authentication
* Error handling
* Query remote configuration

For more details, see the :ref:`Use Cases <wazuh_api_use_cases>`.


.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       getting-started
       queries
       configuration
       rbac/index
       reference
       equivalence
       examples
