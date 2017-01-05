.. _upgrading_ossec:

Migrating from OSSEC
===================================================

This section explains how to upgrade an existing OSSEC installation to Wazuh. You must follow the appropriate section depending on the type of your OSSEC installation: from sources or packages.

To determine if an upgrade is supported for your installation, please consult this table:

+--------------+-------------------+---------------+-----------------------------------------------------------------------+
| Upgrade from | Installation type | Upgrade to    |                             Upgrade type                              |
+==============+===================+===============+=======================================================================+
| OSSEC 2.8.3+ | Sources           | Wazuh 1.2     | :ref:`Automatic <upgrading_ossec_sources>`                            |
+--------------+-------------------+---------------+-----------------------------------------------------------------------+
| OSSEC 2.8.3+ | Packages          | Wazuh 1.2     | :ref:`Manual <upgrading_ossec_packages>`                              |
+--------------+-------------------+---------------+-----------------------------------------------------------------------+


.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       ossec_packages
       ossec_sources
       migrating_ossec_elastic
