.. _upgrading_ossec:

Migrating from OSSEC
===================================================


Prerequisites
-------------
- OSSEC 2.8.3 or higher
- ELK stack NOT installed

This section explains how to migrate from an existing OSSEC installation to Wazuh.

Follow the appropriate section depending on the type of your OSSEC installation: from sources or packages:

+--------------+-------------------+---------------+-----------------------------------------------------------------------+
| Upgrade from | Installation type | Upgrade to    |                             Upgrade type                              |
+==============+===================+===============+=======================================================================+
| OSSEC 2.8.3+ | Sources           | Wazuh 2       | :ref:`Automatic <upgrading_ossec_sources>`                            |
+--------------+-------------------+---------------+-----------------------------------------------------------------------+
| OSSEC 2.8.3+ | Packages          | Wazuh 2       | :ref:`Manual <upgrading_ossec_packages>`                              |
+--------------+-------------------+---------------+-----------------------------------------------------------------------+

.. note::
	OSSEC agents are compatible with Wazuh Manager.


.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       ossec_packages
       ossec_sources
       installing_ossec_elastic
