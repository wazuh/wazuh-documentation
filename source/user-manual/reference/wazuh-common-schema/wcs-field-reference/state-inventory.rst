.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The fields of the Wazuh Common Schema (WCS) system inventory state indices, with an example document and an example of how to use package.name.

System inventory
================

The system inventory indices store hardware, software, network, and user information for each endpoint, with one index per category.

The following example shows a document from the ``wazuh-states-inventory-packages`` index. It records a Python package installed on the Ubuntu endpoint:

.. code-block:: json

   {
     "_index" : "wazuh-states-inventory-packages",
     "_id" : "wazuh_003_2d2113c04ae74123f3ef32f4467d90a4abf2d621",
     "_score" : 1.0,
     "_source" : {
       "package" : {
         "installed" : null,
         "description" : "Database Abstraction Library",
         "source" : "https://www.sqlalchemy.org",
         "priority" : null,
         "type" : "pypi",
         "version" : "2.0.23",
         "path" : "/usr/local/lib/python3.12/dist-packages/SQLAlchemy-2.0.23.dist-info/METADATA",
         "size" : 0,
         "vendor" : "Mike Bayer",
         "name" : "SQLAlchemy",
         "multiarch" : null,
         "category" : null,
         "architecture" : null
       },
       "checksum" : {
         "hash" : {
           "sha1" : "f835ba751bc2db7be30e7db82f09212fbe9657d4"
         }
       },
       "wazuh" : {
         "cluster" : {
           "name" : "wazuh"
         },
         "agent" : {
           "host" : {
             "hostname" : "ubuntu-QEMU-Virtual-Machine",
             "os" : {
               "name" : "Ubuntu",
               "type" : "linux",
               "version" : "24.04.4 LTS (Noble Numbat)",
               "platform" : "ubuntu"
             },
             "architecture" : "aarch64"
           },
           "name" : "Ubuntu",
           "groups" : [
             "default"
           ],
           "id" : "003",
           "version" : "v5.0.0"
         }
       },
       "state" : {
         "document_version" : 298,
         "modified_at" : "2026-10-29T08:02:08.403Z"
       }
     }
   }

Example: Detect a vulnerable package, then find every endpoint that has it installed
------------------------------------------------------------------------------------

The inventory sends no events, but ``package.name`` is also in the vulnerability events of the Wazuh manager. A rule flags a new vulnerability in a package, then a query on the ``wazuh-states-inventory-packages`` index finds every endpoint where that package is installed, with its version.

Create the rule in **Ruleset management** > **Detection** > **Rules**. ``logsource.product`` names the integration whose events the rule evaluates. The events come from a built-in integration, so add the rule to a custom integration whose title is the same as the built-in one, for example ``wazuh-fim``. Then promote it to the custom space and add it to a custom detector in **Ruleset management** > **Detection** > **Detectors**. In the query, replace ``<WAZUH_INDEXER_IP_ADDRESS>``, ``<USERNAME>``, and ``<PASSWORD>`` with your values. The highlighted lines show where ``package.name`` is used and where it appears in the output.

**1. Rule on vulnerability events**

.. code-block:: yaml
   :emphasize-lines: 11

   logsource:
     product: wazuh-vd
   level: high
   status: experimental
   enabled: true
   detection:
     condition: selection
     selection:
       event.dataset: wazuh.vd
       event.action: vulnerability-detected
       package.name: python3-pip
   metadata:
     title: Vulnerable pip package detected
     author: Security Team
     description: Detects a newly detected vulnerability in the python3-pip package.

**2. Finding (excerpt)**

.. code-block:: json
   :emphasize-lines: 4

   {
     "event": { "dataset": "wazuh.vd", "action": "vulnerability-detected" },
     "package": {
       "name": "python3-pip",
       "version": "24.0+dfsg-1ubuntu1.3"
     },
     "vulnerability": { "id": "CVE-2025-66418", "severity": "High" },
     "wazuh": {
       "agent": { "name": "Ubuntu" },
       "rule": { "title": "Vulnerable pip package detected", "level": "high" }
     }
   }

**3. Query on the state index**

.. code-block:: bash
   :emphasize-lines: 4

   curl -k -u <USERNAME>:<PASSWORD> -X GET "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/wazuh-states-inventory-packages/_search?pretty" \
     -H 'Content-Type: application/json' -d '
   {
     "query": { "term": { "package.name": "python3-pip" } },
     "_source": [ "wazuh.agent.name", "package.name", "package.version" ]
   }'

**4. Result (excerpt)**

.. code-block:: json
   :emphasize-lines: 7

   "hits": [
     {
       "_index": "wazuh-states-inventory-packages",
       "_source": {
         "wazuh": { "agent": { "name": "Ubuntu" } },
         "package": {
           "name": "python3-pip",
           "version": "24.0+dfsg-1ubuntu1.3"
         }
       }
     }
   ]

.. note::

   -  ``event.action: vulnerability-detected`` keeps the rule from also firing on ``vulnerability-resolved`` events, which Wazuh sends when the package is removed or updated.
   -  ``term`` queries are case-sensitive. Use the package name exactly as the inventory reports it.


``wazuh-states-inventory-browser-extensions``
---------------------------------------------

Browser extensions installed in each browser profile.

.. wcs-field-tables:: stateful/inventory/browser-extensions
   :single-table:

``wazuh-states-inventory-groups``
---------------------------------

Operating system user groups.

.. wcs-field-tables:: stateful/inventory/groups
   :single-table:

``wazuh-states-inventory-hardware``
-----------------------------------

CPU, memory, and serial number of the endpoint.

.. wcs-field-tables:: stateful/inventory/hardware
   :single-table:

``wazuh-states-inventory-hotfixes``
-----------------------------------

Installed Windows updates (hotfixes).

.. wcs-field-tables:: stateful/inventory/hotfixes
   :single-table:

``wazuh-states-inventory-interfaces``
-------------------------------------

Network interfaces, with their state and traffic counters.

.. wcs-field-tables:: stateful/inventory/interfaces
   :single-table:

``wazuh-states-inventory-networks``
-----------------------------------

IP addresses, netmasks, and broadcast addresses of the network interfaces.

.. wcs-field-tables:: stateful/inventory/networks
   :single-table:

``wazuh-states-inventory-packages``
-----------------------------------

Installed packages and applications.

.. wcs-field-tables:: stateful/inventory/packages
   :single-table:

``wazuh-states-inventory-ports``
--------------------------------

Open ports and the processes that use them.

.. wcs-field-tables:: stateful/inventory/ports
   :single-table:

``wazuh-states-inventory-processes``
------------------------------------

Running processes.

.. wcs-field-tables:: stateful/inventory/processes
   :single-table:

``wazuh-states-inventory-protocols``
------------------------------------

Network protocol settings of the interfaces, such as DHCP and the gateway.

.. wcs-field-tables:: stateful/inventory/protocols
   :single-table:

``wazuh-states-inventory-services``
-----------------------------------

System services.

.. wcs-field-tables:: stateful/inventory/services
   :single-table:

``wazuh-states-inventory-system``
---------------------------------

Operating system and host details.

.. wcs-field-tables:: stateful/inventory/system
   :single-table:

``wazuh-states-inventory-users``
--------------------------------

Operating system user accounts.

.. wcs-field-tables:: stateful/inventory/users
   :single-table:
