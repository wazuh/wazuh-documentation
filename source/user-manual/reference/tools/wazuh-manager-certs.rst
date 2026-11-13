.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how wazuh-manager-certs inspects, validates, and publishes the CA bundle that the Wazuh manager serves to Wazuh agents.

.. _wazuh_manager_certs:

wazuh-manager-certs
===================

The ``wazuh-manager-certs`` tool inspects, validates, and publishes the certificate authority (CA) bundle that the Wazuh manager serves to Wazuh agents. By default, the bundle is ``/etc/wazuh-manager/certs/root-ca.pem``, the file that ``remote.https.ca_certificate`` points to. Wazuh agents download it from ``GET /cacerts`` on the Wazuh manager HTTPS listener, port ``1517`` by default.

The tool is the only runtime writer of this bundle. At installation, the :doc:`credential resolver </user-manual/manager/credentials>` creates the bundle as a copy of the manager CA, ``/etc/wazuh-manager/ca/root-ca.pem``, only when it doesn't exist yet. That first copy is unpublished until you run ``stamp`` or ``add`` on the master node.

Keep the following in mind:

-  The tool is installed as ``/var/wazuh-manager/bin/wazuh-manager-certs``, owned by ``root:wazuh-manager`` with mode ``0750``.
-  Run it as root. The writing commands and ``--from-master`` refuse to run otherwise.
-  It isn't a daemon, and it doesn't need the Wazuh manager to be running.
-  It validates the bundle against the listener certificate on disk, ``remote.https.certificate``. This certificate is the one the Wazuh manager loads at its next start, not necessarily the one the running listener presents.
-  The Wazuh manager reloads the bundle on every read. Changes made with the tool take effect without a restart.
-  Output is human-readable text only. There is no JSON output option.

Synopsis
--------

The tool runs one command over the local bundle, pulls the bundle from the master node, or prints its usage or version.

.. code-block:: none

   wazuh-manager-certs [-f <FILE>] [-H <HOME>] <COMMAND> [<ARGUMENT>]

.. code-block:: none

   wazuh-manager-certs [-f <FILE>] [-H <HOME>] --from-master [--master <HOST>] [--port <PORT>]

.. code-block:: none

   wazuh-manager-certs -h | --help | -V | --version

Where:

-  ``<COMMAND>`` is one of the commands in the Commands table.
-  ``<ARGUMENT>`` is the file for ``add`` or the identity for ``remove``.

Commands
--------

The read-only commands, ``inspect`` and ``check``, run on any node. The writing commands, ``add``, ``remove``, ``prune-expired``, and ``stamp``, run only on the master node. The ``--from-master`` option writes the bundle only on a worker node.

+-----------------------+------------------------------------------------------------------------+--------+-------------+
| Command               | Description                                                            | Writes | Runs on     |
+=======================+========================================================================+========+=============+
| ``inspect``           | Describes every certificate in the bundle, plus its publication and    | No     | Any node    |
|                       | whether it is vouched for.                                             |        |             |
+-----------------------+------------------------------------------------------------------------+--------+-------------+
| ``check``             | Validates the bundle without writing anything.                         | No     | Any node    |
+-----------------------+------------------------------------------------------------------------+--------+-------------+
| ``add <FILE>``        | Adds the certificates in ``<FILE>`` to the bundle and publishes a new  | Yes    | Master node |
|                       | generation.                                                            |        |             |
+-----------------------+------------------------------------------------------------------------+--------+-------------+
| ``remove <IDENTITY>`` | Removes every certificate with ``<IDENTITY>`` and publishes a new      | Yes    | Master node |
|                       | generation.                                                            |        |             |
+-----------------------+------------------------------------------------------------------------+--------+-------------+
| ``prune-expired``     | Removes every expired certificate and publishes a new generation. With | Yes    | Master node |
|                       | nothing expired, it writes nothing.                                    |        |             |
+-----------------------+------------------------------------------------------------------------+--------+-------------+
| ``stamp``             | Publishes the current certificates unchanged, under a new generation.  | Yes    | Master node |
+-----------------------+------------------------------------------------------------------------+--------+-------------+
| ``--from-master``     | Downloads the bundle the master node publishes and installs it under   | Yes    | Worker node |
|                       | the master node generation.                                            |        |             |
+-----------------------+------------------------------------------------------------------------+--------+-------------+

