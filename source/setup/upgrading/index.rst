.. _upgrading_wazuh:

Upgrading
===================================================

This section describes how to upgrade an existing Wazuh installation.

To determine if an upgrade is supported for your installation, please consult this table:

+--------------+-------------------+---------------+-----------------------------------------------------------------------+
| Upgrade from | Installation type | Upgrade to    |                             Upgrade type                              |
+==============+===================+===============+=======================================================================+
| Wazuh 1.0+   | Sources           | Wazuh 1.2     | Automatic                                                             |
+--------------+-------------------+---------------+-----------------------------------------------------------------------+

.. warning::
    The configuration file **/var/ossec/etc/ossec.conf will be overwritten**. The *old* configuration file from the current installation is saved as *ossec.conf.rpmorig* or *ossec.conf.deborig*. You should compare the new file with the old one.

    **Next upgrades (versions > 1.2) will not overwrite the file /var/ossec/etc/ossec.conf**. In these cases, the *new* configuration file from the update package is installed as *ossec.conf.rpmnew* or *ossec.conf.debnew* and might reflect new options or a new notion of best practices.

.. note::
    A backup of your previous ruleset will be saved at */var/ossec/etc/backup_ruleset*. You need to review it in case you have created new rules/decoders in other file than *local_rules.xml* or *local_decoder.xml*.

Follow the normal procedure to :ref:`install Wazuh <installation>` and it will be automatically updated.
