.. Copyright (C) 2018 Wazuh, Inc.

.. _upgrading_ossec:

======================
 Migrating from OSSEC
======================

.. meta::
  :description: Learn why it's a good reason to upgrade your infrastructure moving it to Wazuh.
  :keywords: wazuh, ossec, security, upgrade, recommendations
  :author: Wazuh, Inc.

Why it's time to migrate
------------------------

Unfortunately OSSEC users have not seen lots of new features over the last decade. The project has been in maintenance mode for a long time and very little development work has been done. There is no active roadmap and last releases consist mostly in bug fixes reported by occasional contributors.

This is why, back in 2015, Wazuh team decided to fork the project. The result is a much more comprehensive, easy to use, reliable and scalable solution. The fork has had great adoption among the open source community, quickly becoming a broadly used solution in enterprise environments.

Regarding project activity and roadmap, you can find Wazuh code in our `Github repository <https://github.com/wazuh/wazuh>`_. We believe is relevant to mention that, at the time of writing this documentation, the project has over 8,500 commits (3,000+ more than OSSEC).

Here is a brief summary of the value we added to the OSSEC project, and good reasons to upgrade your security monitoring infrastructure moving it to Wazuh:

Scalability and reliability
+++++++++++++++++++++++++++

* Cluster support for managers to scale horizontally.
* Support for Puppet, Chef, Ansible and Docker deployments.
* TCP support for agent-manager communications.
* Anti-flooding feature to prevent large burst of events from being lost or negatively impact network performance.
* AES encryption used for agent-manager communications (instead of Blowfish).
* Multi-thread support for manager processes, dramatically increaing their performance.

Installation and configuration management
+++++++++++++++++++++++++++++++++++++++++

* MSI signed package for Windows systems, with auto registration and configuration support.
* Unified RPM and Deb Linux packages.
* Support for AIX, Solaris, Mac OS X and HP-UX.
* RESTful API for status monitoring, querying and configuration management.
* Ability to upgrade agents from the managers.
* Improved centralized configuration management using agent groups.

Intrusion detection
+++++++++++++++++++

* Improved log analysis engine, with native JSON decoding and ability to name fields dynamically.
* Increased maximum message size from 6KB to 64KB (being able to analyze much larger log messages).
* Updated ruleset with new log analysis rules and decoders.
* Native rules for Suricata, making use of JSON decoder.
* Integration with `Owhl project <https://www.owlh.net>`_ for unified NIDS management.
* Support for IP reputation databases (e.g. `AlienVault OTX <https://www.alienvault.com/open-threat-exchange>`_).
* Native integration with Linux auditing kernel subsystem and Windows audit policies to capture who-data for FIM events.

Integration with cloud providers
++++++++++++++++++++++++++++++++

* Module for native integration with Amazon AWS (pulling data from `Cloudtrail <https://aws.amazon.com/cloudtrail/>`_ or `Cloudwatch <https://aws.amazon.com/cloudwatch/>`_).
* New rules and decoders for Amazon AWS.
* Module for native integration with Microsoft Azure.
* New rules and decoders for Microsoft Azure.

Regulatory compliance
+++++++++++++++++++++

* Alert mapping with PCI DSS and GPG13 requirements.
* Compliance dashboards for `Elastic Stack <https://www.elastic.co>`_, provided by Wazuh Kibana plugin.
* Compliance dashboards for `Splunk <https://www.splunk.com>`_, provided by Wazuh app.
* Use of `Owhl project <https://www.owlh.net>`_ Suricata mapping for compliance.
* SHA256 hashes used for file integrity monitoring (in addition to to MD5 and SHA1).
* Module for integration with `OpenScap <https://www.open-scap.org>`_, used for configuration assessment.

Elastic Stack integration
+++++++++++++++++++++++++

* Provides the ability to index and query data.
* Data enrichment using GeoIP Logstash module.
* Kibana plugin used to visualize data (integrated using Wazuh REStful API).
* Web user interface pre-configured extensions, adapting it to your use cases.

Incident response
+++++++++++++++++

* Module for collection of software and hardware inventory data.
* Ability to query for software and hardware via RESTful API.
* Module for integration with `Osquery <https://osquery.io>`_, being able to run queries on demand.
* Implementation of new output options for log collector component.
* Module for integration with `Virustotal <https://www.virustotal.com/>`_, used to detect the presence of malicious files.

Vulnerability detection and configuration assessment
++++++++++++++++++++++++++++++++++++++++++++++++++++

* Dynamic creation of CVE vulnerability databases, gathering data from OVAL repositories.
* Cross correlation with applications inventory data to detect vulnerable software.
* Module for integration with `OpenScap <https://www.open-scap.org>`_ allows the user to remotely configured scans.
* Support for CIS-CAT, by `Center of Internet Security <https://www.cisecurity.org>`_ scanner integration.

How to move to Wazuh
--------------------

The following guides describe how to migrate your existing OSSEC installation to Wazuh. Follow the appropriate one depending on the type (server or agent) of your OSSEC installation:

.. csv-table::
   :header: Installation type, Upgrade from, Upgrade to, Guide
   :widths: 20 30 20 30

   Server, OSSEC 2.8.3 or higher, Wazuh 3.x, :ref:`Upgrade OSSEC server <ossec_server>`
   Agent, OSSEC 2.8.3 or higher, Wazuh 3.x, :ref:`Upgrade OSSEC agent <ossec_agent>`

The migration of Elastic stack, in the case that you already have it installed, is beyond the scope of Wazuh documentation. We recommend you visit our guides for :ref:`Installing Elastic Stack <installation_elastic>`.

.. note::
    OSSEC agents are compatible with Wazuh server. You can even have different versions of Wazuh and OSSEC agents reporting to a centralized Wazuh server. Having said that, it is recommended to keep both server and agents updated to the latest version. For interactive help, our `mailing list <https://groups.google.com/d/forum/wazuh>`_ is available. You can subscribe by sending an email to ``wazuh+subscribe@googlegroups.com``.

.. toctree::
   :hidden:
   :maxdepth: 2

   ossec-server
   ossec-agent
