.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh indexer packages handle the temporary directory on hardened endpoints with noexec mounts, and how to avoid needrestart restarts.

Wazuh indexer on hardened endpoints
===================================

Hardened Linux hosts often mount ``/tmp`` with the ``noexec`` option, and Debian-based hosts run ``needrestart`` after package operations. This section describes how the Wazuh indexer packages handle both, and what to configure when you change the defaults.

Temporary directory
-------------------

At startup, the Wazuh indexer extracts native libraries, such as the Java Native Access (JNA) library and the FIPS cryptography provider, into a temporary directory and maps them as executable code. The Wazuh indexer packages set this directory to ``/var/lib/wazuh-indexer/tmp`` with the ``OPENSEARCH_TMPDIR`` variable in the service environment file:

-  Debian-based systems: ``/etc/default/wazuh-indexer``
-  RPM-based systems: ``/etc/sysconfig/wazuh-indexer``

The package creates the directory during installation, owned by the ``wazuh-indexer`` user. The Wazuh indexer doesn't use ``/tmp`` for these libraries, so hosts that mount ``/tmp`` with ``noexec`` need no additional configuration.

The filesystem that holds ``/var/lib/wazuh-indexer/tmp`` must not be mounted with ``noexec``. Otherwise, the Wazuh indexer fails to start, and ``/var/log/wazuh-indexer/wazuh-cluster.log`` shows an error similar to the following:

.. code-block:: none

   Caused by: java.lang.UnsatisfiedLinkError: /var/lib/wazuh-indexer/tmp/bc-fips-jni_12552204897534/libbc-probe.so: /var/lib/wazuh-indexer/tmp/bc-fips-jni_12552204897534/libbc-probe.so: failed to map segment from shared object

Changing the temporary directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the filesystem that holds ``/var/lib/wazuh-indexer`` must be mounted with ``noexec``, point the Wazuh indexer to a directory on a filesystem without ``noexec``. Run the following commands as root on each affected Wazuh indexer node. Replace ``<TMP_DIR>`` with the new directory, for example, ``/opt/wazuh-indexer-tmp``.

#. Create the directory:

   .. code-block:: console

      # install -d -o wazuh-indexer -g wazuh-indexer -m 750 <TMP_DIR>

   The directory must be owned by ``wazuh-indexer``. Otherwise, the Wazuh indexer fails to start with an ``AccessDeniedException`` error.

#. Set the new directory in the service environment file, ``/etc/default/wazuh-indexer`` on Debian-based systems or ``/etc/sysconfig/wazuh-indexer`` on RPM-based systems:

   .. code-block:: ini

      OPENSEARCH_TMPDIR=<TMP_DIR>

   Don't set the variable in the systemd unit file. The unit file belongs to the package and is replaced on upgrades.

#. Restart the Wazuh indexer:

   .. code-block:: console

      # systemctl restart wazuh-indexer

#. Verify that the Wazuh indexer uses the new directory:

   .. code-block:: console

      # tr '\0' '\n' < /proc/$(systemctl show -p MainPID --value wazuh-indexer)/cmdline | grep java.io.tmpdir

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      -Djava.io.tmpdir=/opt/wazuh-indexer-tmp

On Debian-based systems, also add a ``needrestart`` rule for the new directory, as described in :ref:`Using a custom temporary directory <wazuh_indexer_hardened_custom_tmpdir>`.

Service restarts by needrestart
-------------------------------

On Debian and Ubuntu, ``needrestart`` runs after every ``apt`` operation and restarts the services it considers to be running outdated code. On Ubuntu 24.04 and later, it restarts them without asking for confirmation. The Wazuh indexer deletes the native libraries from its temporary directory right after loading them, so ``needrestart`` would consider it outdated and restart it after every ``apt`` operation, even one unrelated to the Wazuh indexer.

To prevent this, the Wazuh indexer DEB package installs ``/etc/needrestart/conf.d/wazuh-indexer.conf``. This file tells ``needrestart`` to ignore the libraries mapped from the default temporary directory:

.. code-block:: perl

   push(@{$nrconf{blacklist_mappings}}, qr(^/var/lib/wazuh-indexer/tmp/));

``needrestart`` keeps every other check on the Wazuh indexer service, so an update of a system library that the Wazuh indexer uses, such as ``libc``, still restarts it. The file is a configuration file of the package: upgrades keep local changes to it, removing the package keeps it, and purging the package deletes it. RPM-based systems don't use ``needrestart`` and aren't affected.

.. warning::

   Don't exclude the Wazuh indexer service from ``needrestart`` with ``$nrconf{blacklist_rc}``. This setting also prevents legitimate restarts, such as after a ``libc`` update.

.. _wazuh_indexer_hardened_custom_tmpdir:

Using a custom temporary directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The rule above names the default temporary directory. If you change ``OPENSEARCH_TMPDIR``, ``needrestart`` restarts the Wazuh indexer after every ``apt`` operation again. To prevent this, add a rule for the new directory in a separate file, so the package configuration file stays unchanged. Replace ``<TMP_DIR>`` with the directory set in ``OPENSEARCH_TMPDIR``:

.. code-block:: console

   # echo 'push(@{$nrconf{blacklist_mappings}}, qr(^<TMP_DIR>/));' > /etc/needrestart/conf.d/wazuh-indexer-tmpdir.conf

Verify that ``needrestart`` no longer lists the Wazuh indexer service:

.. code-block:: console

   # needrestart -b

The output must not contain the following line:

.. code-block:: none

   NEEDRESTART-SVC: wazuh-indexer.service
