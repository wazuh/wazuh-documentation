.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.14.9 has been released. Check out our release notes to discover the changes and additions of this release.

4.14.9 Release notes - TBD
==========================

This section lists the changes in version 4.14.9. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#38571 <https://github.com/wazuh/wazuh/pull/38571>`__ Added the missing compiler hardening flags (stack canary, PIE, full RELRO and ``FORTIFY_SOURCE``) to the Linux binaries.
-  `#39471 <https://github.com/wazuh/wazuh/pull/39471>`__ The API access log no longer writes the ``run_as`` authorization context verbatim unless debug logging is enabled; ``hash_auth_context`` still identifies it.

Wazuh agent
^^^^^^^^^^^

-  `#39746 <https://github.com/wazuh/wazuh/pull/39746>`__ Narrowed the Windows agent MSI pending-restart check to the agent's own files.
-  `#39577 <https://github.com/wazuh/wazuh/issues/39577>`__ Added a script that builds the eBPF precompiled dependency with Zig for every Linux architecture.
-  `#38509 <https://github.com/wazuh/wazuh/pull/38509>`__ Raised from 64 to 1024 the number of active response commands that ``wazuh-execd`` can load from ``etc/shared/ar.conf``.
-  `#38571 <https://github.com/wazuh/wazuh/pull/38571>`__ Added the missing compiler hardening flags (stack canary, PIE, full RELRO and ``FORTIFY_SOURCE``) to the Linux binaries.
-  `#39167 <https://github.com/wazuh/wazuh/issues/39167>`__ Removed the per-comparison JSON serialisation from the macOS ports deduplication in syscollector.
-  `#39591 <https://github.com/wazuh/wazuh/issues/39591>`__ Allowed FIM eBPF whodata on capable kernels older than 5.8, such as RHEL 8.10.

Other
^^^^^

-  `#39148 <https://github.com/wazuh/wazuh/pull/39148>`__ Updated embedded Python to 3.10.21 and dependencies ``cryptography``, ``pip``, ``pyasn1`` and ``setuptools``.
-  `#39148 <https://github.com/wazuh/wazuh/pull/39148>`__ Updated the Google Cloud dependencies (``google-cloud-storage``, ``google-cloud-core``, ``google-auth`` and ``google-resumable-media``), which relied on the ``pkg_resources`` module removed in ``setuptools`` 82.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#8978 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8978>`__ Upgraded jsdom and its dependencies (``lodash`` to ``4.18.1``, ``form-data`` to ``3.0.5``).

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#39051 <https://github.com/wazuh/wazuh/issues/39051>`__ Fixed the vulnerability scanner stalling while the CTI feed applies a backlog of offsets, by releasing the feed lock between offset files instead of holding it for the whole backlog.
-  `#38427 <https://github.com/wazuh/wazuh/pull/38427>`__ Bounded the agent control message copy to the source string length in ``wazuh-remoted``.
-  `#38449 <https://github.com/wazuh/wazuh/pull/38449>`__ Fixed the cluster server keeping pre-authentication connections open indefinitely by adding a handshake deadline and a global connection limit.
-  `#39539 <https://github.com/wazuh/wazuh/pull/39539>`__ Fixed ``wazuh-authd`` keeping idle enrolment connections open indefinitely by closing any connection that has not completed its request within 30 seconds.
-  `#38548 <https://github.com/wazuh/wazuh/pull/38548>`__ Fixed a memory leak in the ``wazuh-analysisd`` JSON decoder when an event repeats a static field.
-  `#38625 <https://github.com/wazuh/wazuh/pull/38625>`__ Fixed integer underflows and an overflow in the ``OS_StrBreak()`` string splitter.
-  `#38594 <https://github.com/wazuh/wazuh/pull/38594>`__ Restricted the Azure Graph wodle pagination to the Microsoft Graph endpoint, so the authentication token is not sent to another host.
-  `#38474 <https://github.com/wazuh/wazuh/pull/38474>`__ Fixed false positive vulnerability reports for Debian packages installed from backports suites.
-  `#38686 <https://github.com/wazuh/wazuh/pull/38686>`__ Added Fluentd server identity verification to the ``fluent-forward`` module: the certificate name is now checked against the configured address and the shared key digest returned by the server is verified.
-  `#38804 <https://github.com/wazuh/wazuh/pull/38804>`__ Aligned the API ``force`` parameter with its OpenAPI schema: ``POST /agents`` now declares it, and ``POST /agents/insert`` no longer sends a ``force`` object that the request did not carry.
-  `#38894 <https://github.com/wazuh/wazuh/pull/38894>`__ Escaped control characters in the request path of the API plain-text access log, so an unauthenticated request can no longer forge access log entries.
-  `#39041 <https://github.com/wazuh/wazuh/pull/39041>`__ Fixed the indexer connector silently diverging from the ``wazuh-states-*`` indices: per-item ``_bulk`` rejections are now logged instead of ignored, aggregated by error type and reason, ``_delete_by_query`` responses reporting failures or version conflicts are now logged too, agent-ID deletions no longer match by raw string prefix, and a DELETED document no longer sweeps in sibling documents whose ID merely starts with the deleted one.
-  `#39471 <https://github.com/wazuh/wazuh/pull/39471>`__ Raised the default API ``run_as`` authentication-context payload size limit from 8 KB to 64 KB and made it configurable via the new ``auth_context_max_payload_size`` option, for AD/LDAP/SSO logins with large group-membership contexts.

