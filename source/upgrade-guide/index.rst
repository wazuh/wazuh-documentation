.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out more about the process of upgrading the Wazuh central components, Open Distro for Elasticsearch, Elastic Stack, and Wazuh agents in this section.
  
Upgrade guide
=============

This guide includes instructions to upgrade your Wazuh installation. The Wazuh solution is based on the Wazuh agent, which is deployed on the monitored endpoints, and on three central components: the Wazuh server, the Wazuh indexer, and the Wazuh dashboard.


Upgrade the Wazuh central components
------------------------------------

Select an option below and follow the instructions to upgrade the Wazuh components. The Wazuh server, indexer and dashboard section includes instructions to upgrade the default Wazuh installation starting with Wazuh v4.3.0. 

On the other hand, the Open distro for Elasticsearch section describes the upgrade process for the Wazuh manager, Filebeat-OSS, Open distro for Elasticsearch and Kibana. This was the default Wazuh installation from Wazuh v4.0.0 to 4.2.7. 

The Elastic Stack basic license section includes instructions to upgrade the Wazuh manager, Filebeat, Elasticsearch and Kibana. The latest supported Elastic Stack basic license version is |ELASTICSEARCH_ELK_LATEST|. 


.. note::

   If you are unsure of what is your Wazuh installation, on the web user interface go to **Wazuh** > **Settings** > **About**. If you see "Welcome to the Wazuh dashboard" you have the default Wazuh installation. Select the Wazuh server, indexer and dashboard option and follow the instructions to upgrade your environment.    

   If you see "Welcome to the Wazuh app for Kibana", go to the top left menu  **☰** > **Dev tools**. Use ``GET /`` to get your Elasticsearch version, and look for the "build_flavor". If the build flavor is "OSS" you have Open distro for Elasticsearch, and if the build flavor is "default" then you have Elastic Stack basic license.  

Upgrade the Wazuh agents
------------------------

To upgrade a Wazuh agent, select your operating system and follow the instructions.

.. raw:: html

  <div class="link-boxes-group layout-6">
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-linux.html">
        <p class="link-boxes-label">Linux</p>

.. image:: /images/installation/linux.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-windows.html">
        <p class="link-boxes-label">Windows</p>

.. image:: /images/installation/windows-logo.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-macos.html">
        <p class="link-boxes-label">macOS</p>

.. image:: /images/installation/macOS-logo.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-solaris.html">
        <p class="link-boxes-label">Solaris</p>

.. image:: /images/installation/solaris.png
      :align: center
      :width: 150px

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-aix.html">
        <p class="link-boxes-label">AIX</p>

.. image:: /images/installation/AIX.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent-package-hpux.html">
        <p class="link-boxes-label">HP-UX</p>

.. image:: /images/installation/hpux.png
      :align: center

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
