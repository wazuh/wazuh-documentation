.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Configure the Wazuh indexer on hardened Linux endpoints by relocating its temp directory to resolve noexec issues in /tmp.

Wazuh indexer configuration on hardened endpoints
=================================================

Wazuh indexer uses the Java Native Access (JNA) library for executing some platform-dependent native code. On Linux, the native code backing these libraries is extracted at runtime into a temporary directory and then mapped into executable pages in the indexer's address space. This requires the underlying files not to be on a filesystem mounted with the noexec option.

By default, the Wazuh indexer will create its temporary directory within /tmp. However, some hardened Linux installations mount /tmp with the noexec option by default. This prevents JNA from working correctly.

Ensuring executable permissions in the Wazuh indexer temp directory
-------------------------------------------------------------------

To resolve this problem, either remove the ``noexec`` option from your ``/tmp`` filesystem or configure the Wazuh indexer to use a different location. Follow the steps below to change the temporary directory of the Wazuh indexer by setting the ``$OPENSEARCH_TMPDIR`` environment variable.

.. note::

   You need root user privileges to run all the commands described below.

#. Create the temporary directory and set the appropriate permissions.

   .. code-block:: console

      # mkdir /var/lib/wazuh-indexer/tmp
      # chown wazuh-indexer:wazuh-indexer /var/lib/wazuh-indexer/tmp

#. Add ``Environment=OPENSEARCH_TMPDIR=/var/lib/wazuh-indexer/tmp`` to the ``/lib/systemd/system/wazuh-indexer.service`` file, which is the systemd configuration file of the Wazuh indexer. The configuration file should be similar to the following:

   .. code-block:: ini

      [Service]
      Type=notify
      RuntimeDirectory=wazuh-indexer
      PrivateTmp=true
      Environment=OPENSEARCH_HOME=/usr/share/wazuh-indexer
      Environment=OPENSEARCH_TMPDIR=/var/lib/wazuh-indexer/tmp  Environment=OPENSEARCH_PATH_CONF=/etc/wazuh-indexer
      Environment=PID_DIR=/run/wazuh-indexer
      Environment=OPENSEARCH_SD_NOTIFY=true
      EnvironmentFile=-/etc/default/wazuh-indexer

#. Restart the Wazuh indexer service to apply the changes.

   .. code-block:: console

      # systemctl restart wazuh-indexer

Handling unwanted Wazuh indexer restarts on Ubuntu
--------------------------------------------------

Modifying the Java temporary directory for the Wazuh indexer on some Ubuntu endpoints causes ``needrestart`` to detect normal Java operations in the directory as library changes. As a result, ``needrestart`` incorrectly flags the Wazuh indexer service as using outdated libraries and either prompts for a restart or automatically restarts the Wazuh indexer service. This occurs even when system package updates are unrelated to the Wazuh indexer. A workaround is to exclude the Wazuh indexer service from ``needrestart`` checks with the command below.

.. code-block:: console

   # echo '$nrconf{blacklist_rc} = [ qr(^wazuh-indexer) ];' > "/etc/needrestart/conf.d/wazuh-indexer.conf"

.. note::

   This setting will make ``needrestart`` always ignore the Wazuh indexer service, even in cases where a restart would be legitimate. Therefore, users may choose to apply it at their discretion and risk.

