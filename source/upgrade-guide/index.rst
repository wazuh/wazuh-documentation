.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out more about the process of upgrading the Wazuh central components, Open Distro for Elasticsearch, Elastic Stack, and Wazuh agents in this section.
  
Upgrade guide
=============

This guide gives instructions to upgrade your Wazuh installation.

.. raw:: html

  <div class="link-boxes-group layout-2x2">
    <div class="link-boxes-item">
      <a class="link-boxes-link vertical-content" href="upgrading-central-components.html">
        <p class="link-boxes-label">Upgrade Wazuh server, Wazuh indexer and Wazuh dashboard</p>


.. image:: ../images/upgrade-guide/wazuh.svg
   :width: 150px
     
Wazuh central components

.. raw:: html

      </a>
    </div>
  
    <div class="link-boxes-item">
      <a class="link-boxes-link vertical-content" href="upgrading-agent.html">
        <p class="link-boxes-label">Upgrade Wazuh agents</p>

.. image:: ../images/upgrade-guide/agent.svg
   :width: 110px
     
Wazuh agents

.. raw:: html

      </a>
    </div>
    
    <div class="link-boxes-item">
      <a class="link-boxes-link horizontal-content" href="elasticsearch-kibana-filebeat/upgrading-elastic-stack.html">
        <p class="link-boxes-label">Upgrade Wazuh and Elastic Stack basic license</p>

.. image:: ../images/upgrade-guide/elasticsearch.svg

Elastic stack basic license

.. raw:: html

      </a>
    </div>
    
    <div class="link-boxes-item">
      <a class="link-boxes-link horizontal-content" href="elasticsearch-kibana-filebeat/upgrading-open-distro.html">
        <p class="link-boxes-label">Upgrade Wazuh and Open Distro for Elasticsearch</p>

.. image:: ../images/upgrade-guide/opendistro.svg

Open Distro for Elasticsearch

.. raw:: html

      </a>
    </div>
    
  </div>


The :doc:`compatibility-matrix/index` section explains compatibility requirements between components.

:doc:`legacy/index` describes the upgrading process from Wazuh 1.x and 2.x.

.. toctree::
   :maxdepth: 1
   :hidden:

   upgrading-central-components
   elasticsearch-kibana-filebeat/upgrading-open-distro
   elasticsearch-kibana-filebeat/upgrading-elastic-stack
   upgrading-agent
   legacy/index
   compatibility-matrix/index
