.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.14.11 has been released. Check out our release notes to discover the changes and additions of this release.

4.14.11 Release notes - TBD
===========================

This section lists the changes in version 4.14.11. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh agent
^^^^^^^^^^^

-  `#32502 <https://github.com/wazuh/wazuh/issues/32502>`__ Added a workflow that validates the FIM eBPF whodata events of every syscall on several kernels and filesystems.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#9428 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/9428>`__ **Server management** > **Dev Tools** shows the Server API error body and the request duration when a request fails.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#33339 <https://github.com/wazuh/wazuh/issues/33339>`__ Fixed the removal and purge of the ``wazuh-manager`` DEB package failing when the installation is incomplete.
-  `#40363 <https://github.com/wazuh/wazuh/pull/40363>`__ Fixed the validation of ``group_id`` when reading and writing group configuration files, rejecting values that are not a valid group name.
-  `#36834 <https://github.com/wazuh/wazuh/issues/36834>`__ Fixed the group configuration readers and upload accepting a group directory that resolves outside the shared directory, and the multigroup reader accepting a file name that resolves outside the multigroup directory.
-  `#37539 <https://github.com/wazuh/wazuh/issues/37539>`__ Fixed ``GET /agents/summary/os`` returning ``error: 0`` with no failed items when none of the agents has reported its operative system. Those agents are now returned as failed items with error code 1761, and the response states when there are no agents registered.
-  `#40481 <https://github.com/wazuh/wazuh/pull/40481>`__ Hardened the creation and removal of Unix domain sockets in the shared modules' socket wrapper.
-  `#40367 <https://github.com/wazuh/wazuh/pull/40367>`__ Added type validation for the error details of cluster synchronization messages and bound the received archive path to the file transfer completed for the task.
-  `#40366 <https://github.com/wazuh/wazuh/pull/40366>`__ Hardened how cluster workers apply the files received from the master.
-  `#40521 <https://github.com/wazuh/wazuh/pull/40521>`__ Fixed the snort decoder truncating ``srcip`` to all but its last octet and keeping the port in ``dstip``.
-  `#40592 <https://github.com/wazuh/wazuh/pull/40592>`__ Added validation of the provider names received by the router in ``wazuh-modulesd``.
-  `#40529 <https://github.com/wazuh/wazuh/pull/40529>`__ Fixed ``wazuh-execd`` keeping a local request connection open when the request could not be read, and not terminating a request of the maximum size.
-  `#40537 <https://github.com/wazuh/wazuh/pull/40537>`__ Fixed ``wazuh-logcollector`` keeping a local request connection open when the request could not be read, and not terminating a request of the maximum size.
-  `#40520 <https://github.com/wazuh/wazuh/pull/40520>`__ Fixed the ``proftpd-login failed`` decoder regex never matching a real ProFTPD login-failure log line, so failed-login alerts carried no ``srcip`` or ``user``.
-  `#40640 <https://github.com/wazuh/wazuh/pull/40640>`__ Fixed ``usermod`` group changes and MySQL/MariaDB syslog login failures raising no alert.
-  `#40427 <https://github.com/wazuh/wazuh/pull/40427>`__ Fixed ``PUT /agents/upgrade`` and ``PUT /agents/upgrade_custom`` failing the whole request with an internal error when an agent is deleted or disconnected while its upgrade task is being created.
-  `#39267 <https://github.com/wazuh/wazuh/issues/39267>`__ Fixed the vulnerability scanner evaluating Ubuntu kernel variant packages (HWE, cloud and other flavors) against the generic ``linux`` product instead of the product of their source package. Cloud, OEM and low-latency kernel images, which were not evaluated before, are now scanned against their own product.
-  `#40391 <https://github.com/wazuh/wazuh/pull/40391>`__ Fixed ``wazuh-authd`` keeping the connection open when a request has no newline terminator.
-  `#40540 <https://github.com/wazuh/wazuh/pull/40540>`__ Fixed ``wazuh-execd`` keeping every repeated offender for the life of the process, so its memory grew with each new source that triggered an active response.
-  `#40579 <https://github.com/wazuh/wazuh/pull/40579>`__ Fixed the ``azure-logs`` configuration reported by the Server API leaving out the requests and containers of each source.
-  `#40579 <https://github.com/wazuh/wazuh/pull/40579>`__ Fixed a memory leak in ``wazuh-modulesd`` each time the ``azure-logs`` configuration was requested.
-  `#41158 <https://github.com/wazuh/wazuh/pull/41158>`__ Fixed ``wazuh-modulesd`` wodles, such as ``azure-logs``, hanging when osquery or docker-listener started at the same time.
-  `#40489 <https://github.com/wazuh/wazuh/pull/40489>`__ Fixed the vulnerability scanner reporting no OS vulnerabilities for Windows 10 agents older than 20H2, which have no display version.
-  `#40538 <https://github.com/wazuh/wazuh/pull/40538>`__ Fixed the Azure Log Analytics integration never collecting the records ingested after a run with a ``TimeGenerated`` older than the newest record processed.
-  `#40538 <https://github.com/wazuh/wazuh/pull/40538>`__ Fixed the Azure Log Analytics integration skipping new records for up to a day after reading a record with a ``TimeGenerated`` ahead of the current time.
-  `#40580 <https://github.com/wazuh/wazuh/pull/40580>`__ Fixed the ``ms-graph`` configuration reported by the Server API leaving out the name of each resource and all its relationships but the last. ``api_auth`` is now an array with one item per block, and each resource lists its ``name`` and a ``relationships`` array.
-  `#40566 <https://github.com/wazuh/wazuh/pull/40566>`__ Fixed Vulnerability Detection reporting CentOS Stream packages as vulnerable when the fixed version differs from the installed one only by the minor of the dist tag (``el10`` and ``el10_2``).
-  `#40646 <https://github.com/wazuh/wazuh/pull/40646>`__ Fixed the Azure Storage integration skipping the blobs of a container when another container of the same storage account, or another block of the same container with another path or blob extension, had already sent newer ones.
-  `#40646 <https://github.com/wazuh/wazuh/pull/40646>`__ Fixed the Azure Storage integration stopping at a ``json_file`` blob that cannot be parsed, or whose records are not a list or include values that are not JSON objects, without processing the blobs after it.
-  `#40739 <https://github.com/wazuh/wazuh/issues/40739>`__ Fixed the AWS module stopping when a fetch outlasted the session of the role in ``iam_role_arn``, which the subscribers reported with an empty exit code 21 warning. The role is now assumed again before its session expires, and the warning includes the reason of the error.
-  `#40791 <https://github.com/wazuh/wazuh/pull/40791>`__ Fixed the configuration upload validation to also apply the ``upload_configuration.remote_commands`` setting to the ``prefilter_cmd`` option of the ``syscheck`` section.
-  `#40762 <https://github.com/wazuh/wazuh/issues/40762>`__ Fixed ``wazuh-apid`` and ``wazuh-clusterd`` killing their own freshly started process on startup when the kernel reused a PID recorded in a stale ``.pid`` file left by an unclean stop, such as a ``docker restart``. A process is now only terminated when it was created before the stale file, never when it is the caller itself. Also fixed a child pidfile being matched by PID substring, which let a child with PID 16 remove the pidfile of PID 161.
-  `#40841 <https://github.com/wazuh/wazuh/pull/40841>`__ Fixed the Server API rule and decoder endpoints (``GET /rules``, ``GET /rules/files``, ``GET /rules/groups``, ``GET /rules/requirement/{requirement}``, ``GET /decoders`` and ``GET /decoders/files``) listing every configured ruleset file once per permitted file, which made each request take seconds on large rulesets. Requests with ``distinct`` no longer compare each value against every value already kept.
-  `#40841 <https://github.com/wazuh/wazuh/pull/40841>`__ Fixed ``GET /rules/files`` and ``GET /decoders/files`` failing with an internal error when filtering by ``status=disabled`` while a file is listed twice in the ruleset configuration, such as a ``rule_include`` with the absolute path of a file in a ``rule_dir``.
-  `#40720 <https://github.com/wazuh/wazuh/pull/40720>`__ Fixed the validation of the configuration uploaded through ``PUT /manager/configuration`` and ``PUT /cluster/{node_id}/configuration`` so that it handles comments, escaped markup and namespaces the way the daemons do.
-  `#40848 <https://github.com/wazuh/wazuh/pull/40848>`__ Fixed the AWS S3 buckets not reading any more logs after processing an object whose key sorts after them, such as one under a far future day folder, until its row was removed from the database. The files without a valid date after the prefix, or dated after they were written, are now skipped, the ones processed before are removed from the database, and every bucket type but AWS Config lists again the logs from the day before the last one processed. On the first run after the upgrade, a bucket with more than 500 files in those two days sends again, once, the ones that the previous retention had deleted.
-  `#40848 <https://github.com/wazuh/wazuh/pull/40848>`__ Fixed the native GuardDuty bucket type reading only the last region, in alphabetical order, of a bucket with the findings of several regions. After the upgrade, the regions that were not read are read from their last processed file, or from ``only_logs_after``.
-  `#40634 <https://github.com/wazuh/wazuh/issues/40634>`__ Fixed the ``wazuh-db`` HTTP socket not answering requests when ``wazuh-db`` has more than 1024 open file descriptors.
-  `#40907 <https://github.com/wazuh/wazuh/pull/40907>`__ Fixed ``wazuh-analysisd`` crashing when the ruleset was reloaded from the dashboard or the Server API while events were being processed.
-  `#40937 <https://github.com/wazuh/wazuh/pull/40937>`__ Fixed the AWS SQS subscribers stopping at a message that is not an object notification, such as a malformed body, or whose object cannot be fetched or processed, without processing or deleting the other messages of the batch, and receiving messages such as the S3 test event again on every run. The messages that are not object notifications, or whose object does not exist or has an invalid name, are now deleted with a warning. A message whose object cannot be fetched or processed is kept for the next run while the rest of the queue is processed, unless ``skip_on_error`` is set and the file cannot be read or parsed: then the message is skipped. When a message is kept, the module exits with code 7 at the end of the run, or as soon as the requests for the objects of 10 messages in a row get no answer from AWS.
-  `#40937 <https://github.com/wazuh/wazuh/pull/40937>`__ Fixed the ``buckets`` and ``security_hub`` AWS subscribers not finding the objects whose key has a space or other characters that S3 encodes in its notifications.
-  `#36459 <https://github.com/wazuh/wazuh/issues/36459>`__ Fixed the Windows Eventchannel decoder leaving spaces in the ``win.eventdata`` field names, such as ``threat Name`` or ``severity Name`` in Windows Defender events, which left the Defender rules without their fields in the alert description. Spaces are now removed and the next letter is capitalized (``threatName``), so custom rules and queries that used the old names with spaces must be updated. Windows Defender error events now trigger the level 12 rule among 62162 to 62212 that matches their error code, instead of rule 62102.
-  `#41071 <https://github.com/wazuh/wazuh/pull/41071>`__ Fixed the AWS module applying a discard filter to plain-text CloudWatch Logs events and ``buckets`` subscriber logs when no ``discard_regex`` is configured.
-  `#41059 <https://github.com/wazuh/wazuh/pull/41059>`__ Fixed the ``buckets`` and ``security_hub`` AWS subscribers and the ``waf`` AWS bucket taking a time that grew with the square of the size of the concatenated JSON events of an S3 object, or of a line of it in the ``waf`` bucket, to parse them.
-  `#41059 <https://github.com/wazuh/wazuh/pull/41059>`__ Fixed the AWS module reading S3 objects of any size, in the buckets and in the ``buckets``, ``security_hub`` and ``security_lake`` subscribers, and the decompressed content of any size of the ``.gz`` and ``.zip`` objects, not of the Parquet objects of ``security_lake``. An object larger than 512 MiB, or whose decompressed content is, is now handled as a file that cannot be decompressed: the buckets exit with code 8, or skip it with ``skip_on_error``, and the subscribers keep its message in the queue and end with exit code 7, or delete it with ``skip_on_error``.
-  `#40570 <https://github.com/wazuh/wazuh/issues/40570>`__ Fixed ``PUT /active-response`` rejecting with error 1652 the name of a command defined in the configuration. The name is now accepted when it maps to a single name in ``ar.conf``, and error 1653 lists the accepted names when the command is used with different timeouts.
-  `#41080 <https://github.com/wazuh/wazuh/pull/41080>`__ Fixed ``wazuh-analysisd`` not releasing the previous value when more than one decoder sets the same static field of an event, such as sibling decoders that extract ``srcip`` from different parts of the same log.
-  `#40727 <https://github.com/wazuh/wazuh/issues/40727>`__ Fixed ``wazuh-remoted`` accepting a shared group file with NUL bytes and no line feed, such as a compiled CDB list, which blocked the delivery of the shared configuration to every agent of the group. The file is now rejected like any other binary file.
-  `#41170 <https://github.com/wazuh/wazuh/pull/41170>`__ Fixed the GCP Pub/Sub integration stopping at a message too large for the Wazuh socket without acknowledging the batch, so the batch was received again on every run and the messages before that one were sent again. The message is now skipped with an error, as is an event too large in the ``gcp-bucket`` integration, and the messages already sent are acknowledged when a run stops.
-  `#41215 <https://github.com/wazuh/wazuh/pull/41215>`__ Fixed a data race in the shared list getters that let the ``wazuh-analysisd`` rule matching threads read the newest event of an ``if_matched_sid`` or ``if_matched_group`` list without synchronizing with the thread that added it.
-  `#41208 <https://github.com/wazuh/wazuh/pull/41208>`__ Fixed the configuration endpoints showing the cluster key and credentials unmasked in RBAC white mode to users with a configuration update permission over another node, or with the update permission that does not apply to the node.

