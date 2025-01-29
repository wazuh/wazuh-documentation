.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about upgrading Wazuh central components, Open Distro for Elasticsearch, Elastic Stack, and Wazuh agents in this section.

Upgrade guide
=============

This guide includes instructions on how to upgrade the Wazuh central components (server, indexer, and dashboard) and the Wazuh agents.

Wazuh components compatibility
------------------------------

All central Wazuh components must have identical version numbers, including the patch level, for proper operation. Additionally, the Wazuh manager must always be the same version or newer than the Wazuh agents.

Wazuh Indexer 4.10.1 is specifically compatible with Filebeat-OSS 7.10.2.

Upgrade the Wazuh central components
------------------------------------

The :doc:`Wazuh central components </upgrade-guide/upgrading-central-components>` section includes instructions on how to upgrade the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. These instructions apply to both all-in-one deployments and multi-node cluster deployments.

Upgrade the Wazuh agents
------------------------

You can upgrade the Wazuh agents either remotely or locally. For remote upgrades, you can use either the Wazuh manager (``agent_upgrade`` tool ) or the Wazuh API (via the Wazuh dashboard or a command-line tool). For details, refer to the :doc:`remote agent upgrade </user-manual/agent/agent-management/remote-upgrading/upgrading-agent>` section.

To perform the upgrade locally, select your operating system and follow the instructions

.. raw:: html

  <div class="link-boxes-group layout-6">
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/linux.html">
        <p class="link-boxes-label">Linux</p>

.. image:: /images/installation/linux.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/windows.html">
        <p class="link-boxes-label">Windows</p>

.. image:: /images/installation/windows-logo.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/macos.html">
        <p class="link-boxes-label">macOS</p>

.. image:: /images/installation/macOS-logo.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/solaris.html">
        <p class="link-boxes-label">Solaris</p>

.. image:: /images/installation/solaris.png
      :align: center
      :width: 150px

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/aix.html">
        <p class="link-boxes-label">AIX</p>

.. image:: /images/installation/AIX.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./wazuh-agent/hp-ux.html">
        <p class="link-boxes-label">HP-UX</p>

.. image:: /images/installation/hpux.png
      :align: center

.. raw:: html

      </a>
    </div>
  </div>

.. toctree::
   :maxdepth: 1
   :hidden:

   upgrading-central-components
   wazuh-agent/index
   troubleshooting
