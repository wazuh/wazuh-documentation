.. _upgrading_ossec_sources:

Sources
===================================================

In case you installed OSSEC from source code using the script *install.sh*, follow the normal procedure to :ref:`install Wazuh <installation>` and it will be automatically updated.

.. warning::
    The configuration file **/var/ossec/etc/ossec.conf will be overwritten**. The *old* configuration file from the current installation is saved as *ossec.conf.rpmorig* or *ossec.conf.deborig*. You should compare the new file with the old one.

.. note::
    A backup of your previous ruleset will be saved at */var/ossec/etc/backup_ruleset*. You need to review it in case you have created new rules/decoders in other file than *local_rules.xml* or *local_decoder.xml*.
