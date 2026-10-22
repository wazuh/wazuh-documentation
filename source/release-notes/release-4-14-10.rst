.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.14.10 has been released. Check out our release notes to discover the changes and additions of this release.

4.14.10 Release notes - TBD
===========================

This section lists the changes in version 4.14.10. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#39607 <https://github.com/wazuh/wazuh/issues/39607>`__ Added a warning to the log when a queue of the indexer connector or of the vulnerability scanner holds 100000 elements or more, and each time its size doubles.
-  `#39799 <https://github.com/wazuh/wazuh/pull/39799>`__ Added the ``tcp_sessions_unassociated`` counter to the ``wazuh-remoted`` statistics, reporting TCP connections not yet associated with an agent.
-  `#39930 <https://github.com/wazuh/wazuh/issues/39930>`__ Added rule tree memory thresholds to ``wazuh-analysisd`` to warn about and reject rulesets whose rule tree grows too large. ``analysisd.rule_tree_memory_warning`` and ``analysisd.rule_tree_memory_limit`` accept a size or a percentage of the available memory, including cgroup limits.
-  `#39607 <https://github.com/wazuh/wazuh/issues/39607>`__ Changed the full vulnerability re-scan to scan only the agents that are connected or that the start of the manager disconnected, and to leave the stored state of the others untouched.

Wazuh agent
^^^^^^^^^^^