inspect
^^^^^^^

The ``inspect`` command describes every certificate in the bundle and the bundle publication status.

It prints these fields for each certificate:

-  ``subject`` and ``issuer``
-  ``notAfter``, with the days remaining
-  ``identity``, in the form ``x509-sha256:<HEX>``
-  ``signsLeaf``, whether the certificate signs the listener certificate on disk

It then prints two fields for the bundle:

-  ``publication``: the generation the bundle carries. An unpublished bundle shows ``0 (unpublished)``.
-  ``vouched``: ``yes`` when the Wazuh manager vouches for the bundle at that publication, ``no`` otherwise.

Use the identity that ``inspect`` prints as the argument of ``remove``.

check
^^^^^

The ``check`` command validates the bundle without writing it.

It checks the following, in this order, and stops at the first failure:

#. Every certificate is a CA and is inside its validity window.

#. The bundle carries at least one certificate and a publication block.

#. The publication hash matches the certificates.

#. A certificate in the bundle signs the listener certificate on disk.

#. The bundle is within the certificate count and byte size limits.

When the bundle is valid, ``check`` prints nothing and exits ``0``. When it rejects the bundle, it prints one line on stderr naming the problem and exits ``1``. It exits ``2`` when it can't read the configuration, the bundle, or the listener certificate.

The ``check`` command also refuses a bundle with no publication block, including the bundle a fresh installation leaves before the first ``stamp`` or ``add``. The Wazuh manager serves that bundle, but announces generation ``0`` to agents, so no agent adopts it. Run ``stamp`` on the master node, or ``--from-master`` on a worker node, to publish it.

add
^^^

The ``add <FILE>`` command appends one or more certificates from ``<FILE>`` and publishes a new generation.

It refuses the following and writes nothing:

-  A certificate already in the bundle, or repeated within ``<FILE>``, by identity
-  A certificate that isn't a CA
-  A certificate that is expired or not yet valid
-  A result over the bundle limits, with a message that names the count or the bytes
-  A result where no certificate signs the listener certificate on disk
-  A ``<FILE>`` that is malformed or carries no certificates

On success, ``add`` prints the number of certificates added and the new generation on stdout.

remove
^^^^^^

The ``remove <IDENTITY>`` command removes every certificate with that identity, not just the first, and publishes a new generation. It refuses to remove the only CA that signs the listener certificate on disk.

If the bundle doesn't carry ``<IDENTITY>``, ``remove`` exits ``1``, writes nothing, and publishes no new generation.

prune-expired
^^^^^^^^^^^^^

The ``prune-expired`` command removes every expired certificate and publishes a new generation. It applies the same count, byte size, and signing guards as the other writing commands. As a result, it can't leave the listener certificate without a CA that signs it.

When nothing has expired, ``prune-expired`` writes nothing, publishes nothing, prints ``nothing to prune``, and exits ``0``. This behavior makes it safe to run from a scheduled job, because it doesn't send every agent back to ``GET /cacerts`` for an unchanged bundle. On that same path, it warns when the bundle isn't vouched for and tells you to run ``stamp``.

stamp
^^^^^

The ``stamp`` command publishes the certificates already in the bundle, unchanged, under a new generation.

Use it in these cases:

-  To publish the plain bundle that a fresh installation creates
-  To publish a bundle you placed by hand
-  To fix a Wazuh manager warning that the bundle isn't published, such as after an edit outside the tool or a ``Content-SHA256`` mismatch

The ``stamp`` command rebuilds the publication block from the certificates actually in the file. It still applies the certificate count, byte size, and signing guards.

How the writing commands publish
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The four writing commands publish the bundle the same way, so a concurrent or refused write never leaves a partial bundle.

They share the following behavior:

-  They take an exclusive lock on ``<BUNDLE>.lock``, a permanent empty file beside the bundle, while they read, validate, and replace the bundle. ``inspect`` and ``check`` don't take the lock.
-  They write the new bundle to a temporary file and rename it over the bundle, keeping its owner and mode. A refused write leaves the bundle exactly as it was.
-  They refuse a bundle that is a symbolic link.
-  None of them creates the bundle. If the bundle doesn't exist, they exit ``2`` with ``bundle not found at <PATH>; provision it and run 'wazuh-manager-certs stamp'``.
-  The new generation is the current time in whole seconds, and it must be greater than the current generation. When the current generation equals the current second, or no publication block exists, the tool waits up to 3 seconds for the next second. If the system clock is behind the current generation, the write is refused with ``clock is behind the current publication <N>``.

Options
-------

The options select the configuration file and the Wazuh manager home, set the master node address for ``--from-master``, and print help or version information.

+-----------------------+------------------------------------------------------------------------+
| Option                | Description                                                            |
+=======================+========================================================================+
| ``-f <FILE>``         | Configuration file to read. The default is                             |
|                       | ``/etc/wazuh-manager/wazuh-manager.conf``, whatever the home.          |
+-----------------------+------------------------------------------------------------------------+
| ``-H <HOME>``         | Wazuh manager home used to resolve relative ``ca_certificate`` and     |
|                       | ``certificate`` paths. The default is ``$WAZUH_MANAGER_HOME``, or else |
|                       | the parent of the ``bin/`` directory holding the binary.               |
+-----------------------+------------------------------------------------------------------------+
| ``--from-master``     | Worker nodes only. Downloads the master node bundle and installs it on |
|                       | this node. It is an option, not a command, and takes no argument.      |
|                       | Combined with a command, it is a usage error.                          |
+-----------------------+------------------------------------------------------------------------+
| ``--master <HOST>``   | Master node address to download from. The default is the first entry   |
|                       | of ``cluster.nodes``. Valid only with ``--from-master``.               |
+-----------------------+------------------------------------------------------------------------+
| ``--port <PORT>``     | Master node HTTPS listener port. The default is ``remote.https.port``. |
|                       | Valid only with ``--from-master``.                                     |
+-----------------------+------------------------------------------------------------------------+
| ``-h``, ``--help``    | Prints the usage text and exits ``0``.                                 |
+-----------------------+------------------------------------------------------------------------+
| ``-V``, ``--version`` | Prints the version and exits ``0``.                                    |
+-----------------------+------------------------------------------------------------------------+

The ``-h`` and ``-V`` options never read the configuration, so they work without a Wazuh manager home set.

The tool exits ``1`` with a usage error when you pass ``--master`` or ``--port`` without ``--from-master`` or without a value.

Limits
------

A bundle can carry at most 6 certificates. Its certificates, serialized without the publication block, can take at most 8191 bytes. It must also carry at least one certificate.

Every writing command and ``--from-master`` refuses a result over either limit, with exit ``1``. The message names the observed count or byte size against the limit, for example ``7 certificates (max 6)``.

Worker nodes
------------

On a worker node, the writing commands refuse to run. They exit ``2`` with ``this node is a cluster worker; run 'wazuh-manager-certs --from-master' instead``. Use ``--from-master`` to install the bundle the master node publishes.

Download the bundle from the master node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``--from-master`` option downloads ``https://<HOST>:<PORT><GLOBAL_PREFIX>/cacerts`` and installs the bundle under the generation the master node announces in the ``Wazuh-CA-Generation`` header.

By default, the URL parts come from this node's configuration:

-  ``<HOST>`` is the first entry of ``cluster.nodes``. ``--master`` overrides it.
-  ``<PORT>`` is ``remote.https.port``. ``--port`` overrides it.
-  ``<GLOBAL_PREFIX>`` is ``remote.https.global_prefix``. The default prefix gives ``/wazuh-manager/cacerts``.

A bare IPv6 address, such as ``--master ::1``, is bracketed for you.

