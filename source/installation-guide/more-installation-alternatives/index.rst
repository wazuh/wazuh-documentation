.. Copyright (C) 2021 Wazuh, Inc.

.. _more_installation_alternatives:

More installation alternatives
==============================

This section will provide alternative installation configurations to the ones given in the installation guide.

As an alternative to Open Distro for Elasticsearch, the :ref:`Wazuh with Elastic Stack<basic_installation_guide>` section will guide the user through the installation of Wazuh using the Elastic components.

Wazuh can also be installed together with `Splunk <https://documentation.wazuh.com/3.13/installation-guide/installing-splunk/index.html>`_. This guide will show how to perform an installation of Wazuh with Splunk as a single instance or a cluster and how to install the Wazuh Splunk app.

In the installation guide, it is explained how to install Wazuh from packages. Alternatively, Wazuh can be installed using :ref:`sources <installation_from_sources>`. This section explains how to install both the Wazuh manager and the Wazuh agent.

.. toctree::
    :maxdepth: 1

    elastic-stack/index
    Wazuh with Splunk <https://documentation.wazuh.com/3.13/installation-guide/installing-splunk/index.html> 
    wazuh-from-sources/index