-  `#40426 <https://github.com/wazuh/wazuh/pull/40426>`__ Changed the agent to report the RHEL base release as the operating system version on Red Hat Enterprise Linux CoreOS nodes of OpenShift 4.19 and earlier, instead of the OpenShift build.
-  `#40477 <https://github.com/wazuh/wazuh/pull/40477>`__ Changed logcollector to ignore sockets and socket targets pushed in the centralized configuration unless ``logcollector.remote_commands`` is enabled.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#39925 <https://github.com/wazuh/wazuh/issues/39925>`__ Fixed ``POST /agents`` enabling the ``force`` option when the request body sends a ``force`` object without ``enabled``, contrary to the API specification.
-  `#39723 <https://github.com/wazuh/wazuh/pull/39723>`__ Fixed path traversal in the agent diff-folder cleanup by rejecting agent names that escape ``queue/diff``.
-  `#39709 <https://github.com/wazuh/wazuh/pull/39709>`__ Added type validation for the ``path`` and ``index`` fields of FIM synchronization entries in ``wazuh-db``.
-  `#39606 <https://github.com/wazuh/wazuh/pull/39606>`__ Fixed a one-byte heap buffer underflow in the GCP wodle output parser.
-  `#39476 <https://github.com/wazuh/wazuh/pull/39476>`__ Fixed the ``report_changes`` snapshot following symbolic links and accepting non-regular files on Linux and macOS.
-  `#39622 <https://github.com/wazuh/wazuh/pull/39622>`__ Fixed a root-level OS command injection in the rootcheck promiscuous-interface check.
-  `#39614 <https://github.com/wazuh/wazuh/pull/39614>`__ Fixed a memory leak in ``wazuh-remoted`` when parsing repeated OS/version records in an agent keepalive.
-  `#39649 <https://github.com/wazuh/wazuh/pull/39649>`__ Fixed logcollector following symbolic links and opening non-regular files without validating them on Linux and macOS.
-  `#39770 <https://github.com/wazuh/wazuh/pull/39770>`__ Fixed ``run_as`` authorization-context regex rules matching only a prefix of the value instead of the whole value, including a trailing ``$`` anchor being dropped from the expression.
-  `#39664 <https://github.com/wazuh/wazuh/pull/39664>`__ Fixed a bug in the RBAC login path.
-  `#39773 <https://github.com/wazuh/wazuh/pull/39773>`__ Fixed a directory-naming collision in the multigroup shared-configuration path.
-  `#39855 <https://github.com/wazuh/wazuh/pull/39855>`__ Fixed ``run_as`` authorization-context regex rules without a closing quote being evaluated as a partial expression, and rejected such rules when creating or updating security rules.
-  `#39855 <https://github.com/wazuh/wazuh/pull/39855>`__ Fixed ``MATCH`` and ``MATCH$`` security rules granting a role when a rule item was not satisfied, because matches were counted instead of checked per rule item.
-  `#40161 <https://github.com/wazuh/wazuh/pull/40161>`__ Fixed ``GET /groups`` returning no results for users restricted by RBAC to groups whose name is made of digits with leading zeros, such as ``007``.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed the SonicWall decoder leaving its ``category`` field unterminated for a ``c=`` value of 7 or more digits.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed ``OS_IPFound``/``OS_IPFoundList`` comparing an IP against a rule of a different family, reading past the end of an IPv4 rule's allocation for an IPv6 query.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed ``wazuh-remoted``'s syslog-TCP listener advancing its buffer length after a failed ``recv()``, writing one byte before the buffer on a reset connection.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed a path traversal in ``analysisd``'s diff-folder path construction via an unvalidated syslog hostname.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed an agent overriding the trusted agent ID in its own upgrade status report by supplying its own ``agents`` field.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed an integer wrap in the shared modules' socket wrapper that could request an unbounded ``recv()`` on a length-prefixed read.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed an inverted bounds check in the shared modules' socket wrapper letting a malformed header length move its read offset past the message.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed an integer underflow in the keystore's AES decryption of a ciphertext shorter than its key and IV.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed a zip-slip guard allowing extraction into a sibling directory sharing the target directory's name prefix.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed the Azure Log Analytics wodle logging its OAuth bearer token at debug level.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed a GCP Pub/Sub message being spliced unescaped into the event JSON sent to ``analysisd``, letting a crafted message add or override event fields.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed the AWS wodle decompressing gzip objects twice before processing them, doubling memory and CPU use per object.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed a quadratic-time loop in the AWS Macie/custom-bucket JSON parser caused by re-slicing the remaining buffer on every object, and its zero-matching regex backtracking quadratically on long runs of zeros.
-  `#40422 <https://github.com/wazuh/wazuh/issues/40422>`__ Fixed the AWS module never reading the CloudTrail and load balancer logs delivered out of key order.
-  `#40010 <https://github.com/wazuh/wazuh/pull/40010>`__ Fixed the Maltiverse integration sending an unvalidated alert hostname unescaped in the request path, allowing path or query manipulation within the Maltiverse API.
-  `#38347 <https://github.com/wazuh/wazuh/issues/38347>`__ Fixed the shared modules socket client stopping for good instead of reconnecting when the peer half-closed the connection before closing it.
-  `#40177 <https://github.com/wazuh/wazuh/pull/40177>`__ Fixed the Azure Storage integration resending every record of an append blob each time new records were appended to it.
-  `#39607 <https://github.com/wazuh/wazuh/issues/39607>`__ Fixed the vulnerability scanner outbox queue hanging with a busy thread and no log when its stored keys mix the plain and the padded formats: the queue now reads and removes each key in the format it is stored in, the dispatcher reports failures through the logger, rejects new elements when the scan is still incomplete, and the startup reports keys it cannot read.
-  `#39607 <https://github.com/wazuh/wazuh/issues/39607>`__ Fixed the vulnerability scanner re-scan leaving findings in the local mirror that its inventory no longer tracks: each agent is now cleared by prefix, and the master node of a cluster clears the agents that report to another node instead of scanning them.
-  `#39607 <https://github.com/wazuh/wazuh/issues/39607>`__ Fixed the single-agent vulnerability re-scan aborting on a NULL agent column after its state had been cleared.
-  `#39607 <https://github.com/wazuh/wazuh/issues/39607>`__ Fixed the indexer connector waiting for the initialization of the indexer before applying operations that do not call it, and looking for the mappings backup index by listing every index of the cluster, which needed a cluster-wide permission and left an orphan backup behind.
-  `#40148 <https://github.com/wazuh/wazuh/pull/40148>`__ Fixed ``wazuh-monitord`` not compressing the rotated ``-NNN`` archive and alert files when they rotate more than once a day.
-  `#40357 <https://github.com/wazuh/wazuh/pull/40357>`__ Fixed ``wurl_request()`` sending ``|`` and ``\`` unencoded in the URL, so a URL containing ``|`` was split into extra fields by the download module, truncating the URL and replacing the destination, header and data of the request.
-  `#39982 <https://github.com/wazuh/wazuh/issues/39982>`__ Fixed ``wazuh-keystore`` being built without the stack canary, ``FORTIFY_SOURCE`` and PIE hardening flags on Linux.
-  `#40490 <https://github.com/wazuh/wazuh/pull/40490>`__ Fixed SCA content checks opening non-regular files without validating them on UNIX systems, which could block the scan.
-  `#40472 <https://github.com/wazuh/wazuh/pull/40472>`__ Fixed ``wazuh-modulesd`` and ``wazuh-syscheckd`` keeping a local request connection open when the request could not be read.
-  `#40472 <https://github.com/wazuh/wazuh/pull/40472>`__ Fixed ``wazuh-modulesd`` delivering a synchronization message to the wrong module when its data contains another module's name.

