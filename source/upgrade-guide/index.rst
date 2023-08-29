.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out more about the process of upgrading the Wazuh central components, Open Distro for Elasticsearch, Elastic Stack, and Wazuh agents in this section.
  
Upgrade guide
=============

This guide includes instructions to upgrade the :doc:`Wazuh components </getting-started/components/index>` as well as the Wazuh integrations with Open Distro for Elasticsearch and Elastic Stack basic license. 

Check the :doc:`compatibility-matrix/index` section to learn about the compatibility requirements between components.

Upgrade the Wazuh central components
------------------------------------

The Wazuh central components section includes instructions to upgrade the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. This is the default Wazuh installation starting with Wazuh v4.3.0. 

Elastic Stack and Open Distro for Elasticsearch are no longer compatible with the Wazuh manager since v4.6.0.
 
 

.. raw:: html

  <div class="link-boxes-group limited-width layout-3">
    <div class="link-boxes-item">
    <div>
    
.. image:: /images/upgrade-guide/computer-wazuh.png

.. raw:: html

      <a class="link-boxes-link horizontal-content" href="upgrading-central-components.html">

        <p class="link-boxes-label">Upgrade Wazuh central components</p>


.. image:: /images/upgrade-guide/wazuh.svg
   :width: 40px
     
Wazuh central components

.. raw:: html

      </a>
      </div>
    </div>
    
  </div>
  

If you are unsure of what is your Wazuh installation, on the web user interface go to **Wazuh** > **Settings** > **About** to find out your installation type. 

- If you see the "Welcome to the Wazuh dashboard" message, you have the default Wazuh installation. Select the **Wazuh central components** option above and follow the instructions to upgrade your environment.    

- If you see the "Welcome to the Wazuh app for Kibana" message, go to the top left menu  **☰** > **Dev tools**. Use ``GET /`` to get your Elasticsearch version, and look for the ``build_flavor``. If the build flavor is ``OSS`` you have Open Distro for Elasticsearch, but if the build flavor is ``default`` then you have Elastic Stack basic license.  These installations are no longer supported since 4.6.0, but Wazuh can be integrated with those providers. Verify :doc:`/integrations-guide/index` for more information.

Upgrade the Wazuh agents
------------------------

Wazuh agents can be upgraded either remotely from the Wazuh manager or locally. Upgrading the Wazuh agents remotely is possible by using the ``agent_upgrade`` tool and the Wazuh API, see the :doc:`Remote agent upgrade </user-manual/agents/remote-upgrading/upgrading-agent>` section to learn more.

To perform the upgrade locally, select your operating system and follow the instructions. 

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

For upgrades from Wazuh 1.x and 2.x, check the :doc:`legacy/index` guide.

.. toctree::
   :maxdepth: 1
   :hidden:

   upgrading-central-components
   elasticsearch-kibana-filebeat/upgrading-open-distro
   elasticsearch-kibana-filebeat/upgrading-elastic-stack
   wazuh-agent/index
   legacy/index
   compatibility-matrix/index