Wazuh agent
^^^^^^^^^^^

-  `#38767 <https://github.com/wazuh/wazuh/pull/38767>`__ Fixed false error log when macOS ``log stream`` process exits during graceful agent shutdown.
-  `#38301 <https://github.com/wazuh/wazuh/pull/38301>`__ Fixed missing Windows FIM inventory for file names with non-ANSI characters.
-  `#39201 <https://github.com/wazuh/wazuh/issues/39201>`__ Fixed an agent crash caused by unsynchronized reads of the FIM directories list from the whodata callbacks.
-  `#39360 <https://github.com/wazuh/wazuh/issues/39360>`__ Fixed FIM eBPF whodata dropping events on hosts whose NSS backend is remote.
-  `#38277 <https://github.com/wazuh/wazuh/pull/38277>`__ Fixed the Windows agent MSI upgrade leaving the agent broken after the next reboot, and the silent ``/q`` upgrade hanging, when a system restart was pending.
-  `#38340 <https://github.com/wazuh/wazuh/pull/38340>`__ Fixed syscollector sometimes keeping excluded macOS packages in the inventory.
-  `#38410 <https://github.com/wazuh/wazuh/pull/38410>`__ Fixed ``wazuh-execd`` crashing when more active response commands than supported are defined.
-  `#38431 <https://github.com/wazuh/wazuh/pull/38431>`__ Fixed WPK upgrade failing on agents without the ``find`` binary.
-  `#38472 <https://github.com/wazuh/wazuh/pull/38472>`__ Bounded the ``snort-full`` log record appends to the available buffer space and sized the queued preprocessor message from its own line in ``wazuh-logcollector``.
-  `#38545 <https://github.com/wazuh/wazuh/pull/38545>`__ Fixed FIM whodata falling back to audit on arm64 kernels where the BPF-LSM hooks cannot load or attach, by retrying with the kprobe program set.
-  `#38688 <https://github.com/wazuh/wazuh/pull/38688>`__ Restricted the GitHub, Office 365 and MS Graph wodles pagination and content retrieval to the configured API host, so the authentication token is not sent to another host.
-  `#38382 <https://github.com/wazuh/wazuh/pull/38382>`__ Fixed whodata (audit) holding the audisp socket undrained at startup when the manager is unreachable, starving other audit plugins.
-  `#38637 <https://github.com/wazuh/wazuh/pull/38637>`__ Fixed the ``disable-account`` active response reporting success when the account was not disabled, and stopped ``is_valid_username()`` from rejecting valid usernames containing consecutive dots.
-  `#38645 <https://github.com/wazuh/wazuh/pull/38645>`__ Fixed the ``disable-account`` active response returning success when the account command was missing or the system was not supported.
-  `#38856 <https://github.com/wazuh/wazuh/pull/38856>`__ Fixed the gcloud wodle masking missing-dependency errors as an unrelated ``AttributeError``.
-  `#38651 <https://github.com/wazuh/wazuh/pull/38651>`__ Restricted active response usernames to an allowlist, rejecting quotes, shell metacharacters, control characters and non-ASCII bytes.
-  `#38969 <https://github.com/wazuh/wazuh/pull/38969>`__ Fixed process names truncated to fifteen characters in the syscollector inventory.
-  `#38868 <https://github.com/wazuh/wazuh/pull/38868>`__ Fixed the gcloud wodle's Pub/Sub integration failing to start whenever the bucket integration's dependencies (e.g. ``google-cloud-storage``) were broken, by deferring each integration's imports so a failure in one no longer blocks the other.
-  `#39119 <https://github.com/wazuh/wazuh/issues/39119>`__ Fixed the macOS agent's default FIM configuration monitoring ``/etc``, which macOS resolves as a symlink to ``/private/etc``; without ``follow_symbolic_link`` enabled, syscheck only recorded the symlink itself, leaving every file under it (``sudoers``, ``sshd_config``, ``pam.d``, ``hosts``) uncovered. The default ``<directories>``, ``<ignore>``, and ``<nodiff>`` entries now target ``/private/etc`` directly.
-  `#39126 <https://github.com/wazuh/wazuh/issues/39126>`__ Fixed the macOS agent's syscollector process and port inventory being truncated, because ``proc_listallpids()`` was called with the buffer size expressed in ``pid_t`` count instead of bytes.
-  `#39124 <https://github.com/wazuh/wazuh/pull/39124>`__ Fixed the default agent nodiff list not protecting ``/etc/shadow`` and real key paths.
-  `#38627 <https://github.com/wazuh/wazuh/pull/38627>`__ Fixed FIM not monitoring user-mounted ``tmpfs`` directories mistaken for ``/dev``.
-  `#38943 <https://github.com/wazuh/wazuh/pull/38943>`__ Fixed the gcloud wodle silently discarding a crashed process's raw output when it produced no recognized log line, and fixed ``wm_exec()`` (shared by every wodle) reporting exit code 0 for a process killed by a signal, such as an OOM kill or a native segfault, which had made that raw-output fallback unreachable for exactly the crashes it was meant to catch.
-  `#39198 <https://github.com/wazuh/wazuh/issues/39198>`__ Fixed the default Windows FIM configuration monitoring none of its 19 named critical binaries (``cmd.exe``, ``lsass.exe``, ``sc.exe``, ``sethc.exe``, etc.), because duplicate ``%WINDIR%\SysNative`` / ``%WINDIR%\System32`` directory declarations collapsed onto the same path once normalized and silently replaced each other's ``restrict`` list.
-  `#39160 <https://github.com/wazuh/wazuh/issues/39160>`__ Fixed the macOS postinstall not re-owning ``ossec``-era files, due to an unterminated ``find -exec``.
-  `#30480 <https://github.com/wazuh/wazuh/issues/30480>`__ Fixed the AWS wodle rejecting the ``us-gov-east-1`` and ``us-gov-west-1`` regions as invalid.
-  `#39356 <https://github.com/wazuh/wazuh/pull/39356>`__ Fixed the macOS agent not reporting the password status and hash algorithm of local users.
-  `#39356 <https://github.com/wazuh/wazuh/pull/39356>`__ Fixed the macOS agent reporting zeroed password aging values for local users, where macOS defines no such policy.
-  `#39165 <https://github.com/wazuh/wazuh/issues/39165>`__ Fixed the users inventory misreporting sudoers, missing group-based grants (e.g. macOS's ``%admin``, Linux's ``%sudo``/``%wheel``) and flagging unrelated accounts.
-  `#39165 <https://github.com/wazuh/wazuh/issues/39165>`__ Fixed the users inventory never reading sudo grants placed in sudoers drop-in files (``/etc/sudoers.d/*``).
-  `#39353 <https://github.com/wazuh/wazuh/issues/39353>`__ Fixed the Windows agent accepting ``<whodata><provider>ebpf</provider></whodata>`` and silently disabling whodata.
-  `#39570 <https://github.com/wazuh/wazuh/pull/39570>`__ Fixed the FIM eBPF whodata healthcheck failing on RHEL 9 kernels and discarding the eBPF provider.
-  `#39708 <https://github.com/wazuh/wazuh/pull/39708>`__ Fixed FIM eBPF whodata dropping events for files outside the root mount.
-  `#40084 <https://github.com/wazuh/wazuh/pull/40084>`__ Fixed the Windows ``netsh`` and ``route-null`` active responses failing with ``Cannot read 'srcip' from data`` since v4.14.7, because the IP validation called ``getaddrinfo()`` without initializing Winsock.

Ruleset
^^^^^^^

-  `#38669 <https://github.com/wazuh/wazuh/pull/38669>`__ Fixed multiple checks with deprecated commands in Apple macOS 26.0 SCA file.
-  `#39047 <https://github.com/wazuh/wazuh/pull/39047>`__ Fixed false-pass on the CIS Amazon Linux 2023 and Ubuntu 18.04 minimum password-days checks.
-  `#39166 <https://github.com/wazuh/wazuh/pull/39166>`__ Fixed a ``Permisive`` typo failing the SELinux mode check on compliant hosts across 5 SCA policies.
-  `#39474 <https://github.com/wazuh/wazuh/pull/39474>`__ Fixed the CIS Ubuntu 20.04 and Debian 10 "nologin is not listed in ``/etc/shells``" check always reporting passed, by matching ``nologin`` instead of the never-occurring ``nologins``.
-  `#38679 <https://github.com/wazuh/wazuh/pull/38679>`__ Fixed SCA checks silently failing across macOS, RHEL/Debian, AlmaLinux, Amazon Linux, CentOS, Oracle Linux, and Rocky Linux, Ubuntu, Solaris, MongoDB policies by adding missing shell wrappers and fixing broken rule syntax.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#9141 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/9141>`__ Fixed override of Server API authorization header.
-  `#9313 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/9313>`__ Fixed the enabled status shown for active response commands, the GitHub module and the Command wodle.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.14.9/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.14.9/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.14.9/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.14.9/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.14.9/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.14.9/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.14.9/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.14.9/CHANGELOG.md>`__