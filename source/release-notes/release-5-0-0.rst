.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 5.0.0 has been released. Check out our release notes to discover the changes and additions of this release.

5.0.0 Release notes - TBD
=========================

This section lists the changes in version 5.0.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#38260 <https://github.com/wazuh/wazuh/issues/38260>`__ Added HTTPS communication between Wazuh agents and the manager: a new HTTPS transport, protocol, and control plane (connection, configuration, statistics, task dispatch, remote upgrade, and event ingestion) replacing the legacy MQ/DGRAM-based agent-manager protocol end to end.
-  `#31295 <https://github.com/wazuh/wazuh/issues/31295>`__ Added cluster-by-default deployment model: all Wazuh Server installations now run as a cluster node, removing the distinction between clustered and non-clustered deployments. The ``cluster.disabled`` configuration option has been removed.
-  `#33269 <https://github.com/wazuh/wazuh/issues/33269>`__ Added stateless metadata enrichment in ``remoted``, centralizing event metadata handling for stateless messages and removing the dependency on ``wazuh-db`` for that ingestion path.
-  `#33493 <https://github.com/wazuh/wazuh/issues/33493>`__ Added Engine enrichment support: IOC matching, GeoIP lookup, and event filters.
-  `#34477 <https://github.com/wazuh/wazuh/issues/34477>`__ Added Engine adaptation tier 2: raw archives handling, uncategorized event routing, input-level throttling, and internal metrics exposure.
-  `#35623 <https://github.com/wazuh/wazuh/issues/35623>`__ Added CVSS v4.0 support to the Vulnerability Scanner.
-  `#35771 <https://github.com/wazuh/wazuh/issues/35771>`__ Added Engine metrics collection, normalization, and indexing pipeline.
-  `#36000 <https://github.com/wazuh/wazuh/issues/36000>`__ Added new CVE 5.0 schema fields to the Vulnerability Detector content model.
-  `#35579 <https://github.com/wazuh/wazuh/issues/35579>`__ Added manager watermarks.
-  `#37052 <https://github.com/wazuh/wazuh/issues/37052>`__ Added byte-based capacity limits to ``wazuh-manager-remoted``.
-  `#37706 <https://github.com/wazuh/wazuh/issues/37706>`__ Added default API role mappings for the indexer users ``wazuh-admin``, ``wazuh-readonly`` and ``wazuh-demo``.
-  `#38023 <https://github.com/wazuh/wazuh/issues/38023>`__ Added the ``POST /config`` HTTPS endpoint, which receives an agent's reported configuration and indexes it into ``wazuh-agent-config``.
-  `#38024 <https://github.com/wazuh/wazuh/issues/38024>`__ Added the ``POST /stats`` HTTPS endpoint, which persists the statistics an agent reports as one document per agent in the ``wazuh-agent-stats`` index, replacing the previous report on every push.
-  `#38007 <https://github.com/wazuh/wazuh/issues/38007>`__ Added legacy ``remote_upgrade`` task delivery in ``remoted``: a polling thread pushes pending Task Manager tasks to connected agents older than v5.0.0 over their existing session using the legacy six-step WPK push, gated on ``remoted``'s HTTPS ``verification_mode``.
-  `#38157 <https://github.com/wazuh/wazuh/issues/38157>`__ Added installation-time variables to customize the default ``<remote>`` configuration on source, DEB, and RPM manager installations.
-  `#38553 <https://github.com/wazuh/wazuh/issues/38553>`__ Added the ``PUT /agents/scan/vulnerability`` endpoint to trigger an on-demand vulnerability scan for one agent, a list of agents, or all agents.
-  `#38589 <https://github.com/wazuh/wazuh/issues/38589>`__ Added recurring manager tasks to the Task Manager: the agent disconnection sweep, the deletion of long-disconnected agents, and manager log rotation now run as durable, retried tasks inside ``wazuh-manager-modulesd``. Their resolved settings are reported by ``GET /manager/configuration/wmodules/wmodules``.
-  `#38862 <https://github.com/wazuh/wazuh/issues/38862>`__ Added a warning logged by ``wazuh-manager-apid`` on every start for each API default user (``wazuh``, ``wazuh-wui``) whose password is still the one shipped with the package, pointing at ``bin/rbac_control change-password``. The API starts either way.
-  `#38992 <https://github.com/wazuh/wazuh/issues/38992>`__ Added the ``remote.https.ca_certificate`` option, naming the CA that signs the HTTPS agent listener certificate (default ``etc/certs/root-ca.pem``), and the unauthenticated ``GET /cacerts`` endpoint that serves it: ``200`` with the PEM, ``404`` when the file is missing, ``503`` (``ca_mismatch``) when it does not sign the served certificate. ``wazuh-manager-remoted`` now evaluates its listener certificate at start and every 24 hours — a WARN under 30 days to expiry, an ERROR once expired or when the CA and the certificate diverge — and exposes ``remoted.cacerts.*``, ``remoted.server.tls.cert_expiry_days`` and ``remoted.server.tls.ca_matches_leaf``, projected by ``GET /cluster/{node_id}/daemons/stats``.
-  `#38993 <https://github.com/wazuh/wazuh/issues/38993>`__ Added enrollment tokens: an operator mints a token on the master (``wazuh-manager-authd --create-enrollment-token --address <host>``, or ``POST /agents/enrollment-tokens`` with the new RBAC actions ``enrollment_token:create/read/delete``) that names the manager, pins its CA and carries a one-time-issued credential; a new agent pastes it and enrolls over ``POST /enroll`` on port 1517 with a ``wazuh-enroll+jwt`` bearer whose ``kid`` is the token id, without the shared enrollment password. Tokens have a TTL, an optional use cap and a description, are listed and revoked from the CLI or the API (``GET``/``DELETE /agents/enrollment-tokens``), live in ``etc/enrollment_tokens.json`` (written by the master only, replicated to the workers by the cluster like ``client.keys``), and are refused with ``9022``/``9023``/``9024`` (``403`` on ``/enroll``) when unknown or revoked, expired, or out of uses — a revoked token may equally be refused earlier, as ``remoted``'s uniform ``401``, when its own replica already knows: both answers are correct and which one an agent sees depends on who notices first.
-  `#38993 <https://github.com/wazuh/wazuh/issues/38993>`__ Added a per-agent re-enrollment secret: every enrollment answers a fifth field, ``reenroll_secret`` (64 hex chars, stored in ``global.db`` only, never in ``client.keys``), and an agent that presents a ``wazuh-enroll+jwt`` bearer whose ``kid`` is its own id, signed with the key derived from that secret, keeps its id and receives a fresh key and a fresh secret — no deletion, no indexer purge (``global set-agent-credentials``). The master verifies the bearer (``9026``/``9027``/``9028``) with the same clock window as ``remoted`` (``remoted.jwt_max_age``/``remoted.jwt_clock_skew``). There is no upgrade path for a ``global.db`` created before the column: that database is recreated, and rebuilding its agent rows from ``client.keys`` does not restore the secrets — ``client.keys`` never held them — so those agents must enroll again.
-  `#38994 <https://github.com/wazuh/wazuh/issues/38994>`__ Added the RBAC action ``cluster:read_secrets``, now the only thing that returns the enrollment password and the cluster key in clear through ``GET /cluster/local/config`` and the two node configuration endpoints. Until now any caller allowed to *write* the configuration (``cluster:update_config``) could read those values as a side effect, and the disclosure left no record: it is now granted by the new default policy ``secrets_read``, held only by ``administrator``, and checked against the node that answers -- a grant over one node does not uncover another's -- and every disclosure is logged as ``secret_read`` with the user and the fields, never the value, in ``api.log`` for the local read and in the answering node's ``cluster.log`` for the forwarded ones. ``cluster_admin`` and ``wazuh_indexer_admin`` no longer see them in clear, and an ``rbac.db`` created before this change does not receive the new policy, so its ``administrator`` sees the values masked until the database is recreated or the policy is added. The masking also fails closed: a failure while masking now fails the request instead of returning the unmasked payload.
-  `#38994 <https://github.com/wazuh/wazuh/issues/38994>`__ Added ``wazuh-manager-authd --purge-enrollment-tokens [--all] [--force]`` and ``DELETE /agents/enrollment-tokens?status=dead | all`` to remove enrollment tokens from the store, which until now only ever grew: revoking marks a token and leaves it listed, purging removes it. The default scope takes only the tokens that can no longer authorise an enrollment (revoked, expired or out of uses) and never one that is merely unused. The store is now bounded at 5000 tokens and 7 MiB of file, whichever binds first, one MiB under the size above which the managers' read-only replica stops accepting it; a mint that finds the store full purges the dead entries by itself and is only refused (``9025``) when that many tokens are genuinely in use.
-  `#39319 <https://github.com/wazuh/wazuh/issues/39319>`__ Added CA bundle rotation to ``wazuh-manager-remoted``: ``etc/certs/root-ca.pem`` may now carry more than one CA behind a ``##`` publication block (``Publication``, ``Content-SHA256``, ``Updated``, ``Written by``) that ``remoted`` parses and vouches for — recomputing the hash over the certificates it read and checking that the served leaf CHAINS to one of them (a real ``X509_verify_cert()`` validation: the leaf's own issuer, self-signed, ``CA:TRUE`` and within its validity window — a CA that merely signs the leaf is refused, and so is the ``GET /cacerts`` request, with ``503 ca_mismatch``), at most 6 certificates and 8191 bytes — before advertising it; an unvouched or unpublished bundle is still served, only announced as ``0``. ``POST /control``'s ``notify`` response gains ``ca_generation`` (the vouched publication, ``0`` unpublished, ``null`` no servable bundle) and every ``GET /cacerts`` ``200`` carries a matching ``Wazuh-CA-Generation`` header, so an agent can confirm a refresh landed the rotation ``notify`` announced. A private record under ``var/run/remoted-ca-bundle/`` remembers the last bundle served and logs once per change (first publication, a plain file replacing a published one, the block stripped, a block present but refused by a guard), never distributed. A 4.x agent upgraded past v5.0.0 now receives over the legacy WPK channel only the CA that the currently served leaf chains to, re-serialised as a single certificate, instead of the raw configured file. Adds the ``bin/wazuh-manager-certs`` CLI, the bundle's only writer: ``inspect``/``check`` read and validate it without touching it; ``add``/``remove``/``prune-expired``/``stamp`` publish a new generation under an exclusive lock and an atomic write, each refusing on a cluster worker; and ``--from-master`` lets a worker pull its master's published bundle over HTTPS, verified against its own bundle, under the generation the master announced — repairing a bundle that announces that generation without carrying its certificates, instead of reporting it as up to date.
-  `#39109 <https://github.com/wazuh/wazuh/issues/39109>`__ Added ``tools/migration/wazuh-migrate-identity.py``, which carries a 4.x manager's agents, groups, group configuration, enrollment password and API users into a fresh 5.0 installation. It reads the identity out of the stopped 4.x manager's files and recreates it on the 5.0 manager through the manager's own API, so the manager validates every agent and group and writes ``client.keys`` and the registry itself, then compares the result against what it carried.
-  `#39554 <https://github.com/wazuh/wazuh/issues/39554>`__ Added a credential resolution ladder, run from ``postinst``/``%post``/``install.sh`` at installation and again from ``wazuh-manager-control start``, which is what the systemd unit runs. For each credential it takes, in order, what is already in the manager's own store, then a key set in ``/etc/wazuh/credentials.env`` or the environment (the environment wins), then -- only for what the manager owns -- a generated value published back to that file. It owns ``WAZUH_MANAGER_API_PASSWORD`` and ``WAZUH_MANAGER_WUI_PASSWORD``, seeded into ``rbac.db`` through stdin and never argv; it only consumes ``WAZUH_INDEXER_MANAGER_PASSWORD``, which it stores in its keystore and never generates or publishes. The installer always exits ``0`` and checks nothing, because the answer changes between the two moments and only the answer at start matters. An unresolved or invalid credential leaves the unit ``failed`` with every missing key named in the journal, and no value is ever printed.
-  `#39554 <https://github.com/wazuh/wazuh/issues/39554>`__ Added TLS certificate issuance to that ladder, at installation **only**: neither a service start nor a package upgrade re-examines, re-anchors or reissues the pair, because issuing one is a signature rather than a lookup and re-deriving the chain would make ``$WAZUH_CA_DIR`` a standing dependency of the manager. A pair replaced out of band therefore survives both untouched. The contents of ``$WAZUH_CA_DIR`` -- not a mode flag -- select between minting a bootstrap CA, issuing from the CA found, keeping a pre-issued pair, and issuing nothing when an anchor carries no private key, so a host never given a CA key cannot sign. ``WAZUH_MANAGER_CERT_SANS`` and ``WAZUH_MANAGER_REMOTED_CERT_SANS`` set the subject alternative names; when unset, the agent listener's leaf carries every global-scope address of every interface, whether or not it is on the default route, while link-local and host scope are excluded. A manager left without certificates is still caught before any daemon runs, by the configuration validator's ``(1244)`` verdict naming the file.
-  `#39554 <https://github.com/wazuh/wazuh/issues/39554>`__ Added the tooling the ladder needs: ``bin/rbac_control seed``, ``wazuh-manager-keystore -g`` (prints a stored value and exits non-zero when the key is unset), ``bin/wazuh-manager-resolve-credentials --clear`` (removes every credential the manager owns or stores, for an image whose ``postinst`` baked them into a layer every container would share), and ``USER_RESOLVE_CREDENTIALS`` in ``install.sh``, set to ``n`` by both packaging recipes because they stage a tree they copy into the package. The shared half of the ladder -- the credentials file format, its locking convention, password generation and the CA -- is ``wazuh-credentials.sh``, owned by ``wazuh-installation-assistant <https://github.com/wazuh/wazuh-installation-assistant>``__ and downloaded by ``make deps`` rather than vendored, since the manager, the indexer and the dashboard must agree on it exactly. The manager packages now declare ``openssl``, ``iproute2``, ``hostname``, ``gawk``, ``util-linux``, ``diffutils``, ``grep``, ``sed`` and ``findutils``.
-  `#39554 <https://github.com/wazuh/wazuh/issues/39554>`__ Changed the Server API default users so they no longer ship with a password: ``users.yaml`` carries none, and ``wazuh`` and ``wazuh-wui`` are seeded with the value supplied to the credential resolver or, failing that, with a freshly generated 32-character password per installation -- so two clean installations never share a credential, and a deployment that bypasses the resolver is still unique. An already-seeded ``rbac.db`` is never reseeded, so upgrades change no credential; ``rbac_control factory-reset`` now regenerates rather than restoring ``wazuh``/``wazuh``. The start-up warning added in #38862 goes with the defaults it detected.
-  `#39554 <https://github.com/wazuh/wazuh/issues/39554>`__ Removed the built-in ``wazuh-manager``/``wazuh-manager`` indexer credential: the indexer connector no longer falls back to it when the keystore is empty, and ``queue/sockets/keystore.sock`` no longer answers the literal ``wazuh-manager`` for a key nobody set. Both made "not set" indistinguishable from "set to a password everyone knows"; an absent credential is now an error the resolver reports by name before any daemon starts.
-  `#39554 <https://github.com/wazuh/wazuh/issues/39554>`__ Changed the manager to be installed neither enabled nor started, by the packages and by ``install.sh`` alike -- ``systemctl enable --now wazuh-manager`` is the documented step, because the manager needs credentials it cannot always resolve at install time and a unit enabled without being started only produces a failed unit at the next reboot. The install-time certificate ``NOTICE`` is gone with it, replaced by the resolver's own verdict at the moment it either issues the pair or reports that it could not. ``wazuh-manager-remoted`` and ``wazuh-manager-authd`` no longer end their TLS preflight errors with "wazuh-manager does not generate TLS certificates": the hint now points at ownership and mode, which is what that error almost always means. Removal takes the manager's own keys out of the shared credentials file -- on a DEB ``purge``, and on any RPM erase, rpm having no removal that keeps configuration -- and the last component out removes the file, the CA directory and ``/etc/wazuh``, "last" being asked of the package manager rather than inferred from the file's contents.
-  `#39554 <https://github.com/wazuh/wazuh/issues/39554>`__ Changed ``wazuh-manager-apid`` to refuse to start when ``api/configuration/security/rbac.db`` is absent or empty, instead of creating it. Creating it there seeded the two default users with generated passwords published nowhere -- not to ``/etc/wazuh/credentials.env``, not to the log -- so the API came up and nobody could authenticate against it, with no record of the credential on the host. The database is the credential resolver's to create, through ``rbac_control seed``, and ``wazuh-manager-control start`` resolves credentials before any daemon runs; error ``2012`` now names that step. ``rbac_control factory-reset`` still recreates it.
-  `#39554 <https://github.com/wazuh/wazuh/issues/39554>`__ Changed the Server API password rule to PCI DSS v4.0 requirement 8.3.6: 12 to 64 characters with at least one letter and one digit, from any printable ASCII except the space, no longer requiring both cases and a symbol -- it has to accept what rotation tools and other clients send. A value **supplied to the credential resolver** is held to the stricter rule the three components share for ``/etc/wazuh/credentials.env``: the same 12 to 64 length, drawn only from ``A-Z a-z 0-9 . , _ + : @ % ^ = ~ -``, with a lowercase letter, an uppercase letter, a digit and a symbol. That set is a subset of the API's and every class it requires satisfies the API's, so a value accepted at installation is never one the Server API rejects at rotation. Generated passwords meet both by construction.
-  `#38842 <https://github.com/wazuh/wazuh/issues/38842>`__ Changed the RBAC action required by ``GET /agents/{agent_id}/key`` from ``agent:read`` to the new ``agent:read_secrets`` action, so a role that can list agents no longer exports the pre-shared key needed to impersonate them. The new action applies to an ``rbac.db`` seeded from the defaults — a fresh installation or a ``rbac_control factory-reset``; a database preserved across a package upgrade keeps the policies it already had, and on such a box the endpoint is denied for every role until the database is reseeded. The action lives in the ``secrets_read`` default policy next to ``cluster:read_secrets``, so on a seeded database ``administrator`` is the only built-in role that can export an agent's key: ``agents_admin`` and ``wazuh_indexer_admin`` keep every other agent operation through ``agents_all`` but lose key export, as do ``readonly`` and ``agents_readonly``. Provisioning does not change: ``POST /agents`` still returns the key of the agent it creates under ``agent:create``, and minting an enrollment token is unchanged, so only re-reading an existing agent's key needs ``administrator``. Every key read is now recorded as a ``secret_read`` audit line naming the caller and the agents served. Custom policies that grant ``agent:read`` must add ``agent:read_secrets`` explicitly to retain key export.
-  `#38863 <https://github.com/wazuh/wazuh/issues/38863>`__ Updated the bundled MITRE ATT&CK Enterprise dataset from v18.1 to v19.2 (new tactic TA0112 Defense Impairment, tactic TA0005 renamed to Stealth, 23 new and 17 revoked techniques). The database is generated at installation time; existing installations are not migrated.
-  `#38816 <https://github.com/wazuh/wazuh/issues/38816>`__ Replaced the manager's pseudo-XML configuration parser with a schema-validated strict-XML loader (``shared_modules/manager_config``): every consumer — the C daemons, the engine, the control script, the Python framework and the API — reads the same effective document; any daemon's ``-t`` and the new ``bin/wazuh-manager-conf validate|get|dump`` CLI validate the whole file (including the installed schema copy ``etc/wazuh-manager.schema.json``) with JSON-pointer diagnostics (error 1244); ``GET /cluster/{node_id}/configuration`` serves the canonical schema shape with native types, and ``cluster.key`` becomes mandatory. Constructs the old parser tolerated (multiple roots, raw ``&``, legacy comments, unknown options) are now rejected at startup — see the migration guide.
-  `#33377 <https://github.com/wazuh/wazuh/issues/33377>`__ `#33570 <https://github.com/wazuh/wazuh/issues/33570>`__ Upgraded embedded Python interpreter from 3.10 to 3.12.
-  `#30535 <https://github.com/wazuh/wazuh/issues/30535>`__ Adapted Vulnerability Detector input pipeline to the new Wazuh 5.0 synchronization algorithm, covering first-scan, inventory-change, and feed-update scenarios.
-  `#34608 <https://github.com/wazuh/wazuh/issues/34608>`__ Removed legacy configuration surfaces, database schemas, build targets, and compatibility layers in the second server cleanup phase.
-  `#35881 <https://github.com/wazuh/wazuh/issues/35881>`__ Reduced ``wazuh-manager`` Debian package dependencies, removing ``adduser``, ``lsb-release``, ``debconf``, and ``libc6``.
-  `#29734 <https://github.com/wazuh/wazuh/issues/29734>`__ Upgraded external dependencies: ``curl``, ``sqlite``, ``xz``, and ``libarchive``.
-  `#34479 <https://github.com/wazuh/wazuh/issues/34479>`__ Implemented cooperative-cancellation graceful termination for ``wmodules``.
-  `#35358 <https://github.com/wazuh/wazuh/pull/35358>`__ Included source IP in ``wazuh-manager-remoted`` log messages.
-  `#35478 <https://github.com/wazuh/wazuh/issues/35478>`__ Preserved manager configuration files during package upgrades.
-  `#35479 <https://github.com/wazuh/wazuh/issues/35479>`__ Improved Wazuh server directory layout.
-  `#35525 <https://github.com/wazuh/wazuh/issues/35525>`__ Updated manager index names to align with the new sync model.
-  `#35905 <https://github.com/wazuh/wazuh/issues/35905>`__ Added caller module context to indexer-connector logs.
-  `#36805 <https://github.com/wazuh/wazuh/issues/36805>`__ Randomized the cluster key generated during manager installation instead of using a hardcoded default.
-  `#36311 <https://github.com/wazuh/wazuh/issues/36311>`__ Changed the default Indexer user used by the Manager from ``admin`` to the restricted ``wazuh-server`` user, aligning with the Indexer RBAC least-privilege model.
-  `#36705 <https://github.com/wazuh/wazuh/issues/36705>`__ Enabled shared-password agent enrollment by default, persisting the auto-generated ``authd.pass`` and synchronizing it to worker nodes, with fail-closed password validation.
-  `#38091 <https://github.com/wazuh/wazuh/issues/38091>`__ Raised the minimum TLS protocol version accepted by ``wazuh-manager-authd`` (agent enrollment) to TLS 1.3, removed the ``ssl_auto_negotiate`` fallback and its ``-a`` CLI flag, and changed ``<auth><ciphers>`` to a TLS 1.3 ciphersuite list.
-  `#32698 <https://github.com/wazuh/wazuh/issues/32698>`__ Adapted API integration tests.
-  `#36453 <https://github.com/wazuh/wazuh/issues/36453>`__ Increased the minimum API user password length from 8 to 12 characters to align with PCI DSS.
-  `#38589 <https://github.com/wazuh/wazuh/issues/38589>`__ Renamed the manager's log rotation and agent monitoring internal options from ``monitord.*`` to ``wazuh_modules.manager_task_*``. An override left under an old name is silently ignored. Agents keep ``monitord.*`` for their own log rotation.
-  `#38436 <https://github.com/wazuh/wazuh/issues/38436>`__ Standardized the manager's Unix socket names and layout: every socket ends in ``.sock``, carries an ``-http`` marker when it speaks HTTP, and lives in ``queue/sockets/``. The sockets that were under ``queue/db/``, ``queue/tasks/`` and ``queue/cluster/`` moved there, leaving those directories holding only their data. An upgraded installation keeps the old socket files as dead entries until a clean install.
-  `#38862 <https://github.com/wazuh/wazuh/issues/38862>`__ Disabled ``allow_run_as`` on the ``wazuh`` API default user. Authorization context login is only used by the dashboard, which authenticates as ``wazuh-wui``; the ``wazuh`` account no longer resolves an authorization context into roles, and ``POST /security/user/authenticate/run_as`` answers it with the documented 403/6004. ``wazuh-wui`` is unchanged. The new value applies to an ``rbac.db`` seeded from the defaults — a fresh installation or a ``rbac_control factory-reset``; a database preserved across a package upgrade keeps the flag it already had. A deployment that pointed the dashboard at ``wazuh`` with ``run_as`` enabled must either use ``wazuh-wui`` or re-enable the flag with ``PUT /security/users/1/run_as``.
-  `#38862 <https://github.com/wazuh/wazuh/issues/38862>`__ Extended ``bin/rbac_control change-password`` so it can be driven without a terminal, which the installation password tools need: ``--user`` selects a single default user, ``--password-file`` reads that user's new password from the first line of a file (or from the standard input with ``-``), and ``--passwords-file`` reads a JSON object mapping default usernames to their new passwords and applies all of them in one execution. Passwords are never accepted on the command line. With no option the command keeps prompting for each password, and it now exits non-zero when any requested change was not applied.
-  `#39151 <https://github.com/wazuh/wazuh/pull/39151>`__ Updated the embedded Python interpreter to 3.12.14 and refreshed its dependencies (``aiohttp``, ``cryptography``, ``pip`` and ``setuptools``). ``setuptools`` 84.0.0 no longer ships ``pkg_resources``, removed upstream in 82.0.0, so ``google-cloud-storage`` was upgraded from 1.44.0 to 2.19.0 — the version it pinned imported that module and would have broken the gcloud bucket integration at import time.
-  `#38992 <https://github.com/wazuh/wazuh/issues/38992>`__ Changed the manager to stop generating its own TLS certificates: neither ``install.sh``, the DEB/RPM scriptlets, ``wazuh-manager-remoted`` nor ``wazuh-manager-authd`` create ``remoted.pem``/``remoted-key.pem`` any more. The listener pair and the CA that signs it (``root-ca.pem``) are provisioned externally, with the Wazuh installation assistant (``wazuh-certs-tool``), and the manager fails closed without them: ``wazuh-manager-control start`` stops with ``(1244) … '/remote/https/certificate': file not found`` and a provisioning hint, and ``wazuh-manager-remoted`` refuses to start when the service user cannot read the files.
-  `#38994 <https://github.com/wazuh/wazuh/issues/38994>`__ Changed the default RBAC policy ``agents_read`` to include ``enrollment_token:read``, so the roles that already read agents (``readonly``, ``agents_readonly``) can list the enrollment tokens they were being refused. The listing never carries a credential; minting and removing still need ``agents_all``.
-  `#38993 <https://github.com/wazuh/wazuh/issues/38993>`__ Changed the HTTPS agent API's ``401`` to name the authentication failure class: every credential failure keeps the generic message but carries ``WWW-Authenticate: Bearer error="invalid_token", error_description="<class>"`` and the same class as the body's ``code`` (a string on ``401``; other statuses keep the numeric status): ``unknown_agent`` (re-enroll), ``stale_token`` (fix the clock and retry), ``invalid_signature`` (do not re-enroll), ``invalid_request`` (no usable credential), ``token_unknown``/``token_expired``/``token_revoked`` and ``enrollment_key_unavailable`` on ``POST /enroll``. The ``agent`` table of ``global.db`` gains the ``reenroll_secret`` column in the schema itself (no ``user_version`` bump and no upgrade step: 5.0.0 has not shipped, so a ``global.db`` created by an earlier development build lacks the column and must be recreated). The default RBAC policy ``agents_all`` gains ``enrollment_token:create/read/delete``; an ``rbac.db`` created before this change keeps its previous policies, so administrators of such an installation get ``403`` on ``/agents/enrollment-tokens`` until the database is recreated or the actions are added.
-  `#39053 <https://github.com/wazuh/wazuh/issues/39053>`__ Changed the generation of the shared enrollment password (``etc/authd.pass``) to take 32 bytes straight from the CSPRNG (``RAND_bytes``) and hex-encode them to 64 lowercase characters, replacing a final MD5 digest that capped the result at 128 nominal bits however much entropy went into it. ``wazuh-manager-authd`` now refuses to start rather than write a weaker password if the CSPRNG fails, matching the agent key's fail-closed rule. Only newly generated passwords change: an existing ``etc/authd.pass`` is reused untouched, and a password supplied by an administrator is still accepted whatever its shape.
-  `#33124 <https://github.com/wazuh/wazuh/pull/33124>`__ Removed Filebeat as the log-shipping component; event forwarding now uses native Wazuh server connectivity to the Wazuh Indexer via ``indexer-connector``.
-  `#30922 <https://github.com/wazuh/wazuh/issues/30922>`__ Removed deprecated manager daemons: ``ossec-authd``, ``wazuh-agentlessd``, ``wazuh-maild``, ``wazuh-dbd``.
-  `#30924 <https://github.com/wazuh/wazuh/issues/30924>`__ Removed deprecated C CLI tools: ``manage_agents``, ``agent-auth``.
-  `#31028 <https://github.com/wazuh/wazuh/issues/31028>`__ Removed OpenSCAP server-side module.
-  `#31299 <https://github.com/wazuh/wazuh/issues/31299>`__ Removed inventory-related API endpoints.
-  `#28425 <https://github.com/wazuh/wazuh/issues/28425>`__ Removed legacy API security configuration endpoints.
-  `#35908 <https://github.com/wazuh/wazuh/issues/35908>`__ Removed SELinux integration from the manager.
-  `#38024 <https://github.com/wazuh/wazuh/issues/38024>`__ Removed the ``GET /agents/{agent_id}/stats/{component}`` API endpoint. Agent statistics are read from the ``wazuh-agent-stats`` index.
-  `#38589 <https://github.com/wazuh/wazuh/issues/38589>`__ Removed the ``wazuh-manager-monitord`` daemon, along with the ``monitor`` component of the active configuration endpoints, which its socket served.
-  `#38589 <https://github.com/wazuh/wazuh/issues/38589>`__ Removed the ``<global><agents_disconnection_alert_time>`` option. A configuration that still includes it fails to start.
-  `#38992 <https://github.com/wazuh/wazuh/issues/38992>`__ Removed the certificate-generation mode (``-C``, ``-B``, ``-K``, ``-X``, ``-S``) of ``wazuh-manager-remoted`` and ``wazuh-manager-authd``, and the ``USER_CREATE_SSL_CERT`` and ``USER_GENERATE_AUTHD_CERT`` installation variables.

