.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to create, list, revoke, purge, and decode Wazuh enrollment tokens with wazuh-manager-authd and the Wazuh manager API.

Enrollment token command-line options and API equivalents
=========================================================

Enrollment tokens let new Wazuh agents enroll without the shared enrollment password. You create, list, revoke, purge, and decode them with the token options of ``/var/wazuh-manager/bin/wazuh-manager-authd`` or with the Wazuh manager API. For what an enrollment token is and how an agent uses it, see :ref:`Agent enrollment service <agent_enrollment_service>`.

Keep these rules in mind:

-  Only the master node mints, revokes, and purges tokens. A worker node answers these requests with error ``9015``.
-  Every command except ``--show-token`` connects to the local socket of the running ``wazuh-manager-authd`` daemon, so the daemon must be running.
-  Run the commands as root or as a member of the ``wazuh-manager`` group, the users that can open that socket.
-  Each invocation performs one action.

Synopsis
--------

Each line shows one action and its options. Square brackets mark optional arguments.

.. code-block:: none

   /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <HOST> [--port <PORT>] [--prefix <PREFIX>] [--ttl <DURATION>] [--max-uses <N>] [--description <TEXT>] [--embed-ca] [--no-credential]
   /var/wazuh-manager/bin/wazuh-manager-authd --list-enrollment-tokens
   /var/wazuh-manager/bin/wazuh-manager-authd --revoke-enrollment-token <TOKEN_ID>
   /var/wazuh-manager/bin/wazuh-manager-authd --purge-enrollment-tokens [--all] [--force]
   /var/wazuh-manager/bin/wazuh-manager-authd --show-token[=<TOKEN>] [--token-file <PATH>]

What a token contains
---------------------

A token is a single string. It tells the agent where to connect, which certificate authority (CA) to trust, and, optionally, which credential to present.

The token has these parts:

-  **Address**: Where to connect, as ``<HOST>[:<PORT>][/<PREFIX>]``. The default port ``1517`` and the default prefix ``wazuh-manager`` are left out, so a token for a default deployment carries only the host name.
-  **Trust anchor**: Either a pin or the CA itself. The pin is the SHA-256 digest of the CA certificate's public key. With ``--embed-ca``, the token carries the CA certificates instead.
-  **Credential**: The token ID followed by the token secret. The agent uses it to prove it holds the token.

A token minted with ``--no-credential`` has no credential. It only tells the agent where to connect and which CA to trust. The token text carries no token ID, so it cannot authenticate an enrollment. The agent enrolls only if the Wazuh manager configuration allows enrollment without a credential.

The token itself isn't signed, and it reveals the credential to anyone who reads it. Distribute it through a trusted channel.

Creating a token
----------------

Each token sets where agents connect, how long they can enroll with it, and the number of enrollments it allows.

Run ``--create-enrollment-token`` on the master node:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <MASTER_NODE_ADDRESS>

Where:

-  ``<MASTER_NODE_ADDRESS>`` is the DNS name or IP address the agents connect to. It must be a subject alternative name (SAN) of the master node's agent listener certificate, ``/etc/wazuh-manager/certs/remoted.pem`` by default.

+--------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| Option                   | Description                                                            | Default                                                                |
+==========================+========================================================================+========================================================================+
| ``--address <HOST>``     | Required. The name or IP address the agents connect to. It must be a   | None.                                                                  |
|                          | SAN of the master node's listener certificate. At most 253 characters, |                                                                        |
|                          | with no control characters.                                            |                                                                        |
+--------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| ``--port <PORT>``        | Listener port to write into the token when it differs from the         | The running ``remote.https.port`` value, ``1517`` by default.          |
|                          | configured one. Accepts ``1`` to ``65535``.                            |                                                                        |
+--------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| ``--prefix <PREFIX>``    | URL prefix to write into the token. Use it only when it differs from   | The running ``remote.https.global_prefix`` value, ``wazuh-manager`` by |
|                          | the configured one. At most 256 characters, with no control            | default.                                                               |
|                          | characters.                                                            |                                                                        |
+--------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| ``--ttl <DURATION>``     | Token lifetime, as a positive number with an optional unit: ``d``,     | 30 days.                                                               |
|                          | ``h``, ``m``, or ``s``. For example, ``30d``, ``12h``, ``45m``, or     |                                                                        |
|                          | ``90s``. At most 3650 days (315360000 seconds). ``0`` isn't accepted;  |                                                                        |
|                          | leave the option out to get the default.                               |                                                                        |
+--------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| ``--max-uses <N>``       | Number of enrollments the token allows. Accepts ``0`` to               | Unlimited.                                                             |
|                          | ``1000000000``. ``0`` means unlimited.                                 |                                                                        |
+--------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| ``--description <TEXT>`` | Free text that ``--list-enrollment-tokens`` shows. At most 256         | None.                                                                  |
|                          | characters, with no control characters such as newlines or tabs.       |                                                                        |
|                          | Spaces and ordinary punctuation are allowed.                           |                                                                        |
+--------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| ``--embed-ca``           | Carry the CA certificates of ``remote.https.ca_certificate`` in the    | Off. The token carries a pin.                                          |
|                          | token instead of a pin. The agent then doesn't need to fetch the CA.   |                                                                        |
|                          | The bundle can't exceed 64 KiB. A private key in the same file is      |                                                                        |
|                          | never included.                                                        |                                                                        |
+--------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| ``--no-credential``      | Mint a token with no credential: address and trust anchor only.        | Off. The token carries a credential.                                   |
+--------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+

Output
^^^^^^

The command prints the token alone on standard output, so you can capture it in a variable.

It prints these details on standard error:

-  ``id``: The token ID. Use it with ``--revoke-enrollment-token``.
-  ``endpoint``: The address written into the token.
-  ``expires``: The expiry time in UTC, followed by the same time in seconds since the epoch.
-  ``pin``: The pin in hexadecimal. It appears only when the token pins the CA instead of embedding it.
-  ``credential``: ``yes``, or ``no`` for a ``--no-credential`` token.

The Wazuh manager shows the token text only once. No command lists or retrieves it again.

Address checks
^^^^^^^^^^^^^^

The Wazuh manager checks each request against the certificate files of the master node's agent listener, as they are on disk. A request that fails a check gets error ``9025``.

The request must pass these checks:

-  The ``--address`` value must match a SAN of ``remote.https.certificate``. A DNS name can't match a partial wildcard or the certificate subject. An IP address matches only IP address SAN entries.
-  The certificate must name something other than loopback addresses. A certificate whose SANs are all loopback, or that has no SAN extension, is refused. ``--address localhost`` works when the certificate also names a reachable address.
-  A certificate in ``remote.https.ca_certificate`` must have signed the listener certificate.

In a cluster, these checks run on the master node against its own files. A token for a worker node's address is refused unless the master node's certificate also carries that address. See :ref:`Agent enrollment service <agent_enrollment_service>`.

An IP address is accepted with a warning. The command prints it on standard error after the token details:

.. code-block:: none
   :class: output

   WARNING: the token address '<ADDRESS>' is an IP address: the token stops working if the manager's address changes. Use a DNS name if the manager's IP address can change.

The Wazuh manager also logs the warning in ``/var/wazuh-manager/logs/wazuh-manager.log``.

Listing tokens
--------------

The list shows the state and use count of every token in the token store.

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --list-enrollment-tokens

The command prints one row per token with these columns.

+-----------------+--------------------------------------------------------------------+
| Column          | Content                                                            |
+=================+====================================================================+
| ``ID``          | The token ID.                                                      |
+-----------------+--------------------------------------------------------------------+
| ``ENDPOINT``    | The address in the token.                                          |
+-----------------+--------------------------------------------------------------------+
| ``EXPIRES``     | The expiry time in UTC.                                            |
+-----------------+--------------------------------------------------------------------+
| ``USES``        | Uses so far and the limit, for example ``1/5`` or ``1/unlimited``. |
+-----------------+--------------------------------------------------------------------+
| ``REVOKED``     | ``yes`` or ``no``.                                                 |
+-----------------+--------------------------------------------------------------------+
| ``DESCRIPTION`` | The description, or ``-``.                                         |
+-----------------+--------------------------------------------------------------------+

With no tokens, it prints ``no enrollment tokens``. The list never shows a token's credential or text. A worker node answers from its synchronized copy of the token store.

Showing a token
---------------

The ``--show-token`` option decodes a token locally, so you can check what a token contains before you distribute it. It doesn't contact the daemon, so you can run it on any node.

Pass the token in one of these ways:

-  Add it to the option, as ``--show-token=<TOKEN>``. The ``=`` is required, because the command ignores a token given as a separate argument.
-  Name the file that holds it with ``--token-file <PATH>``.
-  Send it on standard input.

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --show-token --token-file <PATH>

Where:

-  ``<PATH>`` is the file that holds the token.

The command prints these fields:

-  ``ver``: The token format version.
-  ``adr``: The address.
-  ``pin``: The pin in hexadecimal, for a pinned token. For a token with an embedded CA, the command prints ``ca subject``, ``ca issuer``, ``ca not before``, ``ca not after``, and ``ca sha256`` lines instead. These lines describe the first certificate in the embedded bundle. The ``ca sha256`` value is the digest of the whole certificate, not the pin.
-  ``id``: The token ID. It appears only when the token carries a credential.
-  ``credential``: ``present`` or ``absent``.

It never prints the credential itself.

Revoking a token
----------------

A revoked token can no longer authorize an enrollment. Revoke a token when you no longer need it or when someone else might have read it.

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --revoke-enrollment-token <TOKEN_ID>

Where:

-  ``<TOKEN_ID>`` is the ID that ``--create-enrollment-token`` printed, or the ``ID`` column of ``--list-enrollment-tokens``.

On success, the command prints ``Enrollment token <TOKEN_ID> revoked.`` The revocation takes effect at once on every node, because the master node checks the token on every enrollment. A second revoke of the same token is harmless. A revoked token stays in the list with ``REVOKED`` set to ``yes`` until you purge it.

Purging tokens
--------------

A purge removes tokens from the store, while a revoke only marks them as revoked.

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --purge-enrollment-tokens

By default, the command removes only tokens that can no longer authorize an enrollment: revoked, expired, or out of uses. It never removes a usable token, even an unused one.

+-------------+---------------------------------------------------------------------+
| Option      | Effect                                                              |
+=============+=====================================================================+
| ``--all``   | Removes every token, including usable ones. The command asks for    |
|             | confirmation with a prompt that ends in ``Continue? [y/N]``. Any    |
|             | answer other than ``y`` or ``Y`` prints ``Aborted.`` and exits with |
|             | status ``1``.                                                       |
+-------------+---------------------------------------------------------------------+
| ``--force`` | Skips the confirmation. Without a terminal, ``--all`` requires      |
|             | ``--force``; otherwise the command refuses and exits with status    |
|             | ``1``.                                                              |
+-------------+---------------------------------------------------------------------+

The command prints ``Removed <N> enrollment token(s); <M> left.`` A purge that finds nothing to remove doesn't rewrite the store. Worker nodes receive the purged store through cluster synchronization.

Limits and refusals
-------------------

Token store limits
^^^^^^^^^^^^^^^^^^

The token store, ``/etc/wazuh-manager/enrollment_tokens.json``, holds at most 5000 usable tokens and at most 7 MiB. When the store is full, a mint first removes the tokens that can no longer be used. It refuses only when 5000 tokens are still usable. The Wazuh manager logs a warning once the store holds 80% of the token limit. Tokens with an embedded CA are larger, so the size limit can apply before the count limit. Run ``--purge-enrollment-tokens`` to make room.

Error 9025
^^^^^^^^^^

The Wazuh manager refuses a mint it can't honor with error ``9025``. The command prints ``ERROR 9025: Enrollment token refused: <REASON>``.

The command line can return these reasons.

+---------------------------------------------------------------------+----------------------------------------------------------------------+
| Reason                                                              | What to do                                                           |
+=====================================================================+======================================================================+
| ``address not in certificate SAN``                                  | Use an address that the master node's listener certificate names. To |
|                                                                     | change the SANs, see the Wazuh manager cluster documentation.        |
+---------------------------------------------------------------------+----------------------------------------------------------------------+
| ``certificate only names loopback``                                 | Issue a listener certificate that names a reachable address.         |
+---------------------------------------------------------------------+----------------------------------------------------------------------+
| ``cannot read the listener certificate '<PATH>'``                   | Check the file that ``remote.https.certificate`` names.              |
+---------------------------------------------------------------------+----------------------------------------------------------------------+
| ``no ca_certificate: cannot read '<PATH>'``                         | Check the file that ``remote.https.ca_certificate`` names.           |
+---------------------------------------------------------------------+----------------------------------------------------------------------+
| ``ca does not sign the listener certificate``                       | Make ``remote.https.ca_certificate`` contain the CA that signed the  |
|                                                                     | listener certificate.                                                |
+---------------------------------------------------------------------+----------------------------------------------------------------------+
| ``the ca_certificate '<PATH>' is too large to embed``               | The CA bundle exceeds 64 KiB. Mint without ``--embed-ca``, or reduce |
|                                                                     | the bundle.                                                          |
+---------------------------------------------------------------------+----------------------------------------------------------------------+
| ``address is longer than the 253 characters accepted``              | Shorten ``--address``.                                               |
+---------------------------------------------------------------------+----------------------------------------------------------------------+
| ``description is longer than the 256 characters accepted``          | Shorten ``--description``.                                           |
+---------------------------------------------------------------------+----------------------------------------------------------------------+
| ``prefix is longer than the 256 characters accepted``               | Shorten ``--prefix``.                                                |
+---------------------------------------------------------------------+----------------------------------------------------------------------+
| ``address contains a control character``, and the same for          | Remove newlines, tabs, and other control characters.                 |
| ``description`` or ``prefix``                                       |                                                                      |
+---------------------------------------------------------------------+----------------------------------------------------------------------+
| ``address does not follow the endpoint grammar``                    | Check the ``--address`` and ``--prefix`` values.                     |
+---------------------------------------------------------------------+----------------------------------------------------------------------+
| ``the enrollment token store is full (5000 tokens in use); purge it | Revoke tokens you no longer need, then run                           |
| before minting again``                                              | ``--purge-enrollment-tokens``.                                       |
+---------------------------------------------------------------------+----------------------------------------------------------------------+
| ``the enrollment token store would grow past the size the manager   | Run ``--purge-enrollment-tokens``.                                   |
| replicates; purge it before minting again``                         |                                                                      |
+---------------------------------------------------------------------+----------------------------------------------------------------------+