Wazuh agent
^^^^^^^^^^^

-  `#40140 <https://github.com/wazuh/wazuh/pull/40140>`__ Fixed ``wazuh-syscheckd`` and ``wazuh-modulesd`` aborting on Solaris 11 SPARC when a C++ exception was thrown.
-  `#39905 <https://github.com/wazuh/wazuh/pull/39905>`__ Fixed the ``host-deny`` active response removing unrelated ``hosts.deny`` entries matching the IP as a substring.
-  `#39705 <https://github.com/wazuh/wazuh/pull/39705>`__ Fixed one-byte buffer overflows in whodata, logcollector and FIM config parsing.
-  `#39956 <https://github.com/wazuh/wazuh/pull/39956>`__ Fixed syscollector dropping process and port inventory on names with invalid UTF-8.
-  `#40133 <https://github.com/wazuh/wazuh/pull/40133>`__ Fixed ``wazuh-agentd`` crashing intermittently at startup on macOS 26 when the manager address is a hostname.
-  `#40327 <https://github.com/wazuh/wazuh/pull/40327>`__ Fixed macOS ``wazuh-modulesd`` leaking memory and Mach ports in the syscollector users inventory.
-  `#39707 <https://github.com/wazuh/wazuh/pull/39707>`__ Fixed FIM crash on first scan when inotify cannot be initialized.
-  `#39573 <https://github.com/wazuh/wazuh/pull/39573>`__ Fixed ``force_reconnect_interval`` from centralized configuration not applied on agent hot reload.
-  `#39476 <https://github.com/wazuh/wazuh/pull/39476>`__ Fixed the ``report_changes`` snapshot following symbolic links and accepting non-regular files on Linux and macOS.
-  `#39622 <https://github.com/wazuh/wazuh/pull/39622>`__ Fixed a root-level OS command injection in the rootcheck promiscuous-interface check.
-  `#40459 <https://github.com/wazuh/wazuh/pull/40459>`__ Limited the rootcheck system scan directory depth.
-  `#39649 <https://github.com/wazuh/wazuh/pull/39649>`__ Fixed logcollector following symbolic links and opening non-regular files without validating them on Linux and macOS.
-  `#40056 <https://github.com/wazuh/wazuh/pull/40056>`__ Fixed the ``snort-full`` log format not sending each Snort alert as one event.
-  `#39800 <https://github.com/wazuh/wazuh/pull/39800>`__ Fixed logcollector memory usage growing with the length of a line read with the ``multi-line-regex`` format.
-  `#39802 <https://github.com/wazuh/wazuh/pull/39802>`__ Fixed the syscollector browser extensions inventory reading non-regular or oversized files from user profiles.
-  `#39802 <https://github.com/wazuh/wazuh/pull/39802>`__ Fixed the syscollector browser extensions inventory following symbolic links and reading files not owned by the profile owner on Linux and macOS.
-  `#40113 <https://github.com/wazuh/wazuh/pull/40113>`__ Fixed the Windows syscollector handling of paths and keys read from the registry and browser profiles.
-  `#39781 <https://github.com/wazuh/wazuh/pull/39781>`__ Fixed logcollector following junctions and symbolic links and opening non-regular files without validating them on Windows.
-  `#39463 <https://github.com/wazuh/wazuh/pull/39463>`__ Added macOS support to the ``disable-account`` active response.
-  `#39171 <https://github.com/wazuh/wazuh/issues/39171>`__ Fixed the macOS ULS reader losing the stored timestamp after log lines shorter than 31 characters.
-  `#39597 <https://github.com/wazuh/wazuh/issues/39597>`__ Fixed a macOS logcollector crash on agent stop and ``log stream`` exits going undetected with ``logcollector.max_lines=0``.
-  `#40387 <https://github.com/wazuh/wazuh/pull/40387>`__ Fixed the macOS ULS reader splitting messages that contain line breaks into several events.
-  `#39547 <https://github.com/wazuh/wazuh/pull/39547>`__ Fixed the Windows agent reporting the operating system it had before an in-place feature update.
-  `#39734 <https://github.com/wazuh/wazuh/pull/39734>`__ Fixed the Windows agent installer not applying the configuration file permissions to the ``shared`` directory.
-  `#40365 <https://github.com/wazuh/wazuh/pull/40365>`__ `#40569 <https://github.com/wazuh/wazuh/pull/40569>`__ Fixed ``make deps`` silently ignoring a failed ``http-request`` download.
-  `#39807 <https://github.com/wazuh/wazuh/pull/39807>`__ Fixed the Solaris 10 and AIX agent packages leaving files in ``/var/ossec`` after removal.
-  `#39931 <https://github.com/wazuh/wazuh/pull/39931>`__ Fixed the browser extensions inventory dropping entries when an extension metadata file contains unexpected values.
-  `#40017 <https://github.com/wazuh/wazuh/pull/40017>`__ Fixed active responses following symbolic links when writing their log file on UNIX systems.
-  `#40513 <https://github.com/wazuh/wazuh/pull/40513>`__ Fixed FIM errors on file names that are not valid UTF-8.
-  `#40110 <https://github.com/wazuh/wazuh/pull/40110>`__ Fixed FIM ``report_changes`` following directory symbolic links when saving file snapshots on UNIX systems.
-  `#40134 <https://github.com/wazuh/wazuh/pull/40134>`__ Fixed logcollector reading files that contain NUL bytes again from the start, and sending their events again, after every agent restart.
-  `#38763 <https://github.com/wazuh/wazuh/pull/38763>`__ Fixed ``wazuh-syscheckd`` leaving the Auditd plugin configuration file on disk when who-data via Audit is disabled.
-  `#40019 <https://github.com/wazuh/wazuh/pull/40019>`__ Fixed logcollector validating monitored paths on Solaris 10, HP-UX and AIX 6.1, which lack part of the ``openat()`` family, and a race on Windows where a directory switched in place to a junction could redirect an open.
-  `#40248 <https://github.com/wazuh/wazuh/pull/40248>`__ Fixed the macOS agent package loading ``/tmp/wazuh_envs`` without checking its owner, permissions and file type.
-  `#40368 <https://github.com/wazuh/wazuh/pull/40368>`__ Fixed ``wazuh-modulesd`` crashing on a malformed legacy Berkeley DB RPM package record by validating the offsets and counts of each header entry.
-  `#40389 <https://github.com/wazuh/wazuh/pull/40389>`__ Fixed the agent creating an empty ``ossec-DD.json.gz`` archive in the first daily log rotation after each install or upgrade when JSON logging is disabled, as on macOS.
-  `#40490 <https://github.com/wazuh/wazuh/pull/40490>`__ Fixed SCA content checks opening non-regular files without validating them on UNIX systems, which could block the scan.
-  `#40472 <https://github.com/wazuh/wazuh/pull/40472>`__ Fixed ``wazuh-modulesd`` and ``wazuh-syscheckd`` keeping a local request connection open when the request could not be read.
-  `#40472 <https://github.com/wazuh/wazuh/pull/40472>`__ Fixed ``wazuh-modulesd`` delivering a synchronization message to the wrong module when its data contains another module's name.
-  `#40452 <https://github.com/wazuh/wazuh/pull/40452>`__ Fixed FIM eBPF whodata renames not reporting the old name as deleted, and not being reported at all in kprobe mode on kernels 6.18 and later.

