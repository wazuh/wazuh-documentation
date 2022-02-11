.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check out alternative Wazuh installation configurations, which include installation with Elastic Stack basic license, with Splunk, or from sources.  
  
.. _more_installation_alternatives:

More installation alternatives
==============================

This section will provide alternative installation configurations to the ones given in the installation guide.

As an alternative to Open Distro for Elasticsearch, the :ref:`Wazuh with Elastic Stack<basic_installation_guide>` section will guide the user through the installation of Wazuh using the Elastic's components.

Wazuh can be also installed along with `Splunk <https://documentation.wazuh.com/3.13/installation-guide/installing-splunk/index.html>`_. This guide will show how to perform an installation of Wazuh with Splunk as a single instance or a cluster and how to install the Wazuh Splunk app.

In the installation guide, is explained how to install Wazuh from packages. Alternatively it can be installed using :ref:`sources <installation_from_sources>`. In this section, it is explained how to install both, the Wazuh manager and the Wazuh agent.

.. toctree::
    :maxdepth: 1

    elastic-stack/index
    splunk/index
    wazuh-from-sources/index
    offline-installation