The command itself checks ``--ttl``, ``--port``, and ``--max-uses`` before it contacts the daemon. It reports an out-of-range value with its own ``ERROR:`` message instead of ``9025``.

Other errors
^^^^^^^^^^^^

The command prints these errors as ``ERROR <CODE>: <MESSAGE>``.

+----------+------------------------------------------------------------------------+
| Error    | Meaning                                                                |
+==========+========================================================================+
| ``9015`` | You ran a mint, revoke, or purge on a worker node. Run it on the       |
|          | master node.                                                           |
+----------+------------------------------------------------------------------------+
| ``9022`` | The token ID is unknown or has the wrong format.                       |
+----------+------------------------------------------------------------------------+
| ``9029`` | The Wazuh manager failed to write a revocation to the token store. The |
|          | token is already refused on this node. Run the command again.          |
+----------+------------------------------------------------------------------------+

Wazuh manager API equivalents
-----------------------------

The Wazuh manager API offers the same operations as the command line.

+----------------+---------------------------------------------------------------------+
| Operation      | Request                                                             |
+================+=====================================================================+
| Create a token | ``POST /agents/enrollment-tokens``                                  |
+----------------+---------------------------------------------------------------------+
| List tokens    | ``GET /agents/enrollment-tokens``                                   |
+----------------+---------------------------------------------------------------------+
| Get one token  | ``GET /agents/enrollment-tokens?q=id=<TOKEN_ID>``                   |
+----------------+---------------------------------------------------------------------+
| Revoke a token | ``DELETE /agents/enrollment-tokens/<TOKEN_ID>``                     |
+----------------+---------------------------------------------------------------------+
| Purge tokens   | ``DELETE /agents/enrollment-tokens?status=dead`` or ``?status=all`` |
+----------------+---------------------------------------------------------------------+

The role-based access control (RBAC) actions are ``enrollment_token:create``, ``enrollment_token:read``, and ``enrollment_token:delete``. The API returns the token text once and never lists it again. The API has no ``GET /agents/enrollment-tokens/<TOKEN_ID>`` endpoint. An unknown ID in the ``q`` filter returns an empty list.

The API applies the same limits as the command line, except that ``max_uses`` accepts up to ``4294967295``. A request over the ``address``, ``prefix``, ``description``, or ``max_uses`` limit gets HTTP ``400`` naming the field. A ``ttl`` that isn't a positive duration of at most 3650 days gets error ``1411``. The API reports Wazuh manager errors with its own codes.

+----------------------------------+--------------------------------------------------------------------+
| Wazuh manager error              | API error                                                          |
+==================================+====================================================================+
| ``9022``                         | ``1767``                                                           |
+----------------------------------+--------------------------------------------------------------------+
| ``9025``, ``9004``               | ``1768``                                                           |
+----------------------------------+--------------------------------------------------------------------+
| ``9015``                         | ``1769``                                                           |
+----------------------------------+--------------------------------------------------------------------+
| ``9029``                         | ``1771``                                                           |
+----------------------------------+--------------------------------------------------------------------+
| Any other refusal of the request | ``1773``, with the Wazuh manager code and message. Internal errors |
|                                  | ``9001``, ``9002``, ``9003``, and ``9016`` return HTTP ``500``     |
|                                  | instead.                                                           |
+----------------------------------+--------------------------------------------------------------------+

Examples
--------

These examples cover common token tasks. Run them on the master node, except ``--show-token``, which runs on any node.

Create a token for ``<MASTER_NODE_FQDN>`` that expires in 7 days and allows 10 enrollments:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <MASTER_NODE_FQDN> --ttl 7d --max-uses 10 --description "Linux servers, datacenter A"

Where:

-  ``<MASTER_NODE_FQDN>`` is a DNS name in the SANs of the master node's listener certificate.

Create a token that embeds the CA, and save only the token in a file:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <MASTER_NODE_FQDN> --embed-ca > <TOKEN_FILE>

Where:

-  ``<TOKEN_FILE>`` is the file that receives the token. The details still appear on the terminal.

Check what a saved token contains:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --show-token --token-file <TOKEN_FILE>

.. warning::

   This command removes every token, including tokens that agents still need to enroll. No command restores a removed token.

Remove every token without a confirmation prompt, for example from a script:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --purge-enrollment-tokens --all --force