The tool verifies the master node certificate against this node's own bundle, including its name, and nothing else. The host you use must be a subject alternative name of the master node listener certificate. No option relaxes this verification.

The result depends on the generation the master node announces:

-  Higher than the local one: the tool installs the bundle and prints ``installed <N> certificate(s) from <URL>; published generation <GENERATION>``.
-  Equal, with the same certificates: the tool writes nothing and prints ``already at generation <GENERATION>; nothing to do``.
-  Equal, with different certificates: the tool repairs the local bundle under that same generation.
-  Lower than the local one: the tool refuses with exit ``1``.
-  ``0``, because the master node never stamped its bundle: the tool refuses with exit ``1``. Run ``stamp`` on the master node first.

A local bundle with no publication block counts as generation ``0``, so any non-zero generation is installed.

The ``--from-master`` option still validates the downloaded bundle against this node's own listener certificate and the bundle limits. On a node whose ``cluster.node_type`` isn't ``worker``, it exits ``2`` and writes nothing.

Install the bundle without the master node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the download fails, the tool exits ``2``. The address checks also exit ``2``, before the tool connects. For example, they fail when ``cluster.nodes`` is empty and you don't pass ``--master``. They also fail when the port isn't a number from 1 to 65535.

Follow these steps on the worker node to install the bundle without the network.

.. warning::

   The first step replaces the CA bundle that this worker node serves to its Wazuh agents. Copy the bundle only from the master node.

#. Copy the master node bundle to this node, then use ``cp`` to copy it over this node's bundle, which keeps the bundle owner and mode.

   .. code-block:: console
      :emphasize-lines: 1

      # scp root@<MASTER_NODE_ADDRESS>:/etc/wazuh-manager/certs/root-ca.pem /tmp/root-ca-master.pem
      # cp /tmp/root-ca-master.pem /etc/wazuh-manager/certs/root-ca.pem
      # rm /tmp/root-ca-master.pem

   Replace ``<MASTER_NODE_ADDRESS>`` with an address of the master node. The bundle is ``/etc/wazuh-manager/certs/root-ca.pem`` by default. If ``remote.https.ca_certificate`` names another file on either node, use that path instead.

#. Validate the copied bundle:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-certs check

   The command prints nothing and exits ``0`` when the bundle is valid.

Every writing command, including ``add``, is refused on a worker node.

CA rotation
-----------

A CA rotation uses the commands in a fixed order, so Wazuh agents trust the new CA before the listener certificate changes.

The commands fit together as follows:

-  ``add`` on the master node adds the new CA, so the bundle carries both the old and new CAs.
-  ``--from-master`` on each worker node installs the same bundle and generation.
-  An overlap window follows, so every Wazuh agent can download the new bundle before any listener certificate changes. It lasts longer than the longest disconnection your Wazuh agents tolerate.
-  After every node restarts with a listener certificate signed by the new CA, ``remove`` on the master node drops the old CA. ``--from-master`` then runs again on each worker node.
-  ``prune-expired`` removes expired CAs at any time.

Wazuh agents learn about each new generation from the ``ca_generation`` field of the Wazuh manager keepalive response. An agent that sees a generation higher than the one it holds downloads the bundle from ``GET /cacerts``. Agents only adopt a strictly greater generation.

The order of these steps matters. See CA rotation in the Wazuh manager cluster documentation for the full procedure.

Exit status
-----------

The exit status tells a script whether a command succeeded, rejected the bundle, or failed to run in its environment.

+-------+------------------------------------------------------------------------+
| Code  | Meaning                                                                |
+=======+========================================================================+
| ``0`` | Success. This includes ``check`` on a valid bundle, ``prune-expired``  |
|       | with nothing to prune, ``--from-master`` already at the master node    |
|       | generation, and ``-h`` or ``-V``.                                      |
+-------+------------------------------------------------------------------------+
| ``1`` | The bundle or a certificate was rejected, with the cause on stderr.    |
|       | Also an identity that ``remove`` can't find, or a usage error such as  |
|       | an unknown option, an unknown command, or a missing argument.          |
+-------+------------------------------------------------------------------------+
| ``2`` | Environment error: the configuration, bundle, listener certificate, or |
|       | input file can't be read or parsed. Also not running as root, a        |
|       | writing command on a worker node, ``--from-master`` on a node that     |
|       | isn't a worker, or a failed write. For ``--from-master``, also an      |
|       | empty local bundle, an unusable master node address or port, an        |
|       | unreachable master node, a failed certificate verification, or an      |
|       | invalid response.                                                      |
+-------+------------------------------------------------------------------------+

As a rule, what the tool can't read or parse is exit ``2``. What it reads fine but doesn't accept is exit ``1``.

Examples
--------

The examples show common commands and their output on the master node and on a worker node.

Inspect the bundle
^^^^^^^^^^^^^^^^^^

The ``inspect`` command lists every certificate in the bundle and shows whether the bundle is published and vouched for.

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-certs inspect

The command output looks similar to this:

.. code-block:: none
   :class: output

   subject: /CN=root-ca-2026
   issuer: /CN=root-ca-2026
   notAfter: 2027-09-18T00:00:00Z (365 days remaining)
   identity: x509-sha256:3f9c1e...
   signsLeaf: yes

   subject: /CN=root-ca-2025
   issuer: /CN=root-ca-2025
   notAfter: 2026-12-01T00:00:00Z (74 days remaining)
   identity: x509-sha256:7ab1de...
   signsLeaf: no

   publication: 1758150000
   vouched: yes

Publish the bundle after a fresh installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A fresh installation leaves an unpublished bundle, so Wazuh agents don't adopt it until you publish it on the master node.

On a fresh installation, ``check`` reports the bundle as unpublished:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-certs check

The command output looks similar to this:

.. code-block:: none
   :class: output

   wazuh-manager-certs: check: no publication block (unpublished): remoted serves it but tells agents this manager has no published bundle (generation 0); publish it with 'wazuh-manager-certs stamp' (on a worker, 'wazuh-manager-certs --from-master')

Publish it on the master node:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-certs stamp

The command output looks similar to this:

.. code-block:: none
   :class: output

   stamped <N> certificate(s); published generation <GENERATION>

Where:

-  ``<N>`` is the number of certificates in the bundle.
-  ``<GENERATION>`` is the new generation, the current time in seconds since the Unix epoch.

Add a new CA
^^^^^^^^^^^^

The ``add`` command publishes a new CA next to the current one, the first step of a CA rotation.

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-certs add <NEW_CA_FILE>

The command output looks similar to this:

.. code-block:: none
   :class: output

   added 1 certificate(s); published generation <GENERATION>

Where:

-  ``<NEW_CA_FILE>`` is the path to a PEM file with the new CA certificate.
-  ``<GENERATION>`` is the new generation, the current time in seconds since the Unix epoch.

Remove a CA
^^^^^^^^^^^

The ``remove`` command drops an old CA after every node presents a listener certificate signed by the new CA.

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-certs remove <IDENTITY>

The command output looks similar to this:

.. code-block:: none
   :class: output

   removed 1 certificate(s); published generation <GENERATION>

Where:

-  ``<IDENTITY>`` is the certificate identity that ``inspect`` prints, in the form ``x509-sha256:<HEX>``.
-  ``<GENERATION>`` is the new generation, the current time in seconds since the Unix epoch.

Install the master bundle on a worker node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``--from-master`` option keeps the worker node bundle identical to the master node bundle.

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-certs --from-master

The command output looks similar to this:

.. code-block:: none
   :class: output

   installed 2 certificate(s) from https://10.0.0.1:1517/wazuh-manager/cacerts; published generation 1789840456

To override the master node address and port:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-certs --from-master --master <MASTER_NODE_ADDRESS> --port <PORT>

Where:

-  ``<MASTER_NODE_ADDRESS>`` is an address of the master node HTTPS listener. It must be a subject alternative name of the master node listener certificate.
-  ``<PORT>`` is the master node HTTPS listener port, ``1517`` by default.