Wazuh agent
^^^^^^^^^^^

-  `#29533 <https://github.com/wazuh/wazuh/issues/29533>`__ `#31838 <https://github.com/wazuh/wazuh/issues/31838>`__ Added local state persistence for agent modules (FIM, System Inventory, SCA), removing the dependency on ``rsync`` with the Wazuh Server and reducing network traffic and server-side processing overhead.
-  `#37828 <https://github.com/wazuh/wazuh/issues/37828>`__ `#37830 <https://github.com/wazuh/wazuh/issues/37830>`__ `#37832 <https://github.com/wazuh/wazuh/issues/37832>`__ `#37833 <https://github.com/wazuh/wazuh/issues/37833>`__ `#37834 <https://github.com/wazuh/wazuh/issues/37834>`__ `#37835 <https://github.com/wazuh/wazuh/issues/37835>`__ `#37836 <https://github.com/wazuh/wazuh/issues/37836>`__ Added an agent HTTPS client covering the ``/control`` lifecycle, the ``/stateless`` and ``/stateful`` data planes, ``/download`` for centralized configuration and WPK packages, task dispatch with durable deduplication, and remote upgrade, with AES-CMAC request signing and fail-closed TLS validation.
-  `#37843 <https://github.com/wazuh/wazuh/issues/37843>`__ Added periodic ``/stats`` and ``/config`` push, reporting every module's statistics and configuration in a single aggregated document per endpoint, behind two ``ossec.conf`` toggles that are off by default.
-  `#39064 <https://github.com/wazuh/wazuh/issues/39064>`__ Agents now re-enroll with a per-agent secret stored at ``etc/reenroll.secret``, keeping their agent id.
-  `#39064 <https://github.com/wazuh/wazuh/issues/39064>`__ An agent re-enrolls only when the manager reports that it no longer knows the agent; every other authentication failure is retried with the credential the agent already holds.
-  `#39064 <https://github.com/wazuh/wazuh/issues/39064>`__ An enrollment token the manager refuses is now logged with its token id, so operators know which one to re-mint.
-  `#39064 <https://github.com/wazuh/wazuh/issues/39064>`__ An agent no longer restarts repeatedly when its enrollment token has been revoked or used up.
-  `#39064 <https://github.com/wazuh/wazuh/issues/39064>`__ An agent keeps its enrollment token when the manager reports only that enrollment is disabled.
-  `#39064 <https://github.com/wazuh/wazuh/issues/39064>`__ An agent whose re-enrollment secret the manager refuses falls back to the configured credential, so a rebuilt manager does not require visiting every endpoint.
-  `#39407 <https://github.com/wazuh/wazuh/issues/39407>`__ Added Enroll and Update CA actions to the Windows agent tray GUI (``win32ui``), enrolling or refreshing the trust anchor from a pasted token.
-  `#37831 <https://github.com/wazuh/wazuh/issues/37831>`__ Changed the agent transport to HTTPS for all server communication, removing the legacy TCP data path and its internal-option fallback.
-  `#38465 <https://github.com/wazuh/wazuh/issues/38465>`__ Changed agent enrollment to consume the manager's HTTPS ``POST /enroll`` endpoint instead of the legacy ``A:``/``K:`` protocol over TCP/1515, reusing the same ``<agent><ssl>``/``<agent><server>`` transport as the rest of the agent's HTTPS traffic.
-  `#38624 <https://github.com/wazuh/wazuh/issues/38624>`__ Changed the ``WAZUH_MANAGER_ENDPOINT`` installation variable to carry the whole connection target — ``host[:port][/prefix]``, with only the address mandatory — which the DEB/RPM, source and MSI installers write verbatim into the agent's single ``<endpoint>`` setting. It supersedes ``WAZUH_MANAGER`` and ``WAZUH_MANAGER_PORT`` when set, and those keep working unchanged when it is not. A trailing slash (``host/``) opts out of the reverse-proxy prefix. Replaces the variable's previous prefix-only meaning.
-  `#33378 <https://github.com/wazuh/wazuh/issues/33378>`__ Changed the Wazuh Manager installation path to ``/var/wazuh-manager`` (replacing ``/var/ossec``) and removed agent ID ``000``, fully decoupling agent and manager processes on shared hosts.
-  `#34849 <https://github.com/wazuh/wazuh/issues/34849>`__ Changed Vulnerability Detection to use the Wazuh Indexer as the sole authoritative CVE data source, removing direct CTI network access from the agent-side Vulnerability Detector.
-  `#33199 <https://github.com/wazuh/wazuh/issues/33199>`__ Adjusted agent-side Vulnerability Detector inventory emission and synchronization (OS, packages, hotfixes) to align with the updated VD behavior in Wazuh 5.0.
-  `#31478 <https://github.com/wazuh/wazuh/issues/31478>`__ Simplified rootcheck: removed the server-side database, sync path, and API surface; findings are now indexed through the standard alert pipeline.
-  `#38589 <https://github.com/wazuh/wazuh/issues/38589>`__ Changed the shared log-rotation helper so a rotation whose target directory cannot be created is reported and skipped instead of terminating the daemon. This also applies to the agent's own log rotation, which previously exited on that error and was restarted by the service manager.
-  `#33382 <https://github.com/wazuh/wazuh/issues/33382>`__ Updated logcollector file-tailing initial read strategy for more consistent behavior across log rotation scenarios.
-  `#34462 <https://github.com/wazuh/wazuh/issues/34462>`__ Updated Windows Event Channel log collection to emit native XML from ``EvtRender()`` without an XML declaration header.
-  `#35330 <https://github.com/wazuh/wazuh/issues/35330>`__ Increased default limits for agent event throughput and inventory message sizes.
-  `#35880 <https://github.com/wazuh/wazuh/issues/35880>`__ Reduced ``wazuh-agent`` Debian package dependencies, removing ``adduser``, ``lsb-release``, and ``debconf``.
-  `#35471 <https://github.com/wazuh/wazuh/issues/35471>`__ Standardized agent-start and buffer-status events to a WCS-aligned JSON format.
-  `#39274 <https://github.com/wazuh/wazuh/issues/39274>`__ Extended the Windows agent's default FIM registry ignore list to exclude the OS telemetry under ``HKLM\System\CurrentControlSet\Services``.
-  `#39064 <https://github.com/wazuh/wazuh/issues/39064>`__ The 5.0 package upgrade deletes ``etc/authd.pass`` from the endpoint. **Operators who rotate it should know it disappears at upgrade.**.
-  `#39064 <https://github.com/wazuh/wazuh/issues/39064>`__ A fresh 5.0 install no longer creates ``etc/authd.pass``.
-  `#39064 <https://github.com/wazuh/wazuh/issues/39064>`__ ``WAZUH_REGISTRATION_PASSWORD`` is no longer used; the installer logs that it was ignored.
-  `#39064 <https://github.com/wazuh/wazuh/issues/39064>`__ An enrollment password stored outside the default path is left in place.
-  `#39064 <https://github.com/wazuh/wazuh/issues/39064>`__ The installers no longer add an ``<authorization_pass_path>`` element naming the default password file.
-  `#39064 <https://github.com/wazuh/wazuh/issues/39064>`__ An agent enrolled before the upgrade keeps working on its existing key, but must be re-pointed with an enrollment token to obtain a re-enrollment secret.
-  `#39406 <https://github.com/wazuh/wazuh/issues/39406>`__ Changed the Windows agent tray GUI (``win32ui``) to display the manager address and enrollment key read-only, removing the ``Save`` button and its unverified write path.
-  `#30435 <https://github.com/wazuh/wazuh/issues/30435>`__ Removed deprecated agent binaries and legacy modules as part of the Wazuh 5.0 agent cleanup.
-  `#31582 <https://github.com/wazuh/wazuh/issues/31582>`__ Removed NSIS-based Windows agent installer; Windows agent now ships exclusively as an MSI package.
-  `#38091 <https://github.com/wazuh/wazuh/issues/38091>`__ Removed the ``<enrollment><auto_method>`` option; enrollment now always requires TLS 1.3, so there is nothing left for it to negotiate down to. The ``ssl_cipher`` option now expects a TLS 1.3 ciphersuite list instead of an OpenSSL cipher-list string.
-  `#38465 <https://github.com/wazuh/wazuh/issues/38465>`__ Removed the ``<enrollment>`` ``manager_address``, ``port``, ``interface_index``, ``ssl_cipher``, ``server_certificate_path``, ``agent_certificate_path``, and ``agent_key_path`` options; enrollment now always targets the same manager and TLS configuration as the rest of the agent's HTTPS traffic. A 4.x ``ossec.conf`` carrying them still parses without error after an in-place upgrade.
-  `#39674 <https://github.com/wazuh/wazuh/issues/39674>`__ Deprecated the 4.x FIM, Syscollector, SCA and agent options that no longer have any effect; an upgraded ``ossec.conf`` that still sets them loads with a deprecation warning.

Wazuh indexer
^^^^^^^^^^^^^