Wazuh agent
^^^^^^^^^^^

-  `#40696 <https://github.com/wazuh/wazuh/pull/40696>`__ Hardened the macOS agent package so an upgrade no longer follows a symlink or hard link planted under ``etc/``.
-  `#40467 <https://github.com/wazuh/wazuh/pull/40467>`__ Hardened how the agent handles requests received from the manager.
-  `#40468 <https://github.com/wazuh/wazuh/pull/40468>`__ Fixed ``agent-auth`` failing at random with ``SSL error (2)`` because it did not set the receive timeout of its enrollment socket.
-  `#40799 <https://github.com/wazuh/wazuh/pull/40799>`__ Fixed the macOS agent package not monitoring the active response log.
-  `#41111 <https://github.com/wazuh/wazuh/pull/41111>`__ Fixed firewall active responses ignoring failed firewall commands.
-  `#39763 <https://github.com/wazuh/wazuh/issues/39763>`__ Fixed whodata dropping ``chmod``, ``chown`` and write events without ``O_CREAT`` on paths under a symbolic link not configured with ``follow_symbolic_link``.
-  `#41045 <https://github.com/wazuh/wazuh/pull/41045>`__ Hardened agent PID file and Auditd plugin socket creation.
-  `#40529 <https://github.com/wazuh/wazuh/pull/40529>`__ Fixed ``wazuh-execd`` keeping a local request connection open when the request could not be read, and not terminating a request of the maximum size.
-  `#41164 <https://github.com/wazuh/wazuh/pull/41164>`__ Fixed active response IP handling and rule scope on AIX and Windows.
-  `#39812 <https://github.com/wazuh/wazuh/pull/39812>`__ Fixed FIM ``<diff>`` options parsing, whodata event loss, audit socket leak and bookmark double fclose.
-  `#40826 <https://github.com/wazuh/wazuh/pull/40826>`__ Fixed ``wazuh-logcollector`` dropping a later line after an oversized ``json`` or ``multi-line`` line.
-  `#41202 <https://github.com/wazuh/wazuh/pull/41202>`__ Fixed ``wazuh-logcollector`` dropping a line after an oversized Windows ``syslog`` or UTF-16 line.
-  `#40974 <https://github.com/wazuh/wazuh/pull/40974>`__ Fixed ``wazuh-logcollector`` misaligning every later ``multi-line`` event of a file when a read reached ``logcollector.max_lines`` inside an event or a line with NUL bytes was dropped.
-  `#40537 <https://github.com/wazuh/wazuh/pull/40537>`__ Fixed ``wazuh-logcollector`` keeping a local request connection open when the request could not be read, and not terminating a request of the maximum size.
-  `#40540 <https://github.com/wazuh/wazuh/pull/40540>`__ Fixed ``wazuh-execd`` keeping every repeated offender for the life of the process, so its memory grew with each new source that triggered an active response.
-  `#40664 <https://github.com/wazuh/wazuh/pull/40664>`__ Hardened how ``wazuh-logcollector`` opens the files it checks for binary content.
-  `#40579 <https://github.com/wazuh/wazuh/pull/40579>`__ Fixed the ``azure-logs`` configuration reported by the Server API leaving out the requests and containers of each source.
-  `#40579 <https://github.com/wazuh/wazuh/pull/40579>`__ Fixed a memory leak in ``wazuh-modulesd`` each time the ``azure-logs`` configuration was requested.
-  `#40489 <https://github.com/wazuh/wazuh/pull/40489>`__ Fixed the Windows agent reporting the wrong release for builds 15063 and 16299 when the registry has no ``ReleaseId``.
-  `#40662 <https://github.com/wazuh/wazuh/pull/40662>`__ Fixed FIM eBPF whodata missing renames, deletions and attribute changes processed before the operation completed.
-  `#40580 <https://github.com/wazuh/wazuh/pull/40580>`__ Fixed the ``ms-graph`` configuration reported by the Server API leaving out the name of each resource and all its relationships but the last. ``api_auth`` is now an array with one item per block, and each resource lists its ``name`` and a ``relationships`` array.
-  `#40692 <https://github.com/wazuh/wazuh/pull/40692>`__ Fixed ``wazuh-syscheckd`` crashing and leaving a core file when it is stopped or restarted during a FIM scan or synchronization.
-  `#40750 <https://github.com/wazuh/wazuh/issues/40750>`__ Fixed the journald reader skipping unread entries after a journal rotation when ``only-future-events`` is enabled.
-  `#40815 <https://github.com/wazuh/wazuh/pull/40815>`__ Fixed the rootcheck hidden-port check being skipped on Linux hosts without ``netstat``, such as a default RHEL 9 install.
-  `#40816 <https://github.com/wazuh/wazuh/pull/40816>`__ Fixed ``wazuh-agentd`` and ``wazuh-logcollector`` crashing or leaving a stale PID file when they are stopped while working.
-  `#40916 <https://github.com/wazuh/wazuh/pull/40916>`__ Fixed Syscollector reporting no network inventory on Linux while an IPv4 address carries a label other than ``<interface>`` or ``<interface>:<suffix>``, such as keepalived's ``label vip``, and reporting the address under the wrong interface when its label is another interface's name.
-  `#40671 <https://github.com/wazuh/wazuh/issues/40671>`__ Fixed ``wazuh-logcollector`` dropping a ``snort-full`` alert when a read stopped before the alert's date line.
-  `#40930 <https://github.com/wazuh/wazuh/pull/40930>`__ Fixed the agent applying the ``agent.conf`` blocks of the previous ``<config-profile>`` until a second restart after the profile was changed. On Linux this affected the labels and client buffer of ``wazuh-agentd``; on Windows it affected the whole agent.
-  `#40913 <https://github.com/wazuh/wazuh/pull/40913>`__ Fixed the rootcheck hidden-process check taking hours and filling the agent's memory limit on Linux hosts with many threads, and skipping PIDs above 32768.
-  `#40978 <https://github.com/wazuh/wazuh/pull/40978>`__ Fixed the Windows agent not monitoring the registry keys that match a ``windows_registry`` wildcard and are created after the agent starts.
-  `#41068 <https://github.com/wazuh/wazuh/pull/41068>`__ Fixed ``wazuh-logcollector`` skipping the newer journald entries of a read when one entry could not be formatted.
-  `#41072 <https://github.com/wazuh/wazuh/pull/41072>`__ Fixed ``wazuh-logcollector`` keeping a field of the log line instead of the label configured with the same name for ``json`` localfiles.
-  `#41095 <https://github.com/wazuh/wazuh/issues/41095>`__ Fixed ``wazuh-syscheckd`` crash when the eBPF whodata provider fails to load ``libbpf.so``.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#9426 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/9426>`__ Fixed the location shown for active responses in **Server management** > **Settings**.
-  `#9524 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/9524>`__ Fixed an error screen shown before the login page when the session expired.
-  `#9546 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/9546>`__ Fixed browser extensions counted as packages in the **Top 5 installed packages** and **Package types** panels of **IT Hygiene** > **Dashboard**.
-  `#9414 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/9414>`__ Fixed the validation of visualization images in module reports.
-  `#9552 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/9552>`__ Fixed the scheduled jobs, such as the statistics and monitoring collection, occasionally skipping a run.
-  `#9547 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/9547>`__ Fixed the Server API token not being revoked when logging out from a page outside the apps of wazuh plugin.
-  `#9570 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/9570>`__ Fixed the inventories (IT Hygiene, including Users and Groups, and FIM) exporting rows that ignored the search bar query in Export Formatted.
-  `#9607 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/9607>`__ Fixed the app being replaced by the "Something went wrong." screen or the health check when a group request or the Server API check timed out.
-  `#9625 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/9625>`__ Fixed the "CBD List" typo in the success toasts of the CDB list editor.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.14.11/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.14.11/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.14.11/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.14.11/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.14.11/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.14.11/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.14.11/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.14.11/CHANGELOG.md>`__