RESTful API
^^^^^^^^^^^

-  `#39706 <https://github.com/wazuh/wazuh/pull/39706>`__ Fixed configuration masking to cover the credential fields of cloud, integration and cluster HAProxy settings, and the group configuration files.
-  `#39663 <https://github.com/wazuh/wazuh/pull/39663>`__ Fixed configuration masking not applying to XML tags written with whitespace or attributes.
-  `#39922 <https://github.com/wazuh/wazuh/pull/39922>`__ Fixed ``wazuh-apid`` staying alive without its PID file when it receives ``SIGTERM`` during startup.
-  `#39361 <https://github.com/wazuh/wazuh/issues/39361>`__ Fixed the API login attempt counter refreshing its time window on every request to the login endpoints, which let sporadic failed logins from a client that logs in frequently accumulate until the IP was blocked.
-  `#39930 <https://github.com/wazuh/wazuh/issues/39930>`__ Fixed rule and decoder uploads reporting any ruleset validation failure as an XML syntax error. The error now includes the ``wazuh-analysisd`` details, and the new error 1132 reports a ruleset that exceeds the rule tree node limit.
-  `#39930 <https://github.com/wazuh/wazuh/issues/39930>`__ Fixed rule and decoder uploads leaving the uploaded file installed when the validation could not be completed or the file had no previous version.
-  `#39357 <https://github.com/wazuh/wazuh/issues/39357>`__ Fixed ``GET /security/resources`` and ``GET /security/actions`` returning the RBAC catalog to users without ``security:read_config`` after an authorized user had requested it. Those users now always receive ``403``.
-  `#39983 <https://github.com/wazuh/wazuh/issues/39983>`__ Fixed ``wazuh-apid`` and ``wazuh-clusterd`` logging an error at shutdown for a child process that had already exited.