-  Bundle the Wazuh Engine in the Wazuh Indexer packages and Docker images, and manage its lifecycle with the ``wazuh-indexer`` service.
-  `#1105 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1105>`__ Bundle CTI content snapshots in the Wazuh Indexer packages.
-  `#1927 <https://github.com/wazuh/wazuh-indexer/issues/1927>`__ Generate indexer credentials and TLS material at install time instead of shipping defaults.
-  `#462 <https://github.com/wazuh/wazuh-indexer-plugins/issues/462>`__ `#1538 <https://github.com/wazuh/wazuh-indexer/issues/1538>`__ Add default Wazuh Indexer users and roles.
-  `#1249 <https://github.com/wazuh/wazuh-indexer/issues/1249>`__ `#1782 <https://github.com/wazuh/wazuh-indexer/issues/1782>`__ Add ``cluster.default_number_of_replicas`` and ``plugins.index_state_management.history.number_of_replicas`` settings to ``opensearch.yml`` to avoid a yellow cluster status on single-node deployments.
-  `#1422 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1422>`__ Add AI assistant support.
-  `#1636 <https://github.com/wazuh/wazuh-indexer/issues/1636>`__ Add performance improvements & default configurations.
-  `#1195 <https://github.com/wazuh/wazuh-indexer/issues/1195>`__ Map alerting and notifications roles to the ``kibanaserver`` user.
-  `#1299 <https://github.com/wazuh/wazuh-indexer/issues/1299>`__ `#1365 <https://github.com/wazuh/wazuh-indexer/issues/1365>`__ Add support for ARM architecture in Wazuh Indexer Docker images.
-  `#1576 <https://github.com/wazuh/wazuh-indexer/issues/1576>`__ Add ``workload-management`` plugin.
-  `#1271 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1271>`__ Add ``opensearch-custom-codecs`` plugin.
-  `#857 <https://github.com/wazuh/wazuh-indexer/issues/857>`__ Add ``wazuh-indexer-setup`` plugin.
-  Add ``wazuh-indexer-content-manager`` plugin.
-  `#1 <https://github.com/wazuh/wazuh-indexer-reporting/issues/1>`__ `#999 <https://github.com/wazuh/wazuh-indexer/issues/999>`__ Add ``wazuh-indexer-reports-scheduler`` plugin, replacing ``opensearch-reports-scheduler``.
-  `#1 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/1>`__ `#1270 <https://github.com/wazuh/wazuh-indexer/issues/1270>`__ Add ``wazuh-indexer-security-analytics`` plugin, a fork of ``opensearch-security-analytics``.
-  `#1 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/1>`__ Add ``wazuh-indexer-common-utils`` library, shared by the forked plugins.
-  `#1 <https://github.com/wazuh/wazuh-indexer-alerting/issues/1>`__ Add ``wazuh-indexer-alerting`` plugin, replacing ``opensearch-alerting``.
-  `#2 <https://github.com/wazuh/wazuh-indexer-notifications/issues/2>`__ `#1335 <https://github.com/wazuh/wazuh-indexer/issues/1335>`__ Add ``wazuh-indexer-notifications`` and ``wazuh-indexer-notifications-core`` plugins, replacing ``opensearch-notifications`` and ``opensearch-notifications-core``.
-  `#853 <https://github.com/wazuh/wazuh-indexer/issues/853>`__ `#862 <https://github.com/wazuh/wazuh-indexer/issues/862>`__ `#904 <https://github.com/wazuh/wazuh-indexer/issues/904>`__ Add templates, workflows and tools for Wazuh Indexer 5.x.
-  `#934 <https://github.com/wazuh/wazuh-indexer/issues/934>`__ Improve workflow to build Wazuh Indexer packages.
-  `#884 <https://github.com/wazuh/wazuh-indexer/issues/884>`__ Add custom GitHub Action to validate committer's emails by domain.
-  `#1032 <https://github.com/wazuh/wazuh-indexer/issues/1032>`__ Add Cross-Cluster Search environment.
-  `#743 <https://github.com/wazuh/wazuh-indexer-plugins/issues/743>`__ Add GH Action for Local Maven publication.
-  `#1433 <https://github.com/wazuh/wazuh-indexer/issues/1433>`__ Add Wazuh Indexer nightly Docker images.
-  `#985 <https://github.com/wazuh/wazuh-indexer/issues/985>`__ Add repository bumper tool.
-  `#1394 <https://github.com/wazuh/wazuh-indexer/issues/1394>`__ Add ``--set-as-main`` flag support to repository bumper.
-  `#874 <https://github.com/wazuh/wazuh-indexer/issues/874>`__ `#1000 <https://github.com/wazuh/wazuh-indexer/issues/1000>`__ `#1086 <https://github.com/wazuh/wazuh-indexer/issues/1086>`__ `#1177 <https://github.com/wazuh/wazuh-indexer/issues/1177>`__ `#1207 <https://github.com/wazuh/wazuh-indexer/issues/1207>`__ `#1284 <https://github.com/wazuh/wazuh-indexer/issues/1284>`__ `#1332 <https://github.com/wazuh/wazuh-indexer/issues/1332>`__ `#1410 <https://github.com/wazuh/wazuh-indexer/issues/1410>`__ `#1341 <https://github.com/wazuh/wazuh-indexer/issues/1341>`__ Upgrade to OpenSearch 3.6.0 and JDK 25.
-  `#1653 <https://github.com/wazuh/wazuh-indexer/issues/1653>`__ `#1661 <https://github.com/wazuh/wazuh-indexer/issues/1661>`__ Refuse package upgrades from Wazuh Indexer 4.x, which require a clean installation.
-  `#1927 <https://github.com/wazuh/wazuh-indexer/issues/1927>`__ Ship the ``admin``, ``kibanaserver`` and ``wazuh-manager`` users without a usable password hash.
-  Enable transport hostname verification (``transport.ssl.enforce_hostname_verification``) by default.
-  `#1670 <https://github.com/wazuh/wazuh-indexer/issues/1670>`__ Enable memory locking (``bootstrap.memory_lock``) by default.
-  `#1080 <https://github.com/wazuh/wazuh-indexer/issues/1080>`__ Disable multi-tenancy by default.
-  `#1572 <https://github.com/wazuh/wazuh-indexer/issues/1572>`__ Set ``OPENSEARCH_TMPDIR`` to ``/var/lib/wazuh-indexer/tmp`` to avoid exhausting the ``/tmp`` partition.
-  `#1961 <https://github.com/wazuh/wazuh-indexer/issues/1961>`__ Update ``README.md`` after 5.0.0 conceptual and architectural changes.
-  `#928 <https://github.com/wazuh/wazuh-indexer/issues/928>`__ Migrate packaging tests to Docker.
-  `#1122 <https://github.com/wazuh/wazuh-indexer/issues/1122>`__ Change workflows names to include the version it targets to.
-  `#1129 <https://github.com/wazuh/wazuh-indexer/issues/1129>`__ Update GitHub Actions to the latest version available.
-  `#1120 <https://github.com/wazuh/wazuh-indexer/issues/1120>`__ Refactor GH Workflow to build packages to use a single branch input.
-  `#1191 <https://github.com/wazuh/wazuh-indexer/issues/1191>`__ Change Dependabot's configuration to track GH Actions version updates.
-  `#1219 <https://github.com/wazuh/wazuh-indexer/issues/1219>`__ `#961 <https://github.com/wazuh/wazuh-indexer/issues/961>`__ `#1340 <https://github.com/wazuh/wazuh-indexer/issues/1340>`__ Update CodeQL configuration.
-  `#1339 <https://github.com/wazuh/wazuh-indexer/issues/1339>`__ Change the package builder GH Workflow to use dedicated runners.
-  `#1325 <https://github.com/wazuh/wazuh-indexer/issues/1325>`__ Replace ``addnab/docker-run-action`` with Docker commands.
-  `#893 <https://github.com/wazuh/wazuh-indexer/issues/893>`__ `#874 <https://github.com/wazuh/wazuh-indexer/issues/874>`__ Remove deprecated OpenSearch settings in 3.0.0 from ``opensearch.yml``.
-  `#891 <https://github.com/wazuh/wazuh-indexer/issues/891>`__ Remove ``opensearch-performance-analyzer`` plugin.
-  `#1272 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1272>`__ Remove ``opensearch-anomaly-detection`` plugin.
-  `#1272 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1272>`__ Remove ``opensearch-asynchronous-search`` plugin.
-  `#1577 <https://github.com/wazuh/wazuh-indexer/issues/1577>`__ Remove ``opensearch-knn`` plugin.
-  `#1582 <https://github.com/wazuh/wazuh-indexer/issues/1582>`__ Remove ``opensearch-ml`` plugin.
-  `#1577 <https://github.com/wazuh/wazuh-indexer/issues/1577>`__ Remove ``opensearch-neural-search`` plugin.
-  `#1272 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1272>`__ Remove ``opensearch-observability`` plugin.
-  `#1580 <https://github.com/wazuh/wazuh-indexer/issues/1580>`__ Remove ``opensearch-sql`` plugin.
-  `#1927 <https://github.com/wazuh/wazuh-indexer/issues/1927>`__ Remove ``install-demo-certificates.sh`` and the ``GENERATE_CERTS`` gate, superseded by ``resolve-credentials.sh``.
-  `#1927 <https://github.com/wazuh/wazuh-indexer/issues/1927>`__ Remove the OpenSearch demo users ``anomalyadmin``, ``kibanaro``, ``logstash``, ``readall`` and ``snapshotrestore``, and the demo role mappings, including ``own_index`` for every user.
-  `#905 <https://github.com/wazuh/wazuh-indexer/issues/905>`__ Remove references to legacy ``VERSION`` file.
-  `#865 <https://github.com/wazuh/wazuh-indexer/issues/865>`__ `#1068 <https://github.com/wazuh/wazuh-indexer/issues/1068>`__ `#683 <https://github.com/wazuh/wazuh-indexer/issues/683>`__ Remove the ``integrations``, ``packaging_scripts``, ``docker`` and ``ecs`` folders, superseded by ``build-scripts`` and the ``wazuh-indexer-plugins`` repository.


Plugins
~~~~~~~

