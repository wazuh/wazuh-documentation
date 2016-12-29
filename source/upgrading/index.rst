.. _upgrading:

Upgrading
===================================

This guide details how to perform the two types of upgrades: from OSSEC and from Wazuh.

To determine if an upgrade is supported for your installation, please consult this table:

+--------------+-------------------+---------------+-----------------------------------------------------------------------+
| Upgrade from | Installation type | Upgrade to    |                             Upgrade type                              |
+==============+===================+===============+=======================================================================+
| OSSEC 2.8.3+ | Sources           | Wazuh 1.2     | :ref:`Automatic <upgrading_ossec_sources>`                            |
+--------------+-------------------+---------------+-----------------------------------------------------------------------+
| OSSEC 2.8.3+ | Packages          | Wazuh 1.2     | :ref:`Automatic (Debian), Manual (CentOS) <upgrading_ossec_packages>` |
+--------------+-------------------+---------------+-----------------------------------------------------------------------+
| Wazuh 1.0+   | Sources           | Wazuh 1.2     | :ref:`Automatic <upgrading_wazuh>`                                    |
+--------------+-------------------+---------------+-----------------------------------------------------------------------+


.. toctree::
   :maxdepth: 3

   ossec
   wazuh