Ruleset
^^^^^^^

-  `#39768 <https://github.com/wazuh/wazuh/pull/39768>`__ Fixed two inverted checks in the Debian 10 SCA policy: single user mode authentication and the remote login warning banner.
-  `#39762 <https://github.com/wazuh/wazuh/pull/39762>`__ Fixed the ``/etc/security/opasswd`` permission check failing when the optional ``opasswd.old`` file is absent in Debian 10, 12, 13 and Ubuntu 20.04, 22.04, 24.04 SCA policies.
-  `#39771 <https://github.com/wazuh/wazuh/pull/39771>`__ Fixed MTA check in multiple SCA files.
-  `#39995 <https://github.com/wazuh/wazuh/pull/39995>`__ Fixed the Debian 13 SCA policy reusing the Debian 12 check IDs, renumbering it to a dedicated 42000+ range.
-  `#40102 <https://github.com/wazuh/wazuh/pull/40102>`__ Fixed polarity and matching errors in the Debian 10, Ubuntu 20.04 and RHEL 10 SCA policies (AppArmor bootloader, audit at boot, audit backlog limit and sudo timeout checks), the ``compare =>`` operator in 16 SCA policies, and GRUB kernel-line matching (tab or mixed indentation, memtest86+ entries) in 10 SCA policies.
-  `#40154 <https://github.com/wazuh/wazuh/pull/40154>`__ Fixed ``gcp-bucket`` storage log rule (``65075``) sitting below the default ``log_alert_level``, and fixed its and the access log rule's (``65074``) descriptions, which referred to VPC.
-  `#40196 <https://github.com/wazuh/wazuh/pull/40196>`__ Fixed the auditd decoders taking ``audit.key``, ``audit.list`` and ``audit.res`` from another record of the same event or from ``EXECVE`` arguments, not decoding ``audit.auid``, ``audit.session`` and ``audit.op`` on current ``CONFIG_CHANGE`` records, and including the ``ENRICHED`` interpreted fields in the last field of ``CONFIG_CHANGE``, ``LOGIN``, ``ANOM_PROMISCUOUS`` and ``MAC_STATUS`` records.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.14.10/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.14.10/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.14.10/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.14.10/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.14.10/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.14.10/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.14.10/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.14.10/CHANGELOG.md>`__