-  `#434 <https://github.com/wazuh/wazuh-indexer-plugins/issues/434>`__ `#466 <https://github.com/wazuh/wazuh-indexer-plugins/issues/466>`__ Create index templates, indices and index management policies at startup.
-  `#533 <https://github.com/wazuh/wazuh-indexer-plugins/issues/533>`__ Add retry mechanism for the ``wazuh-indexer-setup`` plugin initialization tasks.
-  `#1249 <https://github.com/wazuh/wazuh-indexer/issues/1249>`__ Apply ``cluster.default_number_of_replicas`` from ``opensearch.yml`` on startup.
-  `#831 <https://github.com/wazuh/wazuh-indexer-plugins/issues/831>`__ Add ``wazuh-events-raw-v5`` data stream.
-  `#832 <https://github.com/wazuh/wazuh-indexer-plugins/issues/832>`__ `#1348 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1348>`__ Add ``wazuh-events-v5-unclassified`` data stream for events without a category.
-  `#72 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/72>`__ Add ``wazuh-findings-v5-*`` data streams with WCS-compliant findings.
-  `#884 <https://github.com/wazuh/wazuh-indexer-plugins/issues/884>`__ Add ``wazuh-active-responses`` data stream.
-  `#940 <https://github.com/wazuh/wazuh-indexer-plugins/issues/940>`__ `#1110 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1110>`__ Add metrics and monitoring data streams.
-  `#511 <https://github.com/wazuh/wazuh-indexer-plugins/issues/511>`__ Add SCA stateful index.
-  `#1419 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1419>`__ Add ``wazuh-agent-config`` index.
-  `#1425 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1425>`__ Add ``wazuh-agent-stats`` index.
-  `#1422 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1422>`__ Add AI assistant support.
-  `#1213 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1213>`__ Add data retention policies for stream indices.
-  `#553 <https://github.com/wazuh/wazuh-indexer-plugins/issues/553>`__ Add WCS definition for stream indices.
-  `#584 <https://github.com/wazuh/wazuh-indexer-plugins/issues/584>`__ Add categories to the WCS stateless indices.
-  `#590 <https://github.com/wazuh/wazuh-indexer-plugins/issues/590>`__ Add Cloud Services subcategories.
-  `#605 <https://github.com/wazuh/wazuh-indexer-plugins/issues/605>`__ Add WCS protocol and message format fields.
-  `#606 <https://github.com/wazuh/wazuh-indexer-plugins/issues/606>`__ Add WCS integration fields to stateless indices.
-  Add WCS fields for the AWS Bedrock integration.
-  `#851 <https://github.com/wazuh/wazuh-indexer-plugins/issues/851>`__ Add WCS field for discarded events.
-  `#1096 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1096>`__ Add ``wazuh.event.id`` WCS field for event correlation.
-  `#754 <https://github.com/wazuh/wazuh-indexer-plugins/issues/754>`__ Add enrichment fields to stateless indices.
-  `#981 <https://github.com/wazuh/wazuh-indexer-plugins/issues/981>`__ `#983 <https://github.com/wazuh/wazuh-indexer-plugins/issues/983>`__ `#989 <https://github.com/wazuh/wazuh-indexer-plugins/issues/989>`__ Add missing ``indicator.feed.name`` and vulnerability fields to the WCS.
-  `#638 <https://github.com/wazuh/wazuh-indexer-plugins/issues/638>`__ `#875 <https://github.com/wazuh/wazuh-indexer-plugins/issues/875>`__ Add security compliance fields to the WCS.
-  `#1220 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1220>`__ `#1334 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1334>`__ Add findings case management fields.
-  `#1103 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1103>`__ Add ``default_parent`` field to integrations.
-  `#515 <https://github.com/wazuh/wazuh-indexer-plugins/issues/515>`__ Add checksum fields to stateful indices.
-  `#576 <https://github.com/wazuh/wazuh-indexer-plugins/issues/576>`__ Add metadata fields to stateful indices.
-  `#560 <https://github.com/wazuh/wazuh-indexer-plugins/issues/560>`__ Add ``state.modified_at`` field to stateful indices.
-  `#1413 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1413>`__ Add ``previous`` value fields to the WCS for process, service and package inventory changes.
-  Add ``file.diff`` WCS field for FIM content changes.
-  `#1235 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1235>`__ Add new fields for ``wazuh-remoted`` statistics to the ``wazuh-metrics-comms-v4`` template.
-  Add ``wazuh-indexer-content-manager`` plugin.
-  `#870 <https://github.com/wazuh/wazuh-indexer-plugins/issues/870>`__ Initialize CTI content from snapshots and keep it up to date with scheduled and on-demand updates.
-  `#1105 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1105>`__ Load CTI content from the snapshots bundled in the packages on first start.
-  `#735 <https://github.com/wazuh/wazuh-indexer-plugins/issues/735>`__ `#753 <https://github.com/wazuh/wazuh-indexer-plugins/issues/753>`__ `#829 <https://github.com/wazuh/wazuh-indexer-plugins/issues/829>`__ Download IoCs from the CTI API and deliver them to the Wazuh Engine.
-  Download the CTI vulnerability feed.
-  Add content spaces and the REST API to manage user-generated rules, decoders, integrations and KVDBs.
-  `#756 <https://github.com/wazuh/wazuh-indexer-plugins/issues/756>`__ `#796 <https://github.com/wazuh/wazuh-indexer-plugins/issues/796>`__ Add Engine filters index and API.
-  `#812 <https://github.com/wazuh/wazuh-indexer-plugins/issues/812>`__ `#37 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/37>`__ Support creating and promoting rules and integrations across spaces.
-  `#38 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/38>`__ Add rollback mechanism to the promote action.
-  `#869 <https://github.com/wazuh/wazuh-indexer-plugins/issues/869>`__ Add space reset endpoint.
-  `#833 <https://github.com/wazuh/wazuh-indexer-plugins/issues/833>`__ Add support for Engine settings.
-  `#918 <https://github.com/wazuh/wazuh-indexer-plugins/issues/918>`__ `#993 <https://github.com/wazuh/wazuh-indexer-plugins/issues/993>`__ `#1376 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1376>`__ Load the ``standard``, ``test`` and ``custom`` spaces into the Wazuh Engine of every cluster node when their hash changes.
-  Synchronize CTI integrations and rules with Security Analytics and create threat detectors for them.
-  `#1029 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1029>`__ Add dynamic configuration of standard threat detectors.
-  `#1356 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1356>`__ Add integration mode to enable or disable integrations and their threat detectors.
-  `#56 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/56>`__ Add rule testing to the logtest endpoint.
-  Add CTI subscription API to register, inspect and unregister the environment.
-  Download the CTI content granted by the subscription plan.
-  Apply CTI plan changes through a blue/green swap of the content indices.
-  Add support for pre-registered environments.
-  `#1042 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1042>`__ `#1218 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1218>`__ Add telemetry ping job reporting the environment's identity and version to the CTI API.
-  `#961 <https://github.com/wazuh/wazuh-indexer-plugins/issues/961>`__ Add ``status`` field to the CTI consumers index.
-  `#1010 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1010>`__ Add version check endpoint.
-  `#1069 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1069>`__ Send a custom user agent on requests to the CTI API.
-  `#1084 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1084>`__ Add YAML representation for ruleset resources.
-  `#1170 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1170>`__ Enable the draft policy by default.
-  `#1276 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1276>`__ Add configurable resource creation limits.
-  `#1277 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1277>`__ Add settings to disable on-demand updates and policy updates for every user.
-  `#1585 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1585>`__ Add plugin settings for the operational constants of the Setup and Content Manager plugins.
-  `#489 <https://github.com/wazuh/wazuh-indexer-plugins/issues/489>`__ `#931 <https://github.com/wazuh/wazuh-indexer-plugins/issues/931>`__ Add documentation and API reference for the ``wazuh-indexer-setup`` plugin.
-  `#529 <https://github.com/wazuh/wazuh-indexer-plugins/issues/529>`__ `#1538 <https://github.com/wazuh/wazuh-indexer/issues/1538>`__ Add documentation for default users and roles (RBAC).
-  `#63 <https://github.com/wazuh/wazuh-indexer-reporting/issues/63>`__ Add documentation for the ``wazuh-indexer-reporting`` plugin.
-  `#1 <https://github.com/wazuh/wazuh-indexer-alerting/issues/1>`__ `#73 <https://github.com/wazuh/wazuh-indexer-alerting/issues/73>`__ Add documentation for the ``wazuh-indexer-alerting`` plugin.
-  `#2 <https://github.com/wazuh/wazuh-indexer-notifications/issues/2>`__ `#45 <https://github.com/wazuh/wazuh-indexer-notifications/issues/45>`__ Add documentation for the ``wazuh-indexer-notifications`` plugin and its default channels.
-  `#1 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/1>`__ Add development guide for ``wazuh-indexer-common-utils``.
-  `#571 <https://github.com/wazuh/wazuh-indexer-plugins/issues/571>`__ Add documentation for the ``browser-extensions`` and ``services`` inventory indices.
-  `#219 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/219>`__ `#244 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/244>`__ Add documentation for the Security Analytics settings.
-  `#111 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/111>`__ `#117 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/117>`__ Add documentation for threat detector rule limits and per-space threat detectors.
-  `#1531 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1531>`__ Add documentation for the detection gap of disabled threat detectors.
-  `#1530 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1530>`__ Add documentation for the ISM retention behavior of stream data streams.
-  `#1551 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1551>`__ Add documentation for the active response document contract.
-  `#1941 <https://github.com/wazuh/wazuh-indexer/issues/1941>`__ Add documentation for Active Response monitors running once per matched event.
-  `#934 <https://github.com/wazuh/wazuh-indexer-plugins/issues/934>`__ Add documentation for step-by-step upgrades and backup and restore.
-  `#1240 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1240>`__ Add Wazuh Indexer configuration and fine-tuning guide.
-  Add configuration migration guide for 5.0.
-  Add README files to the WCS modules.
-  `#1850 <https://github.com/wazuh/wazuh-indexer/issues/1850>`__ Add documentation for the ``needrestart`` override on Debian-based systems.
-  `#1927 <https://github.com/wazuh/wazuh-indexer/issues/1927>`__ `#1960 <https://github.com/wazuh/wazuh-indexer/issues/1960>`__ `#1975 <https://github.com/wazuh/wazuh-indexer/issues/1975>`__ `#1976 <https://github.com/wazuh/wazuh-indexer/issues/1976>`__ Add documentation for install-time credential and TLS generation.
-  `#499 <https://github.com/wazuh/wazuh-indexer-plugins/issues/499>`__ Add repository bumper tool.
-  `#975 <https://github.com/wazuh/wazuh-indexer-plugins/issues/975>`__ `#1051 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1051>`__ `#1270 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1270>`__ `#1439 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1439>`__ Add ``--set-as-main``, revert, issue link and skipped-bump reporting support to the repository bumper.
-  `#580 <https://github.com/wazuh/wazuh-indexer-plugins/issues/580>`__ Add WCS integrations tooling.
-  `#622 <https://github.com/wazuh/wazuh-indexer-plugins/issues/622>`__ Sanitize ECS source types before generating the WCS.
-  `#743 <https://github.com/wazuh/wazuh-indexer-plugins/issues/743>`__ Add GH Action for Local Maven publication.
-  `#853 <https://github.com/wazuh/wazuh-indexer-plugins/issues/853>`__ Add workflow to check the Content Manager API documentation.
-  `#1590 <https://github.com/wazuh/wazuh-indexer/issues/1590>`__ Add performance metrics tooling.
-  `#1485 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1485>`__ `#1740 <https://github.com/wazuh/wazuh-indexer/issues/1740>`__ `#1597 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1597>`__ Add Claude Code skills for the WCS, performance tuning and scheduled upward merges.
-  `#1482 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1482>`__ Add component tests for the vulnerabilities consumer.
-  `#522 <https://github.com/wazuh/wazuh-indexer-plugins/issues/522>`__ `#558 <https://github.com/wazuh/wazuh-indexer-plugins/issues/558>`__ `#586 <https://github.com/wazuh/wazuh-indexer-plugins/issues/586>`__ `#630 <https://github.com/wazuh/wazuh-indexer-plugins/issues/630>`__ `#723 <https://github.com/wazuh/wazuh-indexer-plugins/issues/723>`__ `#850 <https://github.com/wazuh/wazuh-indexer-plugins/issues/850>`__ `#1001 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1001>`__ `#1341 <https://github.com/wazuh/wazuh-indexer/issues/1341>`__ Upgrade to OpenSearch 3.6.0 and JDK 25.
-  `#475 <https://github.com/wazuh/wazuh-indexer-plugins/issues/475>`__ Replace deprecated OpenSearch 3.0 settings.
-  `#448 <https://github.com/wazuh/wazuh-indexer-plugins/issues/448>`__ Adapt the ``wazuh-indexer-setup`` plugin for 5.x.
-  `#1288 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1288>`__ Unify the Setup and Content Manager plugin states into ``running``, ``ready`` and ``failed``.
-  `#1284 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1284>`__ `#1354 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1354>`__ `#1793 <https://github.com/wazuh/wazuh-indexer/issues/1793>`__ `#1817 <https://github.com/wazuh/wazuh-indexer/issues/1817>`__ `#1818 <https://github.com/wazuh/wazuh-indexer/issues/1818>`__ Unify the default settings of Wazuh indices for All-in-One deployments, auto-expanding to one replica on multi-node clusters.
-  `#1271 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1271>`__ Use the ``zstd`` codec by default for indices created by Wazuh plugins.
-  `#1275 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1275>`__ Disable automatic refresh on low-activity internal indices.
-  `#1328 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1328>`__ Reduce the in-memory TTL of deleted documents on stateful indices.
-  `#599 <https://github.com/wazuh/wazuh-indexer-plugins/issues/599>`__ Upgrade the WCS to ECS 9.1.0.
-  `#482 <https://github.com/wazuh/wazuh-indexer-plugins/issues/482>`__ `#975 <https://github.com/wazuh/wazuh-indexer/issues/975>`__ `#1068 <https://github.com/wazuh/wazuh-indexer/issues/1068>`__ `#1114 <https://github.com/wazuh/wazuh-indexer/issues/1114>`__ Migrate WCS changes from 4.x.
-  `#591 <https://github.com/wazuh/wazuh-indexer-plugins/issues/591>`__ Include the major version in index names and aliases.
-  `#593 <https://github.com/wazuh/wazuh-indexer-plugins/issues/593>`__ Tune the field limits of WCS indices.
-  `#637 <https://github.com/wazuh/wazuh-indexer-plugins/issues/637>`__ Reduce the WCS to a minimal set of fields.
-  `#650 <https://github.com/wazuh/wazuh-indexer-plugins/issues/650>`__ Replace time-series indices with data streams.
-  `#647 <https://github.com/wazuh/wazuh-indexer-plugins/issues/647>`__ Rename index templates.
-  `#506 <https://github.com/wazuh/wazuh-indexer-plugins/issues/506>`__ Rework the FIM indices.
-  `#688 <https://github.com/wazuh/wazuh-indexer-plugins/issues/688>`__ `#1301 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1301>`__ Update the WCS compliance fields.
-  `#775 <https://github.com/wazuh/wazuh-indexer-plugins/issues/775>`__ Move ``agent`` fields under ``wazuh``.
-  `#1121 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1121>`__ Nest the ``rule`` and ``threat`` fields under ``wazuh``.
-  `#1208 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1208>`__ Extend the MITRE fields of rules, events, findings and active responses.
-  `#963 <https://github.com/wazuh/wazuh-indexer-plugins/issues/963>`__ Set the ``wazuh-events-v5`` template mapping to ``strict_allow_templates``.
-  `#1209 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1209>`__ Map ``threat.enrichments`` as an object instead of nested and remove the root-level ``enrichments`` field.
-  `#1490 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1490>`__ Unify ``manager.address`` and ``manager.port`` into ``manager.endpoint`` in the ``wazuh-agent-config`` index.
-  `#1535 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1535>`__ Change the ``wazuh-agent-config`` and ``wazuh-agent-stats`` mappings to ``strict_allow_templates`` with dynamic templates.
-  Raise the default ``ignore_above`` of ``keyword`` fields from 1024 to 4096.
-  `#1458 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1458>`__ Rename the ``metrics-comms`` data stream to ``wazuh-metrics-comms-v4``.
-  `#1041 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1041>`__ Rename the content indices to ``wazuh-threatintel-*``.
-  `#1109 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1109>`__ Hide the ``.wazuh-threatintel-vulnerabilities`` index.
-  `#892 <https://github.com/wazuh/wazuh-indexer-plugins/issues/892>`__ `#986 <https://github.com/wazuh/wazuh-indexer-plugins/issues/986>`__ `#1067 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1067>`__ `#1160 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1160>`__ `#1241 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1241>`__ Update the CTI API URL and consumers.
-  `#1113 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1113>`__ Rework the initialization from snapshots based on the ``manifest.json`` file.
-  `#1257 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1257>`__ `#1318 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1318>`__ `#1351 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1351>`__ Improve the performance of snapshot unzipping and indexing.
-  `#1740 <https://github.com/wazuh/wazuh-indexer/issues/1740>`__ Reduce the IoCs and ruleset memory footprint.
-  `#1345 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1345>`__ Recover immediately when a feed update fails.
-  `#814 <https://github.com/wazuh/wazuh-indexer-plugins/issues/814>`__ `#852 <https://github.com/wazuh/wazuh-indexer-plugins/issues/852>`__ `#896 <https://github.com/wazuh/wazuh-indexer-plugins/issues/896>`__ `#1022 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1022>`__ Change the IoC data structure and mappings, with a hash per IoC type.
-  `#792 <https://github.com/wazuh/wazuh-indexer-plugins/issues/792>`__ Optimize the rules index mappings to support more CTI rules.
-  `#755 <https://github.com/wazuh/wazuh-indexer-plugins/issues/755>`__ `#804 <https://github.com/wazuh/wazuh-indexer-plugins/issues/804>`__ Extend the policy schema and update endpoint with filters, enrichments and default settings.
-  `#899 <https://github.com/wazuh/wazuh-indexer-plugins/issues/899>`__ Allow updating the ``standard`` space policy.
-  `#950 <https://github.com/wazuh/wazuh-indexer-plugins/issues/950>`__ Update the metadata of custom policies.
-  `#920 <https://github.com/wazuh/wazuh-indexer-plugins/issues/920>`__ Normalize the metadata of ruleset resources.
-  `#146 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/146>`__ Normalize space values to lowercase.
-  `#795 <https://github.com/wazuh/wazuh-indexer-plugins/issues/795>`__ Simplify the Content Manager API payloads.
-  `#815 <https://github.com/wazuh/wazuh-indexer-plugins/issues/815>`__ Allow editing resources that carry unmodifiable fields.
-  `#1349 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1349>`__ Allow dates on the Content Manager REST API.
-  `#943 <https://github.com/wazuh/wazuh-indexer-plugins/issues/943>`__ Prevent deletion of the root decoder.
-  `#1131 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1131>`__ Allow promoting rules without a root decoder.
-  `#932 <https://github.com/wazuh/wazuh-indexer-plugins/issues/932>`__ `#1184 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1184>`__ Support logtest executions on multiple spaces, including ``custom``.
-  `#1016 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1016>`__ Include only enabled rules in standard threat detectors.
-  `#214 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/214>`__ Improve the time correlation between events and findings.
-  `#101 <https://github.com/wazuh/wazuh-indexer-notifications/issues/101>`__ Include the ``wazuh.rule`` object in active response events.
-  `#143 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/143>`__ Improve error messages for Security Analytics validation failures.
-  `#1200 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1200>`__ Improve Content Manager logging.
-  `#1263 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1263>`__ `#1267 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1267>`__ `#1325 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1325>`__ Route Content Manager operations through transport actions with dedicated action names.
-  `#1278 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1278>`__ Reduce the Content Manager privileges.
-  Require ``.wazuh-internal-state`` to be a protected system index before storing the CTI token.
-  Limit the logtest request size and run logtest on a dedicated thread pool.
-  Request compressed responses from the CTI API.
-  `#1584 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1584>`__ Use the CTI API setting as the base URL for the CTI Console.
-  `#1797 <https://github.com/wazuh/wazuh-indexer/issues/1797>`__ Increase the Content Manager's default wait for the setup plugin to be ready.
-  `#1856 <https://github.com/wazuh/wazuh-indexer/issues/1856>`__ Rename the Engine Unix socket file to ``engine-api-http.sock``.
-  Mediate AI assistant session writes through the setup plugin.
-  `#1420 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1420>`__ Remove the upper bounds of the Content Manager resource limit settings.
-  `#477 <https://github.com/wazuh/wazuh-indexer-plugins/issues/477>`__ `#539 <https://github.com/wazuh/wazuh-indexer-plugins/issues/539>`__ `#547 <https://github.com/wazuh/wazuh-indexer-plugins/issues/547>`__ `#562 <https://github.com/wazuh/wazuh-indexer-plugins/issues/562>`__ `#582 <https://github.com/wazuh/wazuh-indexer-plugins/issues/582>`__ `#641 <https://github.com/wazuh/wazuh-indexer-plugins/issues/641>`__ `#697 <https://github.com/wazuh/wazuh-indexer-plugins/issues/697>`__ `#741 <https://github.com/wazuh/wazuh-indexer-plugins/issues/741>`__ `#811 <https://github.com/wazuh/wazuh-indexer-plugins/issues/811>`__ `#906 <https://github.com/wazuh/wazuh-indexer-plugins/issues/906>`__ `#1015 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1015>`__ `#1123 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1123>`__ Update third-party integrations to their latest versions.
-  `#927 <https://github.com/wazuh/wazuh-indexer-plugins/issues/927>`__ `#1215 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1215>`__ Update documentation for Sigma rules and their extended syntax.
-  `#1270 <https://github.com/wazuh/wazuh-indexer/issues/1270>`__ Update build documentation to include the Security Analytics plugin.
-  `#846 <https://github.com/wazuh/wazuh-indexer-plugins/issues/846>`__ `#1012 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1012>`__ Update the Wazuh Indexer documentation.
-  `#1546 <https://github.com/wazuh/wazuh-indexer/issues/1546>`__ `#1571 <https://github.com/wazuh/wazuh-indexer/issues/1571>`__ Update build, installation and offline installation documentation.
-  `#1540 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1540>`__ `#1541 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1541>`__ `#319 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/319>`__ Rename Security Analytics to Ruleset Management in the Reference Manual and update the MITRE fields documentation.
-  `#1122 <https://github.com/wazuh/wazuh-indexer/issues/1122>`__ Add version to the GH Workflow names.
-  `#1129 <https://github.com/wazuh/wazuh-indexer/issues/1129>`__ Update GitHub Actions to the latest version available.
-  `#1191 <https://github.com/wazuh/wazuh-indexer/issues/1191>`__ Track GitHub Actions version updates with Dependabot.
-  `#442 <https://github.com/wazuh/wazuh-indexer-plugins/issues/442>`__ Configure Dependabot to scan every plugin.
-  `#615 <https://github.com/wazuh/wazuh-indexer-plugins/issues/615>`__ Regenerate dependent stateless modules when their base module changes.
-  `#461 <https://github.com/wazuh/wazuh-indexer-plugins/issues/461>`__ `#623 <https://github.com/wazuh/wazuh-indexer-plugins/issues/623>`__ `#879 <https://github.com/wazuh/wazuh-indexer-plugins/issues/879>`__ Restructure the WCS files and folders.
-  `#624 <https://github.com/wazuh/wazuh-indexer-plugins/issues/624>`__ Restructure the repository tooling.
-  `#626 <https://github.com/wazuh/wazuh-indexer-plugins/issues/626>`__ Pin ``mdbook`` to version ``0.4.x``.
-  `#645 <https://github.com/wazuh/wazuh-indexer-plugins/issues/645>`__ Save the flattened ECS definition of stateless modules.
-  `#654 <https://github.com/wazuh/wazuh-indexer-plugins/issues/654>`__ `#1439 <https://github.com/wazuh/wazuh-indexer/issues/1439>`__ `#1443 <https://github.com/wazuh/wazuh-indexer/issues/1443>`__ Improve CI workflows, caches and artifact publication.
-  `#1595 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1595>`__ Resolve the plugins' build version from ``VERSION.json``.
-  `#604 <https://github.com/wazuh/wazuh-indexer-plugins/issues/604>`__ Remove the ``ecs`` object from WCS definitions.
-  `#689 <https://github.com/wazuh/wazuh-indexer-plugins/issues/689>`__ Remove the alerts and archives index templates.
-  `#1063 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1063>`__ Remove the vulnerability scanner reference field.
-  `#806 <https://github.com/wazuh/wazuh-indexer-plugins/issues/806>`__ Remove non-standard IP and geo fields from the F5 BIG-IP mappings.
-  `#1558 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1558>`__ Remove unused fields from the ``wazuh-metrics-agents`` template.
-  `#530 <https://github.com/wazuh/wazuh-indexer-plugins/issues/530>`__ Remove outdated documentation for the setup plugin.
-  `#1670 <https://github.com/wazuh/wazuh-indexer/issues/1670>`__ Remove the swap section from the documentation, superseded by ``bootstrap.memory_lock``.
-  `#440 <https://github.com/wazuh/wazuh-indexer-plugins/issues/440>`__ Remove plugins not planned for 5.x.


Security analytics
~~~~~~~~~~~~~~~~~~

-  `#1 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/1>`__ Initialize ``wazuh-indexer-security-analytics`` repository.
-  `#103 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/103>`__ Compatibility with OpenSearch 3.6.0.
-  `#112 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/112>`__ `#1029 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1029>`__ `#1356 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1356>`__ `#1403 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1403>`__ Add standard threat detectors, created and configured from CTI for every Wazuh integration.
-  `#37 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/37>`__ `#812 <https://github.com/wazuh/wazuh-indexer-plugins/issues/812>`__ Add lifecycle spaces (``draft``, ``test``, ``custom``, ``standard``) for rules and integrations.
-  `#57 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/57>`__ `#72 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/72>`__ `#1121 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1121>`__ `#214 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/214>`__ Add enriched, WCS-compliant findings to the ``wazuh-findings-v5-<category>`` data streams.
-  `#1208 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1208>`__ Add MITRE ATT&CK tactic, technique and sub-technique fields to findings.
-  `#181 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/181>`__ Add dynamic rule fields in findings.
-  `#1220 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1220>`__ `#1334 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1334>`__ Add findings case management.
-  `#56 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/56>`__ Add rule testing capabilities in logtest.
-  `#47 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/47>`__ Add WCS validation for Sigma rule fields.
-  `#173 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/173>`__ Add the Sigma ``exists`` modifier.
-  `#832 <https://github.com/wazuh/wazuh-indexer-plugins/issues/832>`__ Add the ``unclassified`` log category.
-  `#111 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/111>`__ `#1276 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1276>`__ `#1420 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1420>`__ Add settings to limit the number of detectors and the rules per detector.
-  `#244 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/244>`__ `#1683 <https://github.com/wazuh/wazuh-indexer/issues/1683>`__ Add settings to tune findings enrichment and correlation under load.
-  `#1531 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1531>`__ Add a log entry when a threat detector is enabled or disabled.
-  `#743 <https://github.com/wazuh/wazuh-indexer-plugins/issues/743>`__ Add a GitHub Action to publish Security Analytics and its commons library to the local Maven repository.
-  `#60 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/60>`__ Add Spotless formatting checks and a pre-commit hook.
-  `#88 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/88>`__ Add the ``--set-as-main`` flag to the repository bumper.
-  `#145 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/145>`__ `#234 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/234>`__ Add revert support to the repository bumper workflow.
-  `#291 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/291>`__ Add reporting of skipped bumps to the repository bumper workflow.
-  `#1 <https://github.com/wazuh/wazuh-indexer-alerting/issues/1>`__ `#1 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/1>`__ Replace OpenSearch alerting and common-utils with their Wazuh indexer forks.
-  `#39 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/39>`__ `#117 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/117>`__ Reject threat detectors that mix ``standard`` and ``custom`` rules or use rules not yet promoted from ``draft`` or ``test``.
-  `#208 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/208>`__ Restrict threat detector data sources to ``wazuh-events-v5*``.
-  `#1214 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1214>`__ Change the ``rule`` field of the rules indices from ``nested`` to ``object``.
-  `#1341 <https://github.com/wazuh/wazuh-indexer/issues/1341>`__ Upgrade the CI workflows to JDK 25.
-  `#1368 <https://github.com/wazuh/wazuh-indexer/issues/1368>`__ Upgrade the GitHub Actions to Node.js 24.
-  `#1439 <https://github.com/wazuh/wazuh-indexer/issues/1439>`__ Publish the plugin zip to the local Maven repository under the ``com.wazuh`` group.
-  `#1443 <https://github.com/wazuh/wazuh-indexer/issues/1443>`__ Share build artifacts between workflow jobs through the Maven cache.
-  `#1595 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1595>`__ Resolve the plugin build version from ``VERSION.json``.
-  `#61 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/61>`__ `#110 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/110>`__ `#1497 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1497>`__ Update CodeQL configuration.
-  `#219 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/219>`__ Remove the Threat Intelligence (IOC) feature, its REST endpoints and settings.
-  `#38 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/38>`__ Remove the rule and log type management REST endpoints.


Notifications
~~~~~~~~~~~~~

-  `#2 <https://github.com/wazuh/wazuh-indexer-notifications/issues/2>`__ `#1335 <https://github.com/wazuh/wazuh-indexer/issues/1335>`__ Initialize ``wazuh-indexer-notifications`` repository.
-  `#6 <https://github.com/wazuh/wazuh-indexer-notifications/issues/6>`__ Add the Active Response notification channel.
-  `#41 <https://github.com/wazuh/wazuh-indexer-notifications/issues/41>`__ Add batch indexing for Active Response documents.
-  `#45 <https://github.com/wazuh/wazuh-indexer-notifications/issues/45>`__ Create default notification channels on startup.
-  `#101 <https://github.com/wazuh/wazuh-indexer-notifications/issues/101>`__ Add the complete ``wazuh`` fieldset to Active Response events.
-  `#1276 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1276>`__ `#1420 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1420>`__ Add settings to limit notification configurations, groups, senders and active responses.
-  `#1853 <https://github.com/wazuh/wazuh-indexer/issues/1853>`__ Block webhook channels from reaching loopback, private and cloud-metadata addresses by default.
-  `#1595 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1595>`__ Resolve the build version from ``VERSION.json``.


Alerting
~~~~~~~~

-  `#1 <https://github.com/wazuh/wazuh-indexer-alerting/issues/1>`__ Initialize ``wazuh-indexer-alerting`` repository.
-  `#4 <https://github.com/wazuh/wazuh-indexer-alerting/issues/4>`__ Compatibility with OpenSearch 3.6.0.
-  `#8 <https://github.com/wazuh/wazuh-indexer-alerting/issues/8>`__ Add a dedicated active response monitor type.
-  `#1276 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1276>`__ `#1420 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1420>`__ Add a configurable limit on the number of monitors (``plugins.alerting.monitor.max_monitors``).
-  `#3 <https://github.com/wazuh/wazuh-indexer-alerting/issues/3>`__ Add the ``--set-as-main`` flag to the repository bumper.
-  `#19 <https://github.com/wazuh/wazuh-indexer-alerting/issues/19>`__ `#81 <https://github.com/wazuh/wazuh-indexer-alerting/issues/81>`__ Add revert support to the repository bumper workflow.
-  `#125 <https://github.com/wazuh/wazuh-indexer-alerting/issues/125>`__ Add reporting of skipped bumps to the repository bumper workflow.
-  `#1274 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1274>`__ Disable alert history, finding history and comments by default.
-  `#1683 <https://github.com/wazuh/wazuh-indexer/issues/1683>`__ Improve doc-level monitor performance by not forcing a findings index refresh per batch.
-  `#7 <https://github.com/wazuh/wazuh-indexer-alerting/issues/7>`__ Reduce log noise from monitor creation and from queries over unmapped fields.
-  `#1443 <https://github.com/wazuh/wazuh-indexer/issues/1443>`__ Share build artifacts between workflow jobs through the Maven cache.
-  `#1439 <https://github.com/wazuh/wazuh-indexer/issues/1439>`__ Rename the ``build.revision`` build argument to ``revision``.
-  `#1595 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1595>`__ Resolve the plugin build version from ``VERSION.json``.
-  `#1497 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1497>`__ Update CodeQL configuration.


