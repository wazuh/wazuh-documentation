.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check out the compatibility matrix of the upgrade process of the Wazuh server, Open Distro for Elasticsearch, Elastic Stack, and the Wazuh agents.
  
.. _compatibility_matrix:

Compatibility matrix
====================


Wazuh software can be installed on many operating systems. In addition, there are also specific compatibility requirements between the different components of Wazuh. For more information, check the compatibility matrix below.

- `Operating system compatibility`_
- `Components compatibility`_

Operating system compatibility
------------------------------

Wazuh manager
^^^^^^^^^^^^^

Below you may find the compatibility table for the Wazuh manager.

+-------------------------------------+--------------------------------------------------------------------------+
|                                     |   **Wazuh version**                                                      |
+    **Operating System**             +-------------------------------+------------------------+--------+--------+
|                                     |   From 3.13.x to current      |  From 3.0.x to current |  2.1.1 |  2.1.0 |
+-------------------------------------+-------------------------------+------------------------+--------+--------+
|   Amazon Linux 1 or newer           | ✓                             | ✓                      |   ✓    |   ✓    |
+-------------------------------------+-------------------------------+------------------------+--------+--------+
|   CentOS 6 or newer                 | ✓                             | ✓                      |   ✓    |   ✓    |
+-------------------------------------+-------------------------------+------------------------+--------+--------+
|   Debian Wheezy/7 or newer          | ✓                             | ✓                      |   ✓    |   ✓    |
+-------------------------------------+-------------------------------+------------------------+--------+--------+
|   Fedora (>= 31)                    | ✓                             | ✓                      |   ✓    |   ✓    |
+-------------------------------------+-------------------------------+------------------------+--------+--------+
|   OpenSUSE 42 or newer              | ✓                             | ✓                      |   ✗    |   ✗    |
+-------------------------------------+-------------------------------+------------------------+--------+--------+
|   Oracle Linux 6 or newer           | ✓                             | ✓                      |   ✗    |   ✗    |
+-------------------------------------+-------------------------------+------------------------+--------+--------+
|   Raspbian Pi OS Stretch/9 or newer | ✓                             | ✗                      |   ✗    |   ✗    |
+-------------------------------------+-------------------------------+------------------------+--------+--------+
|   RHEL 6 or newer                   | ✓                             | ✓                      |   ✓    |   ✓    |
+-------------------------------------+-------------------------------+------------------------+--------+--------+
|   SUSE 12* or newer                 | ✓                             | ✓                      |   ✗    |   ✗    |
+-------------------------------------+-------------------------------+------------------------+--------+--------+
|   Ubuntu Precise/12.04 - 16.10      | ✓                             | ✓                      |   ✓    |   ✓    |
+-------------------------------------+-------------------------------+------------------------+--------+--------+
|   Ubuntu Zesty/17.04 or newer       | ✓                             | ✓                      |   ✗    |   ✗    |
+-------------------------------------+-------------------------------+------------------------+--------+--------+

*(\*) SUSE based host are available as Wazuh manager since Wazuh v3.2.1 version.*

Wazuh agent
^^^^^^^^^^^

In this table, you can check our supported OS list where the Wazuh agent can be installed.

+------------------------------------+--------------------------------------------------+
|                                    |**Wazuh version**                                 |
+       **Operating System**         +-------------------------+------------------------+
|                                    | From 3.13.x to current  | From 3.3.1 to current  |
+------------------------------------+-------------------------+------------------------+
|   AIX 6 and 7                      |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   Amazon Linux, Amazon Linux 2     |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   CentOS 5 or newer                |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   Debian Wheezy/7 or newer         |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   Fedora 31 or newer               |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   HP-UX 11.31                      |   ✓                     | ✓                      |   
+------------------------------------+-------------------------+------------------------+
|   macOS Sierra or newer *          |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   OpenSUSE 42 or newer             |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   Oracle Linux 5 or newer          |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   Raspbian Pi OS Stretch/9 or newer|   ✓                     | ✗                      |
+------------------------------------+-------------------------+------------------------+
|   RHEL 5 or newer                  |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   Solaris 10 and 11 - i386 / sparc |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   Suse 11 or newer                 |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   Ubuntu Precise/12.04 or newer    |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   Windows XP or newer              |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+
|   Windows Server 2003 or newer     |   ✓                     | ✓                      |
+------------------------------------+-------------------------+------------------------+


\* With the release of macOS Catalina the packages are required to go through notarization. Version 3.10.2 was the first version to be notarized, this means that packages for versions older than 3.10.2 are not compatible with macOs Catalina.




Components compatibility
------------------------

When using the full stack of Wazuh software (that means, ``wazuh-manager``, ``wazuh-agent`` and ``wazuh-wui``), there are different compatibility requirements in order to make everything work properly.

Manager and agents
^^^^^^^^^^^^^^^^^^

The compatibility between the Wazuh agent and the Wazuh manager is guaranteed when the Wazuh manager has a **newer or equal** version than the Wazuh agent.


.. note::

    The Wazuh manager is also compatible with **OSSEC agents**, however, not all capabilities will be available for them. 

.. _wazuh_kibana_compatibility_matrix:    

Wazuh and Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh app for Kibana requires compatibility between two different components:

  - With the **Wazuh manager**, it requires the same ``major.minor`` version.
  - With the **Elastic Stack**, it is only compatible with the exact same version.

+-----------------------------------+----------------------------------------+---------------------------+
|        Wazuh version              |      Elastic Stack version             |   Open Distro version     |
+-----------------------------------+----------------------------------------+---------------------------+
|              |WAZUH_LATEST|                | |ELASTICSEARCH_LATEST|                                 | |OPEN_DISTRO_LATEST|                    |
+-----------------------------------+----------------------------------------+---------------------------+
|              |WAZUH_LATEST|                | 7.11.2                                 |                           |
+-----------------------------------+----------------------------------------+---------------------------+
|              |WAZUH_LATEST|                | 7.12.1                                 |                           |
+-----------------------------------+----------------------------------------+---------------------------+
|              4.2.5                | 7.13.0, 7.13.1, 7.13.2, 7.13.3, 7.13.4 |                           |
+-----------------------------------+----------------------------------------+---------------------------+
|              4.2.5                | 7.14.0, 7.14.1, 7.14.2                 |                           |
+-----------------------------------+----------------------------------------+---------------------------+


You can find more information on the `Wazuh app for Kibana repository <https://github.com/wazuh/wazuh-kibana-app#installation>`_, where you can check a more detailed compatibility matrix between the Wazuh app and Elastic Stack versions.

Wazuh and Splunk app
^^^^^^^^^^^^^^^^^^^^

The Splunk app for Wazuh requires compatibility between two different components:

  - With the **Wazuh manager**, it requires the same ``major.minor`` version.
  - With **Splunk**, it is only compatible with the exact same version.

+---------------------------------+---------------------------+
| Splunk App version              |       Splunk version      |
+---------------------------------+---------------------------+
|              |WAZUH_SPLUNK_LATEST|              |     8.1.4, |SPLUNK_LATEST|          |
+---------------------------------+---------------------------+

You can find more information on the `Wazuh app repository <https://github.com/wazuh/wazuh-splunk#installation>`_, where you can check a more detailed compatibility matrix between the Wazuh app for Splunk and Splunk versions.
