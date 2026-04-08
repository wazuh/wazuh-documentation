.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about upgrading Wazuh central components, Open Distro for Elasticsearch, Elastic Stack, and Wazuh agents in this section.

Upgrade guide
=============

This guide includes instructions on how to upgrade the Wazuh central components (server, indexer, and dashboard) and the Wazuh agent.

.. warning::

   Upgrading to Wazuh 5.x enforces stricter configuration validation. If deprecated or removed options remain in ``ossec.conf``, the service fails to start.

Upgrading to Wazuh 5.x
----------------------

This section summarizes the breaking changes and required actions for upgrading to Wazuh 5.x.

Key changes
^^^^^^^^^^^

-  Removed modules: CIS-CAT, OpenSCAP, Osquery
-  Removed binaries: ``manage_agents`` (manager only), ``agent-auth``
-  TCP and AES communication are now mandatory
-  Default FIM whodata provider is now eBPF
-  Support for :ref:`legacy platforms <removed_platforms_support>` has been removed

Configuration updates
^^^^^^^^^^^^^^^^^^^^^

Before upgrading, clean up the ``ossec.conf`` file on managers and agents. Remove unsupported options and blocks.

-  ``<syscheck>``:

   -  Remove: ``scan_on_start``, ``prefilter_cmd``, ``allow_remote_prefilter_cmd``

-  ``<rootcheck>``:

   -  Remove: ``check_files``, ``rootkit_files``, ``check_trojans``, ``rootkit_trojans``, ``check_unixaudit``, ``system_audit``, ``check_winaudit``, ``windows_audit``, ``check_winapps``, ``windows_apps``, ``check_winmalware``, ``windows_malware``

-  ``<client>``:

   -  Remove: ``protocol``, ``crypto_method``, ``force_reconnect_interval``
   -  Only TCP and AES are supported.

      -  Agents configured to use UDP do not connect.
      -  Configurations using Blowfish are rejected.

-  Modules:

   -  Remove: ``<cis-cat>``, ``<open-scap>``, ``<osquery>``

Any unsupported option or block causes the service to fail at startup.

Removed components
^^^^^^^^^^^^^^^^^^

-  CIS-CAT and OpenSCAP

   -  Use the :doc:`SCA module </user-manual/capabilities/sec-config-assessment/index>` instead

-  Osquery

   -  Run as a standalone service and ingest results via the Wazuh API or :doc:`localfile </user-manual/reference/ossec-conf/localfile>`

-  ``manage_agents`` (manager only)

   -  Use the Wazuh API or dashboard

-  ``agent-auth``

   -  Use the :doc:`supported enrollment methods </user-manual/agent/agent-enrollment/index>`

Behavior changes
^^^^^^^^^^^^^^^^

-  FIM whodata:

   -  eBPF is now the default provider
   -  Configure a different :ref:`provider <reference_ossec_syscheck_whodata>` manually if required

-  Windows installer:

   -  The NSIS (``.exe``) installer is removed
   -  Use the :ref:`MSI package <packages_list_windows>` instead

.. _removed_platforms_support:

Platform support
^^^^^^^^^^^^^^^^

The following platforms are no longer supported:

-  Unix: HP-UX, Solaris, AIX
-  Linux: CentOS 5, RHEL 5 derivatives, SLES 11
-  Windows: XP, Vista, Server 2003

.. note::

   You cannot upgrade agents to 5.x on these platforms. Keep them on 4.x or migrate to a supported system.

Wazuh components compatibility
------------------------------

All central Wazuh components must have identical version numbers, including the patch level, for proper operation. Additionally, the Wazuh manager must always be the same version or newer than the Wazuh agents.

Note that Wazuh indexer |WAZUH_CURRENT| is specifically compatible with Filebeat-OSS |FILEBEAT_LATEST|.

Upgrade the Wazuh central components
------------------------------------

The :doc:`Wazuh central components </upgrade-guide/upgrading-central-components>` section includes instructions on how to upgrade the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. These instructions apply to both all-in-one deployments and multi-node cluster deployments.

Upgrade the Wazuh agents
------------------------

You can upgrade the Wazuh agents either remotely or locally. For remote upgrades, you can use either the Wazuh manager (``agent_upgrade`` tool ) or the Wazuh API (via the Wazuh dashboard or a command-line tool). For details, refer to the :doc:`remote agent upgrade </user-manual/agent/agent-management/remote-upgrading/upgrading-agent>` section.

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
  </div>

.. toctree::
   :maxdepth: 1
   :hidden:

   upgrading-central-components
   wazuh-agent/index
   troubleshooting