Reporting
~~~~~~~~~

-  `#1 <https://github.com/wazuh/wazuh-indexer-reporting/issues/1>`__ `#999 <https://github.com/wazuh/wazuh-indexer/issues/999>`__ Initialize ``wazuh-indexer-reporting`` repository.
-  `#62 <https://github.com/wazuh/wazuh-indexer-reporting/issues/62>`__ Add email notifications for scheduled and on-demand reports.
-  `#1276 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1276>`__ `#1420 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1420>`__ Add a setting to limit the number of report definitions.
-  `#42 <https://github.com/wazuh/wazuh-indexer-reporting/issues/42>`__ `#136 <https://github.com/wazuh/wazuh-indexer-reporting/issues/136>`__ `#153 <https://github.com/wazuh/wazuh-indexer-reporting/issues/153>`__ Add the repository bumper.
-  `#737 <https://github.com/wazuh/wazuh-indexer/issues/737>`__ Add the code quality check workflows.
-  `#1122 <https://github.com/wazuh/wazuh-indexer/issues/1122>`__ `#1129 <https://github.com/wazuh/wazuh-indexer/issues/1129>`__ `#1191 <https://github.com/wazuh/wazuh-indexer/issues/1191>`__ Update the maintenance workflows.
-  `#1595 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1595>`__ Resolve the build version from ``VERSION.json``.
-  `#65 <https://github.com/wazuh/wazuh-indexer-reporting/issues/65>`__ Remove the proof-of-concept code for query results in email notifications.


Common utils
~~~~~~~~~~~~

