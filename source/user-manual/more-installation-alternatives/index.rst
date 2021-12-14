.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Check out alternative Wazuh installation configurations, which include installation with Elastic Stack basic license, with Splunk, or from sources.  
  
.. _more_installation_alternatives:

Installation alternatives
=========================

This section provides alternative installation configurations to the ones given in the :ref:`Installation Guide <installation_guide>`.

- :ref:`Integration with Elastic Stack <basic_installation_guide>`: As an alternative to Open Distro for Elasticsearch, you can install Wazuh using the Elastic Stack basic license option. It contains everything included in the open source version under the Apache 2.0 license, plus some additional capabilities such as Elastic Stack Security features, Kibana alerting, and others. According to your chosen configuration, Wazuh and Elastic Stack are installed on the same host, as an all-in-one deployment, on a separate host as a single-node or multi-node cluster.


- :ref:`Integration with Splunk <installation_splunk>`: You install Wazuh along with Splunk Enterprise, including the Splunk forwarder and the Wazuh Splunk app. This can be done as a single instance or as a multi-instance cluster, depending on the size of your environment.


.. toctree::
    :hidden:
    :maxdepth: 1
    
    elastic-stack/index
    splunk/index

