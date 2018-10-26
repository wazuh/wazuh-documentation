.. Copyright (C) 2018 Wazuh, Inc.

.. _ruleset_update:

Update ruleset
==============

Run the ``update_ruleset`` script to update the Wazuh ruleset. You should not need to make any other changes to accommodate the updated rules.

Usage examples
--------------

Update Decoders, Rules and Rootchecks:

.. code-block:: console

   # /var/ossec/bin/update_ruleset

All script options are available on the :ref:`reference manual <update_ruleset>`.

Configure weekly updates
------------------------

Run ``update_ruleset`` weekly and keep your Wazuh Ruleset installation up to date by adding a crontab job to your system.

One way to do this would be to run ``sudo crontab -e`` and, at the end of the file, add the following line ::

  @weekly root cd /var/ossec/bin && ./update_ruleset -r
