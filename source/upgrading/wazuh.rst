.. _upgrading_wazuh:

Upgrading from Wazuh
===================================================

This section describes the steps required to upgrade an existing Wazuh installation.

Until *Wazuh v1.2* there was not Wazuh packages, so your current version was installed from source code using the script *install.sh* . Follow the normal procedure to :ref:`install Wazuh <installation>` and it will be automatically updated.

.. warning::
    The configuration file **/var/ossec/etc/ossec.conf will be overwritten**. The *old* configuration file from the current installation is saved as *ossec.conf.rpmorig* or *ossec.conf.deborig*. You should compare the new file with the old one.

.. note::
    A backup of your previous ruleset will be saved at */var/ossec/etc/backup_ruleset*. You need to review it in case you have created new rules/decoders in other file than *local_rules.xml* or *local_decoder.xml*.


From now on, **the next upgrades will not overwrite the file /var/ossec/etc/ossec.conf**. In these cases, the *new* configuration file from the update package is installed as *ossec.conf.rpmnew* or *ossec.conf.debnew* and might reflect new options or a new notion of best practices. You should compare the new file with the old one.