-  `#1 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/1>`__ Initialize ``wazuh-indexer-common-utils`` repository.
-  `#15 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/15>`__ Compatibility with OpenSearch 3.6.0.
-  `#2 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/2>`__ Add the active response notification channel type.
-  `#8 <https://github.com/wazuh/wazuh-indexer-alerting/issues/8>`__ Add a dedicated monitor type for active response.
-  `#1589 <https://github.com/wazuh/wazuh-indexer/issues/1589>`__ Add an ``internalCaller`` flag to monitor index requests.
-  `#9 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/9>`__ Add the ``--set-as-main`` flag to the repository bumper.
-  `#24 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/24>`__ `#82 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/82>`__ Add revert support to the repository bumper workflow.
-  `#113 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/113>`__ Add reporting of skipped bumps to the repository bumper workflow.
-  `#285 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/285>`__ `#1529 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1529>`__ Allow ``keyword`` and ``match_only_text`` fields in custom query index mappings.
-  `#181 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/181>`__ Allow ``{{ field }}`` placeholders in doc-level query tags.
-  `#1439 <https://github.com/wazuh/wazuh-indexer/issues/1439>`__ Update the Maven POM with Wazuh details.
-  `#1595 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1595>`__ Resolve the build version from ``VERSION.json``.
-  `#16 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/16>`__ Update CodeQL configuration.


Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7532 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7532>`__ Added the health check service and app.
-  `#985 <https://github.com/wazuh/wazuh-dashboard/issues/985>`__ Added manager host configuration to the default configuration file.
-  `#1052 <https://github.com/wazuh/wazuh-dashboard/issues/1052>`__ Set the v9 theme as default.
-  `#8550 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8550>`__ Added version, revision, and stage to the Wazuh build metadata.
-  `#1434 <https://github.com/wazuh/wazuh-dashboard/issues/1434>`__ Made the Discover CSV download row limit configurable via the ``reports.csv.maxRows`` setting.
-  `#1480 <https://github.com/wazuh/wazuh-dashboard/issues/1480>`__ Added automatic generation and storage of the AI assistant encryption key on first install.
-  `#9199 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9199>`__ Added the About page as a platform plugin, moved from the Wazuh dashboard plugins.
-  `#9199 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9199>`__ Added the ``opensearchDashboards.branding.applicationVersion``, ``opensearchDashboards.branding.helpMenuLinks`` and ``about.communityLinks`` settings to override the displayed version, help menu links and About page community links.
-  `#9173 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9173>`__ Added support for health check tasks to report their own result status.
-  `#1594 <https://github.com/wazuh/wazuh-dashboard/issues/1594>`__ Added the issuance of the dashboard TLS certificates from the shared Wazuh root CA on a fresh install, creating the CA when none exists.
-  `#798 <https://github.com/wazuh/wazuh-dashboard/issues/798>`__ Changed the location of the ``wazuh-dashboard`` service to match the other Wazuh components.
-  `#985 <https://github.com/wazuh/wazuh-dashboard/issues/985>`__ Changed the default value of the ``metaFields`` and ``timepicker:timeDefaults`` settings.
-  `#8473 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8473>`__ Excluded Wazuh dashboards and visualizations listing.
-  `#1329 <https://github.com/wazuh/wazuh-dashboard/issues/1329>`__ Changed the log level of the cross compatibility service on start.
-  `#8979 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8979>`__ Changed the sidecar flyout to displace open flyouts instead of covering them.
-  `#8989 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8989>`__ Changed the sidecar resizable button emphasis styles to trigger on ``:active`` instead of ``:focus``.
-  `#9173 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9173>`__ Changed health check tasks to require returning a task result instead of an arbitrary value.
-  `#1594 <https://github.com/wazuh/wazuh-dashboard/issues/1594>`__ Changed the packages to resolve the ``kibanaserver`` and ``wazuh-wui`` passwords into the keystore from ``/etc/wazuh/credentials.env`` instead of shipping default values.
-  `#1594 <https://github.com/wazuh/wazuh-dashboard/issues/1594>`__ Changed the packages to install ``/usr/share/wazuh-dashboard`` as ``root:root`` and ``/etc/default/wazuh-dashboard`` as ``root:wazuh-dashboard``.
-  `#1637 <https://github.com/wazuh/wazuh-dashboard/issues/1637>`__ Changed the package install to end with the dashboard URL, the login user and the start command, and to print the certificate detail only with ``WAZUH_DASHBOARD_VERBOSE=1``.
-  `#699 <https://github.com/wazuh/wazuh-dashboard/issues/699>`__ Removed creation of ``/usr/lib/.build-id/*`` links to prevent conflicts when installing Wazuh Dashboard alongside OpenSearch Dashboards on the same system.
-  `#1381 <https://github.com/wazuh/wazuh-dashboard/issues/1381>`__ Removed the Anomaly Detection plugin from the default Wazuh dashboard package.

Plugins
~~~~~~~

-  `#7464 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7464>`__ Added sample data generators for agent monitoring and server statistics.
-  `#7680 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7680>`__ Added prompts to views related to Server API connectivity and alerts index pattern issues.
-  `#7741 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7741>`__ Added "Not applicable" status to the SCA ``CheckResult`` enum, with corresponding color mapping (``#B9A888``) and sample data support.
-  `#7920 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7920>`__ Added the default ``wazuh-events-v5*`` index pattern.
-  `#8002 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8002>`__ Added SSL certificate support for Wazuh API connections, allowing the dashboard to use client certificates and CA certificate validation when connecting to Wazuh Manager APIs configured with custom SSL certificates. The ``verify_ca`` value is automatically calculated based on whether certificate paths (``key``, ``cert``, ``ca``) are configured.
-  `#8002 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8002>`__ Added "Verify CA" column in the API Connections table to display whether CA certificate verification is enabled for each API host. The value is automatically determined based on certificate configuration.
-  `#1086 <https://github.com/wazuh/wazuh-dashboard/issues/1086>`__ Added ``server-api:run_as`` health check to warn when ``allow_run_as`` is disabled for configured API hosts.
-  `#8203 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8203>`__ Added Indexer management **Settings**.
-  `#8229 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8229>`__ Added ``wazuh-findings-v5*`` index patterns.
-  `#8263 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8263>`__ Added ``policy.name``, ``policy.description``, ``policy.file`` and ``event.outcome`` columns to the Configuration Assessment Findings table.
-  `#8246 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8246>`__ Added ``wazuh-state-fim*`` index pattern.
-  `#8272 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8272>`__ Added Indexer configuration UI section in **Server Management** > **Settings**.
-  `#8275 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8275>`__ Added CMMC regulatory compliance module.
-  `#8276 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8276>`__ Added FedRAMP regulatory compliance module.
-  `#8277 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8277>`__ Added ISO 27001 regulatory compliance module.
-  `#8278 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8278>`__ Added NIS2 regulatory compliance module.
-  `#8279 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8279>`__ Added NIST 800-171 regulatory compliance module.
-  `#213 <https://github.com/wazuh/wazuh-dashboard-security-analytics/issues/213>`__ Added ``wazuh-threatintel-enrichments*`` index patterns.
-  `#8391 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8391>`__ Added a Refresh button to the suggested filters search bar.
-  `#8401 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8401>`__ Added the ability to generate a PDF report in the Vulnerabilities dashboard.
-  `#8428 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8428>`__ Added the ``wazuh-metrics-normalization*`` index pattern.
-  `#8428 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8428>`__ Added the Normalization tab and dashboard in **Server management** > **Statistics**.
-  `#8556 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8556>`__ Added the Case Management tab to the Findings document details flyout.
-  `#8557 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8557>`__ Created the case management app.
-  `#8609 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8609>`__ Added visualizations to **Vulnerability Detection** > **Inventory**.
-  `#8595 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8595>`__ Added the Incident Response app.
-  `#342 <https://github.com/wazuh/wazuh-dashboard-security-analytics/issues/342>`__ Added the ``wazuh.disabledSettings`` configuration to hide specific settings in the Indexer Settings UI.
-  `#8718 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8718>`__ Expanded the case management form with title, description, severity, priority and TLP fields, comments that can be added or edited individually, and a confirmation dialog before discarding unsaved changes.
-  `#8768 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8768>`__ Added queue usage in bytes and agent cache visualizations to **Server management** > **Statistics**, and relabeled the Comms "Queue usage" Y-axis to Bytes.
-  `#8789 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8789>`__ Added the Wazuh AI Assistant plugin.
-  `#8846 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8846>`__ Added the ``wazuh-agent-stats`` index pattern and a sample data generator for the agent statistics index.
-  `#8856 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8856>`__ Added a success notification when an agent upgrade completes in Agent management > Summary, based on polling the agent's reported version instead of the removed upgrade task tracking.
-  `#8961 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8961>`__ Added the ``dispatched`` and ``failed`` task counters to the agent Stats tab.
-  `#9067 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9067>`__ Added a ``wazuh_ai_assistant.settingsReadOnly`` configuration key to lock AI Assistant settings and providers to their current configuration, rejecting write requests regardless of the caller's own indexer permissions.
-  `#9020 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9020>`__ Added a "Scan vulnerabilities" action to request an on-demand vulnerability scan for one or multiple agents from the agents table.
-  `#9061 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9061>`__ Added the HTTPS, legacy, and agents settings sections to **Server management** > **Settings** > **Global configuration** > **Remote**.
-  `#9103 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9103>`__ Added an SSL verification switch and an optional manager CA file path to the **Deploy new agent** wizard's optional settings, so the generated enrollment command can pin the manager CA or explicitly opt out of TLS verification.
-  `#9145 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9145>`__ Added an enrollment token step to the **Deploy new agent** wizard: the server mints the token for the typed address, with an optional lifetime, number of enrollments and description, or the operator reuses a token kept from an earlier deployment, and the generated command installs the agent with ``WAZUH_ENROLLMENT_TOKEN``.
-  `#9145 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9145>`__ Folded the **Deploy new agent** wizard's optional inputs behind a **View advanced options** link in the **Server address** and **Enrollment token** steps, so the default path is the address plus one click to generate a token.
-  `#9145 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9145>`__ Added an **Enrollment tokens** app to ``Agents management``, listing the tokens the server has minted and letting them be created, revoked and purged.
-  `#9110 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9110>`__ Redesigned ``Server management`` > ``Configuration`` and the agent ``Configuration`` tab: every setting is now shown directly, grouped by category and subsection, instead of behind a click-through overview; a search box filters this same view in place by name, category, description, or value.
-  `#9193 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9193>`__ Added an **Add new group** action to the **Deploy new agent** wizard's group selector, sharing the popover of ``Agents management`` > ``Groups``, and selecting the created group for the enrollment command.
-  `#9173 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9173>`__ Added a ``server-api:certificate-validity`` health check that warns when a manager node's listener or CA certificates approach expiry, and reports an error once they are about to expire, have expired, or the CA bundle no longer lets an agent validate the certificate the listener serves.
-  `#9199 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9199>`__ Moved the About page (app version and community links) into a new ``opensearch_dashboards.yml``-configurable plugin in ``wazuh-dashboard``, and made the top-right help menu's version and links configurable the same way.
-  `#9053 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9053>`__ Adapted the agent Communication view and the Deploy new agent wizard to the unified agent ``<endpoint>``: the view renders the single reported endpoint instead of the ``address``/``port`` table, and the wizard collects the address, port, and path prefix separately and generates ``WAZUH_MANAGER_ENDPOINT``. Removed the ``WAZUH_PROTOCOL`` parameter.
-  `#8641 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8641>`__ Reduced peak resource usage during plugin startup by processing index-pattern initialization tasks in small batches instead of all at once.
-  `#1090 <https://github.com/wazuh/wazuh-dashboard/issues/1090>`__ Changed default index pattern settings key from ``defaultIndex`` to ``wazuh-events-v5*``.
-  `#7839 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7839>`__ Adapted alerts sample data to the Wazuh Common Schema.
-  `#7688 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7688>`__ Set cluster mode as the default for all Wazuh installations, including single-node deployments, and updated RBAC permissions to ``cluster:*`` actions.
-  `#7578 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7578>`__ Reworked SCA module visualizations, enabled global details for all agents without pinning, replaced the ``/sca`` endpoint with the ``wazuh-states-sca-*`` index pattern, and added sample data support.
-  `#7601 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7601>`__ Split the FIM registry inventory into two index patterns and updated fields in FIM file and registry sample data.
-  `#7610 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7610>`__ Reworked the health check.
-  `#7610 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7610>`__ Reworked several view components to use data sources.
-  `#7740 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7740>`__ Fixed date and more format errors.
-  `#7808 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7808>`__ Upgraded the ``brace-expansion`` dependency to versions ``1.1.12`` and ``2.0.2``.
-  `#7808 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7808>`__ Upgraded the ``tar-fs`` dependency to version ``2.1.4``.
-  `#985 <https://github.com/wazuh/wazuh-dashboard/issues/985>`__ Migrated ``wazuh.yml`` settings to ``opensearch_dashboards.yml`` and advanced settings.
-  `#985 <https://github.com/wazuh/wazuh-dashboard/issues/985>`__ Changed sample data index names.
-  `#7895 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7895>`__ Reworked the **Generate report** button.
-  `#7815 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7815>`__ Changed the dashboard renderer to use saved objects.
-  `#7925 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7925>`__ Changed the ``rule.groups`` filter to ``wazuh.integration.decoders``.
-  `#7965 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7965>`__ Applied the new home page navigation style to all dashboards.
-  `#8059 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8059>`__ Updated Office 365 dashboards to use new index pattern.
-  `#8058 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8058>`__ Updated GitHub dashboards to use new index pattern.
-  `#8044 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8044>`__ Updated File Integrity Monitoring dashboards to use new index pattern.
-  `#8054 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8054>`__ Updated Google Cloud dashboard to use new index pattern.
-  `#8055 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8055>`__ Updated Amazon web services dashboard to use new index pattern.
-  `#8056 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8056>`__ Updated Microsoft Graph API dashboard to use new index pattern.
-  `#8042 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8042>`__ Updated Threat Hunting dashboard with new index pattern definition.
-  `#8123 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8123>`__ Upgraded the ``axios`` dependency to ``1.15.2``.
-  `#8123 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8123>`__ Upgraded loglovel to 1.9.2.
-  `#8057 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8057>`__ Updated Docker module under Cloud Security, with new index pattern definition.
-  `#8134 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8134>`__ Changed Ossec references to wazuh-manager.
-  `#1118 <https://github.com/wazuh/wazuh-dashboard/issues/1118>`__ Changed default Dev Tools request from deprecated ``GET /manager/info`` to ``GET /cluster/<NODE_NAME>/info``.
-  `#8120 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8120>`__ Upgraded ESLint from version 8 to version 10 and migrated configuration from legacy ``.eslintrc.json`` to the new flat config format (``eslint.config.mjs``).
-  `#8138 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8138>`__ Updated Malware Detection dashboard with new index pattern definition.
-  `#8170 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8170>`__ Removed Manager UUID from Server APIs table and added Cluster UUID on About page.
-  `#8139 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8139>`__ Updated Security Operations dashboards with new index pattern definition.
-  `#8223 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8223>`__ Changed the monitoring and statistics index patterns to ``wazuh-metrics-agents*`` and ``wazuh-metrics-comms-v4*``; Comms metrics now only refer to 4.x agents.
-  `#8227 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8227>`__ Renamed the **Events** tab to **Findings**.
-  `#8226 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8226>`__ Replaced the broken visualization in Configuration Assessment.
-  `#8225 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8225>`__ Swapped menu positions of Vulnerability detection and MITRE ATT&CK.
-  `#8219 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8219>`__ Removed the Cluster app and relocated some panels to the Status app.
-  `#8234 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8234>`__ Changed the default value of ``wazuh.updates.disabled`` from ``false`` to ``true``.
-  `#8228 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8228>`__ Centralized regulatory compliance modules (PCI DSS, GDPR, HIPAA, NIST 800-53, and TSC) into a single "Regulatory Compliance" application.
-  `#8261 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8261>`__ Updated Vulnerability Detection Discover tab filters, and inventory columns.
-  `#8268 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8268>`__ Changed FIM table columns and index source in the agent view.
-  `#8305 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8305>`__ Changed index pattern usage in MITRE ATT&CK and Compliance panels in the agent overview.
-  `#8274 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8274>`__ Updated the Threat Hunting dashboard with the new index pattern definition.
-  `#8272 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8272>`__ Changed Cluster and Logging configuration sections in **Server Management** > **Settings** to use the full node configuration endpoint.
-  `#8284 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8284>`__ Changed the last alerts home KPI's title to **Findings**.
-  `#8312 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8312>`__ Changed IT Hygiene memory visualization.
-  `#8316 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8316>`__ Reduced the requests done to get the index pattern to use in some views.
-  `#8319 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8319>`__ Changed default columns in Configuration assessment.
-  `#8348 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8348>`__ Set the downloaded local agent package name to match the remote one.
-  `#8550 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8550>`__ Updated agent install and download commands to use the release stage for package naming.
-  `#8416 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8416>`__ Changed FIM findings default columns.
-  `#8344 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8344>`__ Allowed only one server API configuration per indexer.
-  `#8341 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8341>`__ Updated the OS icon source field in the Endpoints summary table to display Linux agent icons.
-  `#8159 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8159>`__ Reworked the Statistics dashboard.
-  `#8494 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8494>`__ Updated the breadcrumb label in **Agents management** > **Summary**.
-  `#8523 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8523>`__ Renamed Listener Engine tab to Comms in **Server management** > **Statistics** section.
-  `#8548 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8548>`__ Reworked the FIM overview and agent tab.
-  `#8560 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8560>`__ Updated MITRE ATT&CK dashboards to use techniques, subtechniques and tactics names.
-  `#8613 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8613>`__ Condensed the setting labels and added info tooltips in the registration service configuration view.
-  `#8696 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8696>`__ Adapted management of daemons status to the new API response schema.
-  `#1434 <https://github.com/wazuh/wazuh-dashboard/issues/1434>`__ Enhanced the description of the ``reports.csv.maxRows`` setting.
-  `#8760 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8760>`__ Reworked the Home page overview with more platform metrics.
-  `#8806 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8806>`__ Changed the Users form password validation to require a minimum of 12 characters, matching the manager RBAC policy.
-  `#8846 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8846>`__ Changed the endpoint stats view to read the agent statistics from the ``wazuh-agent-stats`` index instead of the removed server API endpoints.
-  `#8851 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8851>`__ Agent configuration reads from ``wazuh-agent-config``, replaces client buffer with batch settings, says when the agent last reported, prompts when it never reported, and matches the report by the selected cluster so an agent with the same ID in another cluster can no longer shadow it.
-  `#9042 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9042>`__ Improved the AI assistant explanatory answers: event substance (rule descriptions, command lines, vulnerability descriptions, integration category) now reaches the model, empty-result turns return written answers instead of canned copy, the final-answer instruction survives system-message hoisting, the 13 ``wazuh-states-*`` surfaces are queryable and discoverable, agent names resolve for id-only tools, and resolver ambiguity errors are scrubbed under privacy mode.
-  `#9040 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9040>`__ Changed the agent Office 365 and GitHub Overview configuration panels to read the agent's reported configuration from the ``wazuh-agent-config*`` index pattern instead of the Server API, telling apart the not reported, not configured, and read failed states, linking to the module documentation, and reporting an enabled GitHub module as enabled.
-  `#9074 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9074>`__ Changed the case management comment header to always show the creation date, with the edit date now shown in a tooltip on an italic "Edited" label.
-  `#9090 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9090>`__ Changed the Home page's Top 5 techniques bar chart links to open MITRE ATT&CK Findings filtered by the selected technique, instead of the Intelligence tab.
-  `#9089 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9089>`__ Changed the Home MITRE ATT&CK top tactics chart links to open the MITRE ATT&CK Framework tab filtered by the clicked tactic, instead of the Intelligence tab.
-  `#9092 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9092>`__ Changed the Global Configuration agents settings to read ``agents_disconnection_time`` and ``agents_disconnection_alert_time`` from the node configuration instead of the deprecated ``monitor`` component, showing the configured value with its time unit.
-  `#9094 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9094>`__ Adapted the manager configuration views to the native JSON types the manager now returns for its configuration sections (booleans, objects and arrays instead of the legacy string dialect).
-  `#9107 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9107>`__ Added a description under the Users, Roles, Policies and Roles mapping tabs of ``Server management`` > ``Security`` clarifying they manage the manager API's accounts.
-  `#9109 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9109>`__ Replaced the group Manage agents legacy shuttle with a single searchable table where checking a row stages it for adding or removing.
-  `#9148 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9148>`__ Changed the shared API table's Refresh and Export formatted buttons to show a loading/disabled state tied to the request in flight.
-  `#9183 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9183>`__ Changed the agent view to show which applications are pinned, why one can not be pinned, and as many shortcuts as fit in the header.
-  `#9182 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9182>`__ Updated the regulatory compliance requirement definitions of every framework.
-  `#9173 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9173>`__ Changed the health check tasks to report their own result status, so a check can report a warning without failing; the default notification channels check now reports a warning when some channel is missing instead of passing silently.
-  `#9202 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9202>`__ Changed the Wazuh plugins to use a single documented i18n message-id convention, translate the remaining ``wazuh-core`` and ``wazuh-check-updates`` UI strings, and remove the English translation catalogs that overrode the source text.
-  `#9220 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9220>`__ Changed the policy details in the ``Server management`` > ``Security`` > Roles edition flyout to list the actions and resources one per line.
-  `#9170 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9170>`__ Removed the Comms tab from ``Server Management`` > ``Statistics``.
-  `#7688 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7688>`__ Removed logic related to manager in favor to cluster management.
-  `#7464 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7464>`__ Removed the monitoring and statistics jobs in the backend side.
-  `#7464 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7464>`__ Removed monitoring and statistics job settings from the configuration.
-  `#7464 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7464>`__ Removed the prompt related to disabled statistics jobs in the **Statistics** application.
-  `#7594 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7594>`__ Removed configuration for modules relying on deprecated daemons: ``wazuh-agentlessd``, ``wazuh-csyslogd``, ``wazuh-dbd``, ``wazuh-integratord``, ``wazuh-maild``, and ``wazuh-reportd``.
-  `#7632 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7632>`__ Removed deprecated modules: OpenSCAP, CIS-CAT, and Osquery.
-  `#7610 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7610>`__ Removed the ``/health-check`` and ``/blank-screen`` frontend routes.
-  `#7610 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7610>`__ Removed the **Miscellaneous** section from **App Settings**.
-  `#7610 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7610>`__ Removed ``customization.logo.healthcheck``, ``checks.api``, ``checks.fields``, ``checks.maxBuckets``, ``checks.metaFields``, ``checks.pattern``, ``checks.setup``, ``checks.template`` and ``checks.timeFilter`` settings.
-  `#985 <https://github.com/wazuh/wazuh-dashboard/issues/985>`__ Removed ``customization.*``, ``alerts.sample.prefix``, ``configuration.ui_api_editable``, ``ip.selector`` settings.
-  `#985 <https://github.com/wazuh/wazuh-dashboard/issues/985>`__ Removed the **App Settings** application.
-  `#985 <https://github.com/wazuh/wazuh-dashboard/issues/985>`__ Removed ``GET /elastic/alerts`` and ``/utils/configuration*`` endpoints.
-  `#985 <https://github.com/wazuh/wazuh-dashboard/issues/985>`__ Removed task to sanitize the custom logos.
-  `#985 <https://github.com/wazuh/wazuh-dashboard/issues/985>`__ Removed task to migrate the reports directory.
-  `#7898 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7898>`__ Removed the ``Rules``, ``Decoders``, ``CDB List`` and ``Ruleset test`` apps, whose capabilities are now provided by the Ruleset management plugin.
-  `#7813 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7813>`__ Removed the legacy reporting application, including server routes, UI, PDF generation logic, and related customization settings.
-  `#7888 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7888>`__ Removed several sections from **Server Management** > **Settings** and agent configuration.
-  `#7925 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7925>`__ Removed ``wazuh-alerts*`` index pattern and replaced with ``wazuh-events-v5*`` as the default index pattern. Removed index pattern selector from top navigation bar as index pattern selection is now handled through module-specific configurations.
-  `#7925 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7925>`__ Removed the ``ip.ignore`` and ``pattern`` settings.
-  `#7976 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7976>`__ Removed references to alerts and archives templates.
-  `#7837 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7837>`__ Remove files related to indexer resources from the source code and obtained when installing the dependencies of the ``wazuh`` plugin.
-  `#8048 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8048>`__ Removed deprecated settings of Policy monitoring.
-  `#8053 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8053>`__ Removed the UI permission validation for the upgrade and remove agent actions on Agent management > Summary.
-  `#8100 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8100>`__ Removed ``hideManagerAlerts`` setting.
-  `#8101 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8101>`__ Removed usage of agent ``000``.
-  `#8123 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8123>`__ Removed ``needle`` dependency.
-  `#8123 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8123>`__ Removed ``read-last-lines`` dependency.
-  `#8192 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8192>`__ Removed Key Request configuration options from the Registration Service view.
-  `#8213 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8213>`__ Removed Sample Data app and related endpoints to manage.
-  `#1169 <https://github.com/wazuh/wazuh-dashboard/issues/1169>`__ Removed some options of the manager and agent configuration.
-  `#8305 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8305>`__ Removed the GPG13 option in the Compliance panel in the agent overview.
-  `#8836 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8836>`__ Removed the agents table ``Synced`` column and the agent configuration synchronization badge, deprecated with the ``group_config_status`` and ``mergedSum`` properties of the ``/agents`` endpoint.
-  `#8840 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8840>`__ Removed the usage of the deprecated agent configuration synchronization properties: ``data.configuration`` from ``agents/summary/status``, and ``agent_status.configuration`` and ``last_registered_agent.mergedSum`` from ``/overview/agents``.
-  `#8856 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8856>`__ Removed the upgrade task tracking (in-progress panel, task details modal and ``task_id`` from upgrade responses) from Agent management > Summary, as the Wazuh Server API no longer exposes ``/tasks/status``; replaced by polling the agent's own version (see Added).
-  `#8956 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8956>`__ Removed the usage of the deprecated agent ``node_name`` property (the ``Cluster node`` column of the agents table, the ``Cluster node`` field of the agent details, the ``node_name`` search bar suggestion and CSV column, and the ``node_name`` field requested to the ``/agents`` endpoint) and the deprecated ``GET /agents/{agent_id}/daemons/stats`` endpoint from the API reference and the security actions metadata.
-  `#9115 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9115>`__ Removed the unused dashboard and visualization definition files, and the panel builders they replaced, left over after the dashboards moved to saved objects (see #7815). The dashboards are unaffected: they are built from the ``.ndjson`` definitions.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#39078 <https://github.com/wazuh/wazuh/issues/39078>`__ Documented that re-enrollment supports agent ids of **up to eight digits**: the bearer's ``kid`` is validated with the manager's eight-character id rule and the agent applies the same rule to the answer, so an agent whose id has nine or ten digits cannot rotate its credentials. Administrative insertion (``POST /agents``, ``manage_agents``) still accepts the full id range, deliberately: restricting it would not remove the mismatch, because the automatic id counter follows the highest id in ``client.keys`` and would hand out a long id again at the next self-enrollment.
-  `#39078 <https://github.com/wazuh/wazuh/issues/39078>`__ Fixed an agent keeping credentials the database never received. Both an enrollment and a re-enrollment answered with a key and a re-enrollment secret long before the writer stored them, so a ``wazuh-db`` outage — or a crash between the answer and the write — left the agent with a key ``client.keys`` would eventually carry and a secret nothing durable held: it could talk to the manager and could never re-enroll. ``wazuh-manager-authd`` now records every transition in ``queue/authd/pending-identities`` (mode 0640) **before** answering, retries it on its own timer while the database is out of reach, and drops the entry only once the write is committed — through the new ``global commit`` query of ``wazuh-manager-db``, since an ``ok`` comes from inside a deferred transaction. At start-up each recorded transition is judged against ``client.keys`` by key, not by agent id, so a rotation that was superseded is discarded and one that is still owed is applied, coexisting with a row rebuilt from ``client.keys`` with no secret. A transition that cannot be recorded — unwritable directory, or 5000 already waiting — is refused with the new ``9031`` (*Identity transition could not be recorded*, ``remoted``'s ``503``, the API's ``1772``) instead of handing out a credential nothing wrote down.
-  `#39078 <https://github.com/wazuh/wazuh/issues/39078>`__ Fixed two re-enrollments with the same credential rotating an agent twice. ``local_reenroll()`` read the agent's re-enrollment secret from the database and verified the bearer before taking any lock, and the database keeps naming that secret until the writer replaces it, so a second request could verify the very same bearer and rotate again: two valid answers for one agent, the first silently invalidated by the second. A rotation now reserves the agent before the database is asked and the reservation is released by the writer, once the new credentials are stored; a caller that finds it taken gets the new ``9030`` (*Re-enrollment already in progress*), which ``remoted`` answers as ``409`` and counts as ``remoted.enroll.reenroll.rejected_in_progress`` — a retry, as opposed to the ``401`` a bearer gets once the rotation has landed. A failed database write deliberately keeps the reservation: the row still holds the old secret, and letting it authorise another rotation is the defect itself.
-  `#39078 <https://github.com/wazuh/wazuh/issues/39078>`__ Fixed a revoked enrollment token coming back after a restart when the store could not be written. ``wazuh-manager-authd`` marked the token revoked in memory and, if saving failed, a later retry took the idempotent shortcut and answered success without writing anything, so the file — and every worker replica made from it — kept the token active. A revoke now either lands on disk or is reported as the new error ``9029`` (*Enrollment token store write failed*, the API's ``1771`` with HTTP 500), told apart from the ``9022`` of an unknown id because the token does exist and the operator has to retry. The pending revocation survives a reload and the next token verb writes it.
-  `#39078 <https://github.com/wazuh/wazuh/issues/39078>`__ Fixed ``wazuh-manager-authd`` loading an enrollment token store it could never write back: a file with more than 5000 tokens, or above the serialized byte ceiling, is now refused with a warning naming the limit it crossed, keeping whatever was already loaded. It also documents, in the module reference, that a use counted while the file cannot be written is not durable — a restart may admit another enrollment with that token — while expiry and revocation are.
-  `#39078 <https://github.com/wazuh/wazuh/issues/39078>`__ Fixed the manager publishing private key material through ``GET /cacerts`` and ``--embed-ca``. Both surfaces used to hand out the bytes of ``remote.https.ca_certificate`` after checking only that they contained a certificate marker, so a PEM that also carried the CA's private key — a misprovisioned but accepted input — was served whole to any unauthenticated caller. The manager now parses that file and publishes a document it re-serialises from the X.509 objects it found, so nothing but certificates can leave through either surface; a file that cannot be parsed to its end is refused whole instead of served up to its first bad block. Minting also stopped reading the file twice: the certificate it validates is the one it embeds.
-  `#39078 <https://github.com/wazuh/wazuh/issues/39078>`__ Fixed ``GET /cacerts`` answering with a coherence verdict up to a day old. The PEM was re-read on every request while the decision about whether it signs the served certificate came from the start-up evaluation or the daily tick, so a CA replaced in place could be handed out with a stale ``200`` (and ``remoted.server.tls.ca_matches_leaf`` still reporting a match), while a repaired one kept answering ``503`` until the next tick. The certificates and the verdict now come from the same read, cached under the file's content hash — not its size or timestamp — so a replacement is revalidated in the request that notices it, and the metric never disagrees with what the endpoint just answered.
-  `#39078 <https://github.com/wazuh/wazuh/issues/39078>`__ Fixed ``--embed-ca`` refusing a CA bundle whose signing certificate was not the first one in the file: only the first block was read. Every certificate of the file is now loaded, the signer is looked up among them, and the whole bundle travels in the token.
-  `#31746 <https://github.com/wazuh/wazuh/issues/31746>`__ Fixed Vulnerability Detector version matcher logic for improved detection accuracy.
-  `#33108 <https://github.com/wazuh/wazuh/issues/33108>`__ Fixed Cloudtrail log ingestion parsing errors.
-  `#34082 <https://github.com/wazuh/wazuh/issues/34082>`__ Fixed ``wazuh-manager-db`` error assigning groups by avoiding the keyentries counter as index.
-  `#35043 <https://github.com/wazuh/wazuh/issues/35043>`__ Fixed token validation race condition after revoke.
-  `#35638 <https://github.com/wazuh/wazuh/issues/35638>`__ Handled the stop signal during vulnerability feed download.
-  `#37521 <https://github.com/wazuh/wazuh/issues/37521>`__ Fixed ``GET /cluster/{node_id}/daemons/stats`` always returning error 1014 for ``wazuh-manager-analysisd`` due to a protocol mismatch between ``WazuhSocketJSON`` and the engine's HTTP API socket.
-  `#35909 <https://github.com/wazuh/wazuh/issues/35909>`__ Fixed ``make deps`` branch detection in GitHub Actions.
-  `#38511 <https://github.com/wazuh/wazuh/issues/38511>`__ Fixed world-writable permissions on bundled Python files after DEB installation, caused by the permission restoration script following symlinks.
-  `#38589 <https://github.com/wazuh/wazuh/issues/38589>`__ Fixed the agent disconnection sweep running on cluster workers, and fixed manager log files never rotating daily on a manager that was restarted every day.
-  `#38547 <https://github.com/wazuh/wazuh/issues/38547>`__ Fixed the API serving its OpenAPI specification and exact version at ``/openapi.json`` and ``/openapi.yaml`` without authentication.
-  `#38565 <https://github.com/wazuh/wazuh/issues/38565>`__ Bounded the ``search`` query parameter to 1024 characters across every endpoint that accepts it, fixed the API's ``wazuh-db`` socket client raising an unhandled error instead of a clean ``500`` when ``wazuh-db`` closes the connection on an oversized request, and stopped the API from returning ``wazuh-db``'s raw backend error text (including SQL fragments) to the caller.
-  `#38592 <https://github.com/wazuh/wazuh/issues/38592>`__ Fixed the legacy ``remote_upgrade`` task delivery in ``remoted`` silently losing an agent's upgrade task when the push failed after the Task Manager had already marked it delivered, and fixed the agent's own reported upgrade failures being logged at ``INFO``, where severity-filtered monitoring never saw them, instead of ``WARNING``. ``remoted`` now owns a task's delivery retries end to end once it has read it: a rejection is retried up to 5 times in-memory within the same poll cycle, while a true no-response is deferred to a small in-memory retry list a later poll cycle picks back up, instead of blocking that cycle's sweep of every other agent. A task that exhausts every retry avenue is simply logged and dropped, never reported back to the Task Manager.
-  `#38626 <https://github.com/wazuh/wazuh/issues/38626>`__ Fixed ``POST /agents/insert`` accepting an ``id`` outside the signed 32-bit range the manager stores it in, and ``authd``'s auto-assigned id counter wrapping to a negative id once it reached ``INT_MAX``, both of which produced an agent record that could not be queried or deleted. A caller-supplied ``id`` is now rejected when it is out of range or equal to ``0``, and the id counter refuses to wrap, failing the enrollment instead.
-  `#38695 <https://github.com/wazuh/wazuh/issues/38695>`__ Fixed ``wazuh-manager-apid`` and ``wazuh-manager-clusterd`` killing their own freshly started process during an unclean-stop recovery, when the kernel reused a PID recorded in a stale ``.pid`` file for the new instance. ``clean_pid_files()`` now only terminates a process whose creation time predates the stale file, and never the caller's own PID. Also fixed ``delete_child_pids()`` matching a child's pidfile by PID substring, which let a child with PID 16 remove the pidfile of PID 161.
-  `#38638 <https://github.com/wazuh/wazuh/issues/38638>`__ Fixed ``PUT /groups/{group_id}/configuration`` accepting content with no XML elements at all (plain text or a comment-only body), which replaced a group's ``agent.conf`` without any error. Fixed ``PUT /cluster/{node_id}/configuration`` accepting a manager configuration with no ``<cluster>`` or no ``<indexer>`` section at all, which ``GET /cluster/configuration/validation`` also reported as valid but left ``wazuh-manager-clusterd`` (missing ``cluster.key``, which has no default) or ``wazuh-manager-analysisd`` (zero indexer hosts) unable to start on restart. ``cluster`` and ``indexer`` are now mandatory top-level sections of the schema.
-  `#38749 <https://github.com/wazuh/wazuh/issues/38749>`__ Fixed ``install.sh`` silently repointing the host's ``wazuh-manager``/``wazuh-agent`` service to the directory being installed: an install into an alternative ``USER_DIR`` (a sandbox tree, or a package build root) now leaves an existing service definition that names a different directory untouched and warns, unless ``USER_TAKEOVER_SERVICE="y"`` is set. ``USER_REGISTER_SERVICE="n"`` skips the boot integration altogether.
-  `#38810 <https://github.com/wazuh/wazuh/pull/38810>`__ Fixed ``POST /security/user/authenticate/run_as`` returning a token with the service account's static administrator role when the authorization context was empty. An empty context is now resolved against the authorization rules like any other context instead of falling back to those static roles, so it yields a token with no roles under the default ruleset; a user without ``allow_run_as`` posting an empty context now gets the documented 403/6004 instead of a token; the API access log no longer raises on a body that is not an object, which turned the validator's 400 for a ``null``, numeric or boolean body into an unhandled 500 on every endpoint; and the API specification now declares the ``text/plain`` response this endpoint returns with ``raw=true``.
-  `#38855 <https://github.com/wazuh/wazuh/pull/38855>`__ Fixed the API access log writing secrets to ``api.log`` and ``api.json`` in cleartext. Redaction only ever tested the top-level keys of the request body for ``password``, and for ``key`` only on ``/agents`` paths, so a secret one level down -- including in a body the API rejected with a 400, which is logged all the same -- was written out verbatim. The log now masks a set of sensitive field names (``password``, ``key``, ``token``, ``secret``, ``credentials``, ``authorization`` and their ``<prefix>_<name>`` forms) case-insensitively at any depth of the body and in the query string, and no longer writes the ``run_as`` authorization context at ``info`` level, where the ``hash_auth_context`` already on the line identifies it. The context is also hashed as received again, so the hash in the log matches the one stamped into the issued token.
-  `#38874 <https://github.com/wazuh/wazuh/pull/38874>`__ Fixed the API's request-rate limiter being a single global counter shared by every caller: it is now keyed per client address, with a separate, much smaller allowance for unauthenticated/failed-auth requests so they can no longer exhaust an authenticated caller's budget, and rate-limit exhaustion is now logged at WARNING naming the source address. Also fixed a request to a path or method outside the API's specification being billed to the authenticated allowance regardless of whether it carried any credential, since it never reaches the authentication step at all; it is now billed to the smaller, unauthenticated allowance like a genuine authentication failure. Also fixed an authenticated caller already over its per-minute ceiling still paying the full cost of authentication before being rejected; it is now rejected before authentication runs.
-  `#38862 <https://github.com/wazuh/wazuh/issues/38862>`__ Fixed ``bin/rbac_control change-password`` failing to change the password of every user it targets. ``update_user`` only lets a reserved user modify another reserved user's password and needs to be told who is asking, which the script never did, so each prompted password was reported as ``FAILED`` with error 5011 (``Administrator users can only be modified by themselves``).
-  `#38633 <https://github.com/wazuh/wazuh/issues/38633>`__ Fixed slow delivery of agent-groups assignments on worker nodes when the assignment reaches the worker before the group itself: the worker now retries the rejected assignment instead of waiting for the checksum mismatch limit. The transient rejection is no longer reported as an error while it is being retried, neither by ``wazuh-manager-db`` on the worker nor by the master node's synchronization log, and exhausting every retry is reported as a warning naming the affected agents.
-  `#38713 <https://github.com/wazuh/wazuh/issues/38713>`__ Fixed the vulnerability scanner deleting every finding of an agent's ``rpm`` and ``deb`` packages when a scan ran without the agent's OS major version or code name. The OS release reaches the scanner only in the OS inventory document a sync session carries alongside its packages, and nothing persisted it between sessions: without it the CNA column family was built from an unsubstituted ``$(MAJOR_VERSION)`` template (``alas_``), every package lookup threw, and the failure was indistinguishable from a clean scan -- so the reconciliation, which pre-loads existing findings as deletions, removed findings it had never evaluated. The Debian families failed the same way silently, through a code name comparison that could not succeed. A package the scanner could not evaluate now keeps its findings and is counted as not evaluated in the scan summary, and a first scan that arrives without a usable OS context no longer clears the agent's existing findings before scanning.
-  `#39020 <https://github.com/wazuh/wazuh/issues/39020>`__ Fixed the legacy ``remote_upgrade`` task delivery in ``remoted`` rejecting every task the Task Manager returned as ``invalid payload``, which left every agent older than v5.0.0 without its WPK upgrade. The poller expected the payload as a JSON string while the Task Manager hands it back as the JSON object the producer stored; the poller now reads that object. A task deferred to the poller's retry list after a no-response is now aged from the moment it was deferred, so a task the Task Manager held for a long time still gets its full retry window.
-  `#38938 <https://github.com/wazuh/wazuh/issues/38938>`__ Fixed API validation errors returning the ``jsonschema`` exception text, which embedded the internal schema as a Python dict literal and echoed the submitted value back: a rejected parameter now names itself and the constraint it violated. Bounded ``offset`` at 2147483647, so an out-of-range value is rejected by the specification instead of by ``wazuh-manager-db``, and a request for a cluster node the cluster does not have now answers 404 instead of 200 with the node reported as a failed item.
-  `#39113 <https://github.com/wazuh/wazuh/issues/39113>`__ Fixed ``get_indexer_client()`` raising ``AttributeError: 'str' object has no attribute 'get'`` when reading ``indexer.ssl.certificate_authorities``, ``certificate``, and ``key`` from the manager configuration, which kept the indexer task manager from ever starting ``disconnected_agent_sync``, ``active_response_task``, and ``metrics_snapshot`` on a manager with a correctly configured indexer. The reader still expected the shape the old pseudo-XML parser produced; it now matches the shape the schema-validated configuration loader returns. Also fixed the same function requiring ``certificate``, ``key``, and ``certificate_authorities`` to be present, when the configuration schema documents all three as optional (client certificate and CA pinning are opt-in; the indexer connection otherwise falls back to basic auth over the system trust store) and the manager's own C++ indexer connector already treats them that way. Also fixed the SSL context only trusting the first entry of ``certificate_authorities``, silently ignoring the rest; the C++ indexer connector already merges every configured CA into the trust store, which the Python client now does too, so a CA rotation with both the old and new CA listed no longer breaks the connection as soon as the indexer presents a certificate signed by the second one. Also fixed a bad certificate/key/CA path escaping as a raw ``FileNotFoundError`` instead of an ``IndexerUnavailableError`` naming the SSL context as the failure point. Also fixed a blank entry in ``certificate_authorities`` being silently dropped instead of rejected, which could mask a misconfigured CA behind an apparently working connection using the remaining entries.
-  `#39114 <https://github.com/wazuh/wazuh/issues/39114>`__ Fixed ``wazuh-manager-control`` failing to reclaim ``start-script-lock`` when it was left behind without its pid file, which happens when the owning process dies between creating the lock directory and recording its pid in it. ``start`` and ``status`` failed indefinitely with ``Another instance is locking this process`` until the directory was removed by hand; a lock left with no pid file is now treated as stale and reclaimed, the same as one whose recorded pid no longer exists. Also fixed ``wazuh-manager-control status`` reporting ``wazuh-manager-authd`` as not running, and exiting non-zero, on a manager with ``auth.disabled`` set to ``true``, where ``start`` deliberately does not launch it; container healthchecks built on ``status`` restart-looped such a manager.

Wazuh agent
^^^^^^^^^^^

-  `#29668 <https://github.com/wazuh/wazuh/issues/29668>`__ Fixed FIM checksum calculation that was incorrectly ignoring some file fields.
-  `#30513 <https://github.com/wazuh/wazuh/issues/30513>`__ Fixed syscollector reporting duplicate and bogus packages on macOS arm64.
-  `#32915 <https://github.com/wazuh/wazuh/issues/32915>`__ Fixed ``agent_control`` not displaying agent status information.
-  `#35071 <https://github.com/wazuh/wazuh/issues/35071>`__ Fixed SCA handling of invalid operators and missing values in regex patterns.
-  `#35156 <https://github.com/wazuh/wazuh/issues/35156>`__ Fixed agent modules initializing before agent metadata was fully ready.
-  `#35162 <https://github.com/wazuh/wazuh/issues/35162>`__ Fixed FIM inventory reporting file modification time as 1970-01-01.
-  `#35169 <https://github.com/wazuh/wazuh/issues/35169>`__ Fixed agent automatic reload failing after receiving centralized configuration.
-  `#35248 <https://github.com/wazuh/wazuh/issues/35248>`__ Fixed syscollector false positive package detection on macOS.
-  `#35329 <https://github.com/wazuh/wazuh/issues/35329>`__ Fixed agent uninstall on Windows after a WPK upgrade.
-  `#35474 <https://github.com/wazuh/wazuh/issues/35474>`__ Fixed agent 5.x sending a trailing null byte in messages.
-  `#35636 <https://github.com/wazuh/wazuh/issues/35636>`__ Fixed WUA hotfix collection regression in Windows agent v5.0.0.
-  `#35955 <https://github.com/wazuh/wazuh/issues/35955>`__ Fixed wodle command argument construction for Windows paths.
-  `#35960 <https://github.com/wazuh/wazuh/issues/35960>`__ Prevented Windows agent restart abort when the service is already stopping.
-  `#35978 <https://github.com/wazuh/wazuh/issues/35978>`__ Fixed timeout message displayed after a 4.13-to-5.0 upgrade on Windows.
-  `#35979 <https://github.com/wazuh/wazuh/issues/35979>`__ Fixed agent disconnection on direct 4.13-to-5.0 custom WPK upgrade.
-  `#35988 <https://github.com/wazuh/wazuh/issues/35988>`__ Excluded ``/bin`` and ``/sbin`` from FIM monitored directories on usrmerge distributions.
-  `#36002 <https://github.com/wazuh/wazuh/issues/36002>`__ Expanded Windows environment variables in SCA rule inputs.
-  `#36061 <https://github.com/wazuh/wazuh/issues/36061>`__ Made ``sync_end_delay`` interruptible to remove stale ``modulesd.pid`` after agent stop.
-  `#36092 <https://github.com/wazuh/wazuh/issues/36092>`__ Honored the shutdown signal in ``agent-upgrade`` ``StartMQ`` to avoid timeout warning on agent stop.
-  `#36126 <https://github.com/wazuh/wazuh/issues/36126>`__ Adjusted DockerListener messages as log entries to fix event categorization.
-  `#36134 <https://github.com/wazuh/wazuh/issues/36134>`__ Dropped orphan paths before promoting on agent startup to fix FIM.
-  `#38825 <https://github.com/wazuh/wazuh/issues/38825>`__ Fixed the agent stopping every timer-driven message for the duration of a backward system-clock jump.
-  `#37653 <https://github.com/wazuh/wazuh/issues/37653>`__ Lowered the ``wazuh-agentd`` connection socket error log to debug level to avoid duplicating the "Lost connection with manager" error on transient disconnections.
-  `#37626 <https://github.com/wazuh/wazuh/issues/37626>`__ Fixed a race condition when saving the Logcollector file status on shutdown.
-  `#37656 <https://github.com/wazuh/wazuh/issues/37656>`__ Fixed an unbounded memory leak in ``wazuh-modulesd`` caused by a missing RPM macro context cleanup on every package scan cycle.
-  `#37543 <https://github.com/wazuh/wazuh/issues/37543>`__ Fixed agent-info module caching ``cluster_name``, ``cluster_node``, and ``agent_groups`` from a one-time handshake at startup, causing stale values in ``agent_metadata`` until the agent process restarted.
-  `#37993 <https://github.com/wazuh/wazuh/issues/37993>`__ Fixed ``wazuh-syscheckd`` failing the ``file_entry.checksum`` NOT NULL constraint when the deferred sync-flag update ran for an entry deleted during the scan.
-  `#37993 <https://github.com/wazuh/wazuh/issues/37993>`__ Fixed ``wazuh-syscheckd`` failure on shutdown, which logged "Invalid handle value", crashed the process, and left a stale PID file.
-  `#38163 <https://github.com/wazuh/wazuh/issues/38163>`__ Fixed ``wazuh-agentd`` crashing on start when the agent metadata segment could only be opened read-only, which happens whenever a root process creates it before the daemon drops privileges.
-  `#38065 <https://github.com/wazuh/wazuh/issues/38065>`__ Fixed SCA and Syscollector sync threads not blocking ``SIGTERM``, which could cause the shutdown handler to run on a module thread instead of the main thread and time out joining it.
-  `#38212 <https://github.com/wazuh/wazuh/issues/38212>`__ Fixed the Windows agent leaving the FIM synchronization database open when the service stopped, which left the ``queue\`` directory behind after an uninstall without purge.
-  `#38646 <https://github.com/wazuh/wazuh/pull/38646>`__ Fixed SCA HIPAA compliance mappings across policy checks.
-  `#38736 <https://github.com/wazuh/wazuh/pull/38736>`__ Fixed two CIS Amazon Linux 2023 SCA checks (``gpgcheck``, ``vsftpd``) reporting false-positives on compliant systems.
-  `#38600 <https://github.com/wazuh/wazuh/issues/38600>`__ Removed the default ``netstat`` and ``last`` command monitoring entries, which depend on binaries not present on every supported platform (e.g. minimal container images), causing repeated failed executions every ``frequency`` cycle.
-  `#39279 <https://github.com/wazuh/wazuh/issues/39279>`__ Removed the default ``df -P`` command monitoring entry, which reported disk usage/capacity with no security relevance every ``frequency`` cycle. Also removed the stale ``df -P``, ``netstat``, and ``last`` entries from ``etc/ossec-agent.conf``, the fallback configuration installed by ``install.sh`` when template generation fails on a source install.
-  `#38829 <https://github.com/wazuh/wazuh/issues/38829>`__ Fixed Coverity findings across agent components (``syscheckd``, ``sca``, ``agent-info``, ``https_client``, ``agent-upgrade``, and ``shared``).
-  `#38766 <https://github.com/wazuh/wazuh/issues/38766>`__ Fixed ``wazuh-agentd`` crashing with ``SIGSEGV`` on every service stop, which also cut the shutdown drain short before the ``/control`` shutdown notification was sent.
-  `#38850 <https://github.com/wazuh/wazuh/issues/38850>`__ Fixed missing ``<manager>`` block on Debian 10 unattended DEB installs.
-  `#38975 <https://github.com/wazuh/wazuh/pull/38975>`__ Fixed SCA PCI-DSS compliance mappings, updated from v3.2.1 to v4.0 numbering.
-  `#38840 <https://github.com/wazuh/wazuh/issues/38840>`__ Fixed the agent's reported ``/config`` snapshot staying stale for up to an hour after a group's shared configuration (e.g. ``agent.conf``) changed; the manager now sees the update as soon as the agent's reload actually completes, instead of waiting out the periodic report's regular cadence.
-  `#38928 <https://github.com/wazuh/wazuh/issues/38928>`__ Fixed the CIS Amazon Linux 2023 SCA policy: check 31170 was named for the GID 0 default group control it does not test (its rule actually tests the root password), and check 31172 was a byte-identical duplicate of 31171, both testing ``/etc/passwd`` permissions and inflating compliance scores.
-  `#38914 <https://github.com/wazuh/wazuh/issues/38914>`__ Fixed the default agent nodiff list not protecting ``/etc/shadow`` and real key paths.
-  `#39309 <https://github.com/wazuh/wazuh/issues/39309>`__ Fixed SCA HIPAA compliance values using parenthesized notation, which the dashboard's Regulatory Compliance catalogue doesn't recognize; converted to the dotted notation the catalogue expects.
-  `#39514 <https://github.com/wazuh/wazuh/pull/39514>`__ Fixed SCA ISO 27001 compliance mappings, remapped from the superseded 2013 numbering to 2022 Annex A.
-  `#39192 <https://github.com/wazuh/wazuh/issues/39192>`__ Fixed the ``block-ip`` active response not blocking IPs on a default macOS install.
-  `#39667 <https://github.com/wazuh/wazuh/issues/39667>`__ Fixed ``azure-logs`` logging a collection whose Python script failed as finished: a non-zero exit code is now reported as a warning, the script output that is not in its log format (e.g. a Python traceback) is logged as an error, also after a timeout, and the request, container and domain are logged as failed instead of finished. A script that cannot be executed, e.g. because ``python3`` is missing, is now reported and no longer stops the module.

Wazuh indexer
^^^^^^^^^^^^^

-  `#1189 <https://github.com/wazuh/wazuh-indexer/issues/1189>`__ Fix unescaped commands in ``indexer-security-init.sh``.
-  `#1573 <https://github.com/wazuh/wazuh-indexer/issues/1573>`__ Fix Java warnings caused by restricted-native access and ``sun.misc.Unsafe`` deprecation.
-  `#1918 <https://github.com/wazuh/wazuh-indexer/issues/1918>`__ `#1687 <https://github.com/wazuh/wazuh-indexer/issues/1687>`__ Fix systemd and sysv symlinks and runtime files left behind after uninstalling Wazuh Indexer.
-  `#1227 <https://github.com/wazuh/wazuh-indexer/issues/1227>`__ Fix ``indexer-security-init.sh`` connecting to the transport port instead of the HTTP port.
-  `#1532 <https://github.com/wazuh/wazuh-indexer/issues/1532>`__ Fix the ownership and permissions of ``/etc/default/wazuh-indexer`` in DEB packages.
-  `#913 <https://github.com/wazuh/wazuh-indexer/issues/913>`__ Fix packaging test failures on Debian packages by adding ``DEBIAN_FRONTEND=noninteractive`` to the installation command.
-  `#844 <https://github.com/wazuh/wazuh-indexer/issues/844>`__ Fix packages upload.
-  `#1110 <https://github.com/wazuh/wazuh-indexer/issues/1110>`__ Fix deprecation warning on the email checker GH Action.
-  `#867 <https://github.com/wazuh/wazuh-indexer-plugins/issues/867>`__ Fix ``linkchecker`` failures.
-  `#1205 <https://github.com/wazuh/wazuh-indexer/issues/1205>`__ Fix repository bumper building broken links.


Plugins
~~~~~~~

-  `#1577 <https://github.com/wazuh/wazuh-indexer/issues/1577>`__ Fix SLF4J warnings during startup.
-  `#1810 <https://github.com/wazuh/wazuh-indexer/issues/1810>`__ Fix setup status marked as ready after an initialization failure.
-  `#1225 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1225>`__ `#1279 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1279>`__ `#1533 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1533>`__ Fix ISM policies not being applied to data streams and their rolled-over indices.
-  `#1828 <https://github.com/wazuh/wazuh-indexer/issues/1828>`__ Fix ``Failed to save/update ManagedIndexMetaData`` errors.
-  `#1800 <https://github.com/wazuh/wazuh-indexer/issues/1800>`__ Fix findings dashboards failing with "too many ``docvalue_fields``".
-  `#1178 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1178>`__ Fix missing fields in active response indices.
-  `#607 <https://github.com/wazuh/wazuh-indexer-plugins/issues/607>`__ Fix dangling nested fields under the ``gen_ai`` object.
-  `#672 <https://github.com/wazuh/wazuh-indexer-plugins/issues/672>`__ Fix ``dns.answers`` field type mismatch in the GCP cloud services template.
-  `#1498 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1498>`__ Fix ``privacy_default_per_provider`` rejecting new provider overrides.
-  `#1536 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1536>`__ Fix ``index.query.default_field`` listing fields that don't exist or can't match text.
-  `#1140 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1140>`__ `#1362 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1362>`__ `#1476 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1476>`__ Fix missing threat-intel content indices.
-  `#909 <https://github.com/wazuh/wazuh-indexer-plugins/issues/909>`__ Fix race condition creating the CTI consumers index.
-  `#1251 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1251>`__ Fix content initialization race condition with the setup plugin.
-  `#1418 <https://github.com/wazuh/wazuh-indexer/issues/1418>`__ Fix the Wazuh Indexer service randomly failing after a restart.
-  `#1331 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1331>`__ Fix failures due to blocking operations in multi-node clusters.
-  `#1329 <https://github.com/wazuh/wazuh-indexer/issues/1329>`__ Fix duplicated policies on multi-node clusters.
-  `#971 <https://github.com/wazuh/wazuh-indexer-plugins/issues/971>`__ `#1141 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1141>`__ `#1412 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1412>`__ `#1773 <https://github.com/wazuh/wazuh-indexer/issues/1773>`__ `#1809 <https://github.com/wazuh/wazuh-indexer/issues/1809>`__ Fix the ``standard`` space hash being missing, stale or undefined after updates and restarts.
-  `#1564 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1564>`__ Fix ``update_on_schedule`` and ``sync_interval`` being ignored after the first boot.
-  `#1601 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1601>`__ Fix duplicate query indices created by concurrent catalog syncs.
-  `#914 <https://github.com/wazuh/wazuh-indexer-plugins/issues/914>`__ `#997 <https://github.com/wazuh/wazuh-indexer-plugins/issues/997>`__ Fix IoC and CVE feed updates failing.
-  `#1308 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1308>`__ Fix the CTI vulnerabilities consumer never initializing with large snapshots.
-  `#1383 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1383>`__ Fix empty Vulnerability Detection after a transient snapshot failure.
-  `#1180 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1180>`__ Fix unregistered deployments using the ``-b`` content indices.
-  `#1342 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1342>`__ Fix consumers local offset left behind after a plan change.
-  `#1199 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1199>`__ Fix blank ``to_offset`` parameter fetching consumer changes.
-  `#1807 <https://github.com/wazuh/wazuh-indexer/issues/1807>`__ `#1819 <https://github.com/wazuh/wazuh-indexer/issues/1819>`__ `#1830 <https://github.com/wazuh/wazuh-indexer/issues/1830>`__ Fix CTI consumers failing on HTTP 429 responses.
-  `#1851 <https://github.com/wazuh/wazuh-indexer/issues/1851>`__ `#1900 <https://github.com/wazuh/wazuh-indexer/issues/1900>`__ `#1913 <https://github.com/wazuh/wazuh-indexer/issues/1913>`__ Fix CTI consumer syncs aborting on rejected bulk requests.
-  `#1763 <https://github.com/wazuh/wazuh-indexer/issues/1763>`__ Fix file descriptor leak in the catalog sync.
-  `#1872 <https://github.com/wazuh/wazuh-indexer/issues/1872>`__ Fix point-in-time contexts not being released.
-  `#1881 <https://github.com/wazuh/wazuh-indexer/issues/1881>`__ Fix repeated policy retrieval errors while shards initialize at startup.
-  Fix CTI requests not validating TLS certificates.
-  Fix CTI registration starting before the caller's permissions are checked.
-  `#973 <https://github.com/wazuh/wazuh-indexer-plugins/issues/973>`__ Fix resources not being removed from Security Analytics.
-  `#1256 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1256>`__ Fix content being sent to Security Analytics after a failed content update.
-  `#1487 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1487>`__ `#1914 <https://github.com/wazuh/wazuh-indexer/issues/1914>`__ Fix failed Security Analytics syncs not being retried.
-  `#945 <https://github.com/wazuh/wazuh-indexer-plugins/issues/945>`__ Fix failures creating threat detectors.
-  `#1283 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1283>`__ Fix duplicated threat detectors after a subscription change.
-  `#82 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/82>`__ Fix missing findings.
-  `#109 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/109>`__ Fix error logs and catalog sync failures at startup.
-  `#87 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/87>`__ Fix integration updates failing with a "Log Type cannot be updated" error.
-  `#1166 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1166>`__ Fix ``space.hash`` field present in every resource type.
-  `#1173 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1173>`__ Fix policy metadata duplicated at root level on updates.
-  `#1158 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1158>`__ `#1186 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1186>`__ `#1332 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1332>`__ Fix root decoder handling on user spaces, policy updates and space resets.
-  `#874 <https://github.com/wazuh/wazuh-indexer-plugins/issues/874>`__ Fix missing ``description`` field error when editing integrations or policies.
-  `#1061 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1061>`__ Fix filter creation rejecting objects in the ``check`` property.
-  `#835 <https://github.com/wazuh/wazuh-indexer-plugins/issues/835>`__ Fix resources being removed from their integration in every space.
-  `#1373 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1373>`__ Fix promotion changes on fresh installations.
-  `#1945 <https://github.com/wazuh/wazuh-indexer/issues/1945>`__ Fix promotions failing with ``too_many_clauses``.
-  `#1394 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1394>`__ Fix ``enabled`` flag not evaluated on various resource-related operations.
-  `#1403 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1403>`__ Fix user's enabled state lost on CTI updates.
-  `#1410 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1410>`__ Fix logtest not using manually enabled integrations.
-  `#321 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/321>`__ Fix logtest reporting ``contains`` matches that never fire in the ingestion pipeline.
-  `#872 <https://github.com/wazuh/wazuh-indexer-plugins/issues/872>`__ Fix logtest response not being a valid JSON object.
-  `#1520 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1520>`__ Fix resource creation requiring ``indices:admin/create`` on ``.wazuh-content-manager-resource-locks``.
-  `#1314 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1314>`__ Fix invalid transport action name prefixes in the Content Manager plugin.
-  `#1229 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1229>`__ Fix plugins not handling security permission exceptions.
-  `#1388 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1388>`__ Fix status codes and response messages of the Content Manager endpoints.
-  `#913 <https://github.com/wazuh/wazuh-indexer-plugins/issues/913>`__ Fix KV Store startup failure in the Splunk integration.
-  `#470 <https://github.com/wazuh/wazuh-indexer-plugins/issues/470>`__ Fix WCS CSV documentation listing removed fields.
-  `#537 <https://github.com/wazuh/wazuh-indexer-plugins/issues/537>`__ Fix JDK version in the developer guide.
-  `#1327 <https://github.com/wazuh/wazuh-indexer/issues/1327>`__ Fix certificate deployment steps in the installation guide.
-  `#824 <https://github.com/wazuh/wazuh-indexer-plugins/issues/824>`__ Fix uninstall documentation to remove leftover folders with ``--purge``.
-  `#1470 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1470>`__ `#1479 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1479>`__ Fix development environment setup and build image instructions.
-  `#1353 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1353>`__ `#1539 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1539>`__ Fix the Content Manager OpenAPI specification and API reference examples.
-  `#1609 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1609>`__ `#1610 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1610>`__ `#1611 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1611>`__ `#1612 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1612>`__ `#1613 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1613>`__ `#1614 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1614>`__ `#1615 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1615>`__ `#1617 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1617>`__ `#1618 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1618>`__ `#1619 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1619>`__ `#1620 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1620>`__ `#1621 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1621>`__ `#1622 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1622>`__ `#1623 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1623>`__ `#1624 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1624>`__ `#1625 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1625>`__ `#1626 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1626>`__ `#1627 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1627>`__ `#1628 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1628>`__ `#1629 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1629>`__ `#1630 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1630>`__ Fix documentation drift found by the 5.0.0 documentation review.
-  `#503 <https://github.com/wazuh/wazuh-indexer-plugins/issues/503>`__ Fix failing WCS event generators.
-  `#614 <https://github.com/wazuh/wazuh-indexer-plugins/issues/614>`__ Fix WCS generator not detecting some modules.
-  `#639 <https://github.com/wazuh/wazuh-indexer-plugins/issues/639>`__ Fix ``verify_integrations`` script.
-  `#698 <https://github.com/wazuh/wazuh-indexer-plugins/issues/698>`__ Fix ``mdbook`` Mermaid processor.
-  `#877 <https://github.com/wazuh/wazuh-indexer-plugins/issues/877>`__ Fix flaky integration tests in the setup plugin.
-  `#867 <https://github.com/wazuh/wazuh-indexer-plugins/issues/867>`__ Fix ``linkchecker`` failures.
-  `#1004 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1004>`__ `#1497 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1497>`__ Fix CodeQL failures.
-  `#1019 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1019>`__ `#1524 <https://github.com/wazuh/wazuh-indexer/issues/1524>`__ Fix package build failures at the plugins stage.
-  `#1443 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1443>`__ Fix failing GH workflows.


Security analytics
~~~~~~~~~~~~~~~~~~

-  `#127 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/127>`__ `#285 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/285>`__ `#1529 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1529>`__ Fix Sigma rules never matching values that contain spaces.
-  `#1518 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1518>`__ `#1527 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1527>`__ Fix rules with a negated filter never firing on events that lack the filtered field.
-  `#335 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/335>`__ Fix Sigma ``|re`` anchors and ``|gt``/``|gte``/``|lt``/``|lte`` modifiers never matching.
-  `#182 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/182>`__ Fix Sigma conditions not recognizing uppercase ``AND``, ``OR`` and ``NOT``.
-  `#82 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/82>`__ `#148 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/148>`__ Fix findings skipping correlation while the correlation indices are being created.
-  `#1914 <https://github.com/wazuh/wazuh-indexer/issues/1914>`__ Fix detectors being lost when several are created at the same time.
-  `#1730 <https://github.com/wazuh/wazuh-indexer/issues/1730>`__ Fix errors logged by correlation and detector deletion right after startup.
-  `#282 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/282>`__ Fix duplicated log type initialization errors at node startup.
-  `#1583 <https://github.com/wazuh/wazuh-indexer/issues/1583>`__ Fix ANTLR version mismatch warnings logged at startup.
-  `#313 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/313>`__ Fix Sigma rule conversion errors and invalid CIDR prefixes not being reported.
-  `#1194 <https://github.com/wazuh/wazuh-indexer/issues/1194>`__ Fix the package generation workflow ignoring the requested revision.
-  `#1430 <https://github.com/wazuh/wazuh-indexer/issues/1430>`__ Fix package generation failing in the alerting publication stage.
-  `#867 <https://github.com/wazuh/wazuh-indexer-plugins/issues/867>`__ Fix ``linkchecker`` workflow failures.
-  `#1765 <https://github.com/wazuh/wazuh-indexer/issues/1765>`__ Fix the repository bumper ``tag`` input defaulting to ``true``.


Notifications
~~~~~~~~~~~~~

-  `#99 <https://github.com/wazuh/wazuh-indexer-notifications/issues/99>`__ Fix the default notification channels being recreated on every startup.
-  `#136 <https://github.com/wazuh/wazuh-indexer-notifications/issues/136>`__ Fix version conflict errors when several nodes create the default notification channels at once.
-  `#183 <https://github.com/wazuh/wazuh-indexer-notifications/issues/183>`__ Fix active responses reported as delivered when the event has no target agent.
-  `#194 <https://github.com/wazuh/wazuh-indexer-notifications/issues/194>`__ Fix the notification configuration limit being exceeded by concurrent requests.
-  `#175 <https://github.com/wazuh/wazuh-indexer-notifications/pull/175>`__ Fix the CodeQL workflow settings.


Alerting
~~~~~~~~

-  `#1876 <https://github.com/wazuh/wazuh-indexer/issues/1876>`__ Fix doc-level monitors skipping documents when search backpressure cancels their percolate search.
-  `#1518 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1518>`__ Fix rules over a field the source index does not map being silently dropped.
-  `#168 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/168>`__ Fix one failing finding dropping the rest of its batch before it reaches Security Analytics.
-  `#1746 <https://github.com/wazuh/wazuh-indexer/issues/1746>`__ Fix a memory leak in doc-level monitors that exhausted the Java heap.
-  `#1730 <https://github.com/wazuh/wazuh-indexer/issues/1730>`__ `#1731 <https://github.com/wazuh/wazuh-indexer/issues/1731>`__ Fix errors from unresolved query index aliases and lock acquisition races during monitor runs.
-  `#1770 <https://github.com/wazuh/wazuh-indexer/issues/1770>`__ `#1867 <https://github.com/wazuh/wazuh-indexer/issues/1867>`__ Fix node restarts being logged as errors and workflow alert failures being logged twice.
-  `#1577 <https://github.com/wazuh/wazuh-indexer/issues/1577>`__ Fix SLF4J "no provider" warnings at startup.
-  `#1430 <https://github.com/wazuh/wazuh-indexer/issues/1430>`__ Fix package generation failing when a revision other than ``0`` is requested.
-  `#1765 <https://github.com/wazuh/wazuh-indexer/issues/1765>`__ Fix the repository bumper ``tag`` input defaulting to ``true``.


Reporting
~~~~~~~~~

-  `#74 <https://github.com/wazuh/wazuh-indexer-reporting/issues/74>`__ `#141 <https://github.com/wazuh/wazuh-indexer-reporting/issues/141>`__ Fix the CodeQL workflow.
-  `#75 <https://github.com/wazuh/wazuh-indexer-reporting/issues/75>`__ `#867 <https://github.com/wazuh/wazuh-indexer-plugins/issues/867>`__ Fix the link checker workflow.
-  `#70 <https://github.com/wazuh/wazuh-indexer-reporting/issues/70>`__ Fix the commit email checker workflow.


Common utils
~~~~~~~~~~~~

-  `#1867 <https://github.com/wazuh/wazuh-indexer/issues/1867>`__ Fix ``AlertingException.wrap()`` logging the same failure once per call-stack layer and resetting its status to 500.
-  `#23 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/23>`__ Fix the repository bumper merge step running with an empty pull request URL.
-  `#1765 <https://github.com/wazuh/wazuh-indexer/issues/1765>`__ Fix the repository bumper ``tag`` input defaulting to ``true``.


Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#1277 <https://github.com/wazuh/wazuh-dashboard/issues/1277>`__ Fixed health check padding styles.
-  `#1399 <https://github.com/wazuh/wazuh-dashboard/issues/1399>`__ Prevented an infinite remount loop when navigating from an app before its bundle finishes loading.
-  `#1569 <https://github.com/wazuh/wazuh-dashboard/issues/1569>`__ Fixed the error toast full error modal to show the root cause of the failure instead of an unrelated backend exception.
-  `#1568 <https://github.com/wazuh/wazuh-dashboard/issues/1568>`__ Fixed the empty error message in the dashboard save failure toast.
-  `#1619 <https://github.com/wazuh/wazuh-dashboard/issues/1619>`__ Fixed the dashboard keystore being created readable by every user.
-  `#9257 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9257>`__ Fixed the RPM package removal leaving the kept configuration files owned by the removed ``wazuh-dashboard`` user.
-  `#1638 <https://github.com/wazuh/wazuh-dashboard/issues/1638>`__ Fixed the not ready page claiming success before the health checks ran, and the indexer error log losing the cause.

Plugins
~~~~~~~

-  `#1520 <https://github.com/wazuh/wazuh-dashboard/issues/1520>`__ Added the missing ``Secure`` flag to the ``wz-api`` cookie, and added the ``X-Content-Type-Options`` and ``Strict-Transport-Security`` response headers.
-  `#7922 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7922>`__ Fixed a hardcoded version value in the **Deploy agent** wizard.
-  `#1052 <https://github.com/wazuh/wazuh-dashboard/issues/1052>`__ Fixed styling issues for v9 theme.
-  `#8094 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8094>`__ Fixed a visual bug in SCA score decimal precision on the Agent Overview.
-  `#8149 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8149>`__ Fixed the agent stats view was innaccesible for some version combinations.
-  `#8191 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8191>`__ Fixed the button tooltip showing administrator role requirement where it wasn't needed.
-  `#1164 <https://github.com/wazuh/wazuh-dashboard/issues/1164>`__ Fixed a message in the group selector of the deploy new agent guide related to missing permissions when there was no groups available or they could not be obtained.
-  `#8033 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8033>`__ Fixed the under evaluation filter was removed on filter addition in Vulnerability Detection.
-  `#8266 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8266>`__ Fixed home KPIs not being vertically centered.
-  `#8309 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8309>`__ Fixed MITRE ATT&CK Findings data grid not spanning the full available width.
-  `#8470 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8470>`__ Fixed MITRE ATT&CK overview and pinned-agent dashboard visualization titles and layout.
-  `#8387 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8387>`__ Fixed pinned agent being lost when opening module links (FIM, SCA, Vulnerability Detection, MITRE ATT&CK, agent menu) in a new tab from the agent overview.
-  `#8471 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8471>`__ Fixed File Integrity Monitoring files inventory table layout by using smaller default widths for ``file.owner``, ``file.uid``, and ``file.size``, allowing ``file.path`` to use more horizontal space.
-  `#8325 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8325>`__ Fixed long labels in IT Hygiene horizontal bar visualizations causing display issues.
-  `#8515 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8515>`__ Fixed rendering of the Tactics and Techniques cells in the MITRE ATT&CK flyout.
-  `#133 <https://github.com/wazuh/wazuh-dashboard-reporting/issues/133>`__ Fixed custom filter buttons not being rendered in PDF reports.
-  `#8575 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8575>`__ Fixed MITRE technique fields being truncated in the Document Details flyout by showing the full list of clickable items.
-  `#8607 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8607>`__ Fixed FIM visualizations height.
-  `#8652 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8652>`__ Fixed the GitHub link in the About page pointing to the legacy ``wazuh-kibana-app`` repository.
-  `#8694 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8694>`__ Fixed SCA module columns width.
-  `#8705 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8705>`__ Fixed the Home KPI's visualization persistent filters.
-  `#8766 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8766>`__ Fixed Server Management Settings crashing or showing a blank page for users without permission to read the manager configuration.
-  `#8775 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8775>`__ Fixed the MITRE ATT&CK Framework tab not applying the date range and fetch filters.
-  `#9015 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9015>`__ Fixed the Controls tab showing 0 results by adding missing regulatory compliance requirement definitions for PCI DSS, GDPR, HIPAA, NIST 800-53, FedRAMP, ISO 27001, CMMC, TSC, and NIS2, and added an "Others" breakdown showing findings tagged with unrecognized requirement values.
-  `#9023 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9023>`__ Fixed sorting not working in the Server management > Security tables (Roles, Policies, Users, and Roles mapping), and removed the sort affordance from columns the server API cannot sort.
-  `#9037 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9037>`__ Fixed the Findings data grid crashing and losing every column when a configured column's field does not exist in the index pattern.
-  `#9048 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9048>`__ Fixed the Server API proxy reporting rejected requests as server errors: ``POST /api/request`` now answers with the status the Server API returned instead of turning every 400 or 404 into a 500.
-  `#9114 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9114>`__ Fixed Settings, Management, and the Dev Tools app rendering a blank page when navigated to with a missing or unrecognized ``tab`` query parameter.
-  `#9116 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9116>`__ Fixed the API console's request and RBAC action catalogues drifting from the Server API.
-  `#9108 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9108>`__ Fixed the PCI DSS compliance requirement descriptions being a stale mix of v3.2.1 and v4.0 wording by rewriting the whole dictionary against PCI DSS v4.0, adding the requirement codes the detection rules report, and dropping the ones v4.0 retired.
-  `#9112 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9112>`__ Fixed the IT Hygiene System > Hardware dashboard showing the Overview dashboard memory panel instead of its own.
-  `#9130 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9130>`__ Fixed the agent Configuration view caching the reported configuration for the whole visit with no way to refresh it; added a Refresh control in agent context.
-  `#1586 <https://github.com/wazuh/wazuh-dashboard/issues/1586>`__ Fixed the ``saved-objects:index-patterns`` health check reporting a ``TypeError`` instead of the error that prevented the ``wazuh-events-v5*`` index pattern initialization, caused by passing the internal saved objects repository where a saved objects client was expected.
-  `#9167 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9167>`__ Fixed Vulnerability Detection > Inventory warning that the module was not enabled, and the deploy agent wizard omitting the registration password, when the server reports these settings as native booleans.
-  `#9174 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9174>`__ Fixed the modules with sub tabs rendering an empty view when moving between two tabs that have sub tabs, for example IT Hygiene System > Software, by selecting the first sub tab whenever the ``tabSubView`` query parameter does not match any of the current sub tabs.
-  `#9135 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9135>`__ Fixed ``match_only_text`` fields (e.g. ``file.diff``) being generated as aggregatable and doc-values-backed in known-fields/index-pattern definitions, which don't support either; and stopped offering a sort control on non-aggregatable columns across Discover-style tables, which OpenSearch rejects.
-  `#9177 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9177>`__ Fixed the agent Summary page crashing when pinning Incident Response, and made the pinned application shortcuts honor the agent operating system support.
-  `#9184 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9184>`__ Fixed multiple React console warnings across ``plugins/main``: deprecated ``ReactDOM.render``/``defaultProps`` usage, ``EuiBasicTable``/``EuiButtonGroup`` prop-type mismatches, invalid HTML nesting, missing ``key`` props, ``useDataGrid`` prop leakage onto ``EuiDataGrid``, and a ``NaN`` row count on Discover.
-  `#9230 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9230>`__ Fixed the group **Manage agents** Pending changes hint telling users to click a row, which does not stage it; it now points to the row checkbox, and the apply button reads "Apply 1 change" for a single change.
-  `#9231 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9231>`__ Fixed the agent Configuration > Commands "Command status" field showing the raw ``disabled`` value instead of enabled/disabled.
-  `#9234 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9234>`__ Fixed the group agents table **Go to the agent** action opening an empty page instead of the agent view.
-  `#9235 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9235>`__ Fixed the agent name missing from the breadcrumb in the agent view, its Stats and its Configuration, which left no breadcrumb link to return to the agent.
-  `#9238 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9238>`__ Fixed the group **Manage agents** Pending changes header reading "nothing written yet" after the changes were applied; it now shows no summary when nothing is staged.
-  `#9250 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9250>`__ Fixed the filter badges in the search bar displaying in bold instead of normal font weight.
-  `#9244 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9244>`__ Fixed AI Assistant conversations not being saved for users without write access to the sessions index, and a denied chat request now reports the missing permission instead of a generic error.
-  `#9282 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9282>`__ Fixed screen readers announcing "[object Object]" instead of the value for each stat of the agent details ribbon.
-  `#9284 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9284>`__ Fixed every Wazuh view waiting on extra Server API calls before loading data: ``POST /api/check-stored-api`` reuses the cached login and fetches the cluster info once, and the security platform is requested once.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer <https://github.com/wazuh/wazuh-indexer/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer-plugins <https://github.com/wazuh/wazuh-indexer-plugins/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer-security-analytics <https://github.com/wazuh/wazuh-indexer-security-analytics/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer-notifications <https://github.com/wazuh/wazuh-indexer-notifications/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer-alerting <https://github.com/wazuh/wazuh-indexer-alerting/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer-reporting <https://github.com/wazuh/wazuh-indexer-reporting/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer-common-utils <https://github.com/wazuh/wazuh-indexer-common-utils/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-dashboard/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v5.0.0/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v5.0.0/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v5.0.0/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v5.0.0/CHANGELOG.md>`__
