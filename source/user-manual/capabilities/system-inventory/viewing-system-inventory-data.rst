.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: You can query and visualize centralized system inventory data from all monitored endpoints in the **IT Hygiene** section on the Wazuh dashboard. Learn more about it in this section of the Wazuh documentation.

Viewing system inventory data
=============================

You can query and visualize centralized system inventory data from all monitored endpoints in the **IT Hygiene** section on the Wazuh dashboard. This provides a unified view of your environment's status across all monitored endpoints.

The IT Hygiene section organizes data into multiple categories:

-  **Dashboard**: View an overview of key metrics and a summary of your environment.
-  **System**: Analyze operating system and hardware information.
-  **Software**: Review installed packages and software vendors.
-  **Processes**: Monitor running processes.
-  **Network**: Inspect network configurations, interfaces, and traffic.
-  **Identity**: View users and groups.
-  **Services**: Analyze services related information.

To access the IT hygiene section, navigate to **Security operations** > **IT Hygiene** on the Wazuh dashboard.

Dashboard
---------

Shows a consolidated view of the system inventory data across multiple or selected monitored endpoints. It visualizes key metrics such as operating system families, package types, installed packages, running packages, operating systems, host CPUs, source ports, and process start times.

.. thumbnail:: /images/manual/system-inventory/system-inventory-dashboard.png
   :title: System inventory dashboard
   :alt: System inventory dashboard
   :align: center
   :width: 80%

System
------

Provides a detailed breakdown of the operating systems and hardware in your environment.

-  The **OS** tab provides an operating system and hardware information breakdown across all monitored endpoints.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-system-os-tab.png
      :title: System inventory - System OS tab
      :alt: System inventory - System OS tab
      :align: center
      :width: 80%

-  The **Hardware** tab displays top CPU models, CPU cores, the most used memory, and a summary data table.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-system-hardware-tab.png
      :title: System inventory - System Hardware tab
      :alt: System inventory - System Hardware tab
      :align: center
      :width: 80%

Software
--------

Contains an overview of software packages, Windows KBs and browser extensions on monitored endpoints.

-  The **Packages** tab displays package data, including top software vendors, the number of installed packages, the types of packages, and a summary data table.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-software-packages-tab.png
      :title: System inventory - Software Packages tab
      :alt: System inventory - Software Packages tab
      :align: center
      :width: 80%

-  The **Windows KBs** tab displays the Windows Knowledge Base data, including the most and least common Knowledge Bases.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-software-windows-kbs-tab.png
      :title: System inventory - Software Windows KBs tab
      :alt: System inventory - Software Windows KBs tab
      :align: center
      :width: 80%
      
-  The **Browser extensions** tab displays top browsers and packages, and a summary data table containing the browser and extension details.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-browser-extension.png
      :title: System inventory - Software Windows KBs tab
      :alt: System inventory - Software Windows KBs tab
      :align: center
      :width: 80%

Processes
---------

Displays running processes, process start times, and a summary data table containing process details for the monitored endpoints.

.. thumbnail:: /images/manual/system-inventory/system-inventory-processes.png
   :title: System inventory - Processes
   :alt: System inventory - Processes
   :align: center
   :width: 80%

Network
-------

Contains the **Addresses**, **Interfaces**, **Protocols**, **Services**, and **Traffic** tabs.

-  The **Addresses** tab provides a detailed view of network types, unique network IP addresses, interface names, and a summary data table containing detailed network address information.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-network-addresses-tab.png
      :title: System inventory - Network Addresses tab
      :alt: System inventory - Network Addresses tab
      :align: center
      :width: 80%

-  The **Interfaces** tab offers a detailed view of network interfaces, displaying average packet loss, interface states, interface types, and a summary data table of interface-level details.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-network-interfaces-tab.png
      :title: System inventory - Network Interfaces tab
      :alt: System inventory - Network Interfaces tab
      :align: center
      :width: 80%

-  The **Protocols** tab offers a detailed view of network types, network metrics, and DHCP status, and a summary table with more protocol-level details.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-network-protocols-tab.png
      :title: System inventory - Network Protocols tab
      :alt: System inventory - Network Protocols tab
      :align: center
      :width: 80%

-  The **Services** tab presents a detailed view of source ports, transport protocols, processes, and a summary data table for each endpoint.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-network-services-tab.png
      :title: System inventory - Network Services tab
      :alt: System inventory - Network Services tab
      :align: center
      :width: 80%

-  The **Traffic** tab provides a detailed view of active listening ports, including source ports, destination ports, transport protocols, processes, and a summary data table for each endpoint.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-network-traffic-tab.png
      :title: System inventory - Network Traffic tab
      :alt: System inventory - Network Traffic tab
      :align: center
      :width: 80%

Identity
--------

Provides a detailed breakdown of the users and groups in your environment.

-  The **Users** tab displays user account information, including top users, user groups, user shells and a summary data table.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-identity-users-tab.png
      :title: System inventory - Identity Users tab
      :alt: System inventory - Identity Users tab
      :align: center
      :width: 80%

-  The **Groups** tab displays information about the user account groups, including top groups, the number of unique groups and a summary data table.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-identity-groups-tab.png
      :title: System inventory - Identity Groups tab
      :alt: System inventory - Identity Groups tab
      :align: center
      :width: 80%

Services
--------

Displays top running services, total unique services and a summary data containing service details for the monitored endpoints.

.. thumbnail:: /images/manual/system-inventory/system-inventory-services.png
   :title: System inventory - Services
   :alt: System inventory - Services
   :align: center
   :width: 80%

Query the agent inventory data
------------------------------

The Syscollector module runs periodic scans and sends the updated data in JSON format to the Wazuh server. The Wazuh server analyzes and stores this data in a separate database for each endpoint. The databases contain tables that store each type of system information. The system inventory databases on the Wazuh server are then processed and forwarded to the Wazuh indexer, where it is stored as the global state data. You can query the system inventory data for specific information using the Wazuh indexer API, Wazuh server API, or the ``SQLite`` tool.

Using the Wazuh indexer API
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The :doc:`Wazuh indexer API </user-manual/indexer-api/index>` enables you to perform actions such as adding new indices, querying existing indices, and modifying the Wazuh indexer settings. It can retrieve system inventory data from global state indices for selected or multiple monitored endpoints and display it in a human‑readable format. You can perform these queries through the Wazuh indexer API interface on the dashboard or by using command‑line tools such as ``cURL``.

Wazuh indexer API GUI
~~~~~~~~~~~~~~~~~~~~~

Follow these steps to access the Wazuh indexer API from the Wazuh dashboard.

#. On the Wazuh dashboard, click the hamburger icon from the top left side and navigate to **Indexer management** > **Dev Tools**.

   .. thumbnail:: /images/manual/system-inventory/dev-tools.png
      :title: Indexer management > Dev Tools
      :alt: Indexer management > Dev Tools
      :align: center
      :width: 80%

#. Type the following command in the console and click the play icon to run the query:

   .. code-block:: none

      GET /_cat/indices/wazuh-states-inventory-*?v

   The command retrieves information about the system inventory indices

   .. thumbnail:: /images/manual/system-inventory/get-states-inventory-indices.png
      :title: Get inventory indices
      :alt: Get inventory indices
      :align: center
      :width: 80%

#. Use the command below to query the system inventory index for installed packages within your infrastructure. After typing, click the **play** icon to run the query.

   .. code-block:: none

      GET /wazuh-states-inventory-packages-*/_search?pretty

   .. thumbnail:: /images/manual/system-inventory/get-inventory-packages.png
      :title: Get inventory packages
      :alt: Get inventory packages
      :align: center
      :width: 80%

#. You can query the system inventory index to look up specific details, such as whether a particular package is installed on any monitored endpoints. For example, the following command checks the package inventory for the presence of the ``wazuh-agent`` package.

   .. code-block:: none

      GET /wazuh-states-inventory-packages-*/_search?pretty
      {
        "query": {
          "match": {
            "package.name": "wazuh-agent"
          }
        }
      }

   .. thumbnail:: /images/manual/system-inventory/look-up-inventory-packages.png
      :title: Look up inventory packages
      :alt: Look up inventory packages
      :align: center
      :width: 80%

#. Furthermore, you can check whether a package is installed on a specific endpoint. In the command below, we check if the Wazuh agent is installed on a Windows endpoint. Replace ``<AGENT_NAME>`` with the name of the Wazuh endpoint.

   .. code-block:: console

      GET /wazuh-states-inventory-packages-*/_search?pretty
      {
        "query": {
          "bool": {
            "must": [
              { "term": { "agent.name": "<AGENT_NAME>" }},
              { "match": { "package.name": "Wazuh Agent" }}
            ]
          }
        }
      }

   .. thumbnail:: /images/manual/system-inventory/look-up-inventory-packages-on-endpoint.png
      :title: Look up inventory packages
      :alt: Look up inventory packages
      :align: center
      :width: 80%

cURL
~~~~

Follow the steps below to query the system inventory indices from the command line using ``cURL``.

#. Run the command below to retrieve information about the system inventory indices. Replace ``<WAZUH_INDEXER_USERNAME>`` with the Wazuh indexer username and type the Wazuh indexer password when prompted:

   .. code-block:: console

      # curl -k -u "<WAZUH_INDEXER_USERNAME>" https://<WAZUH_INDEXER_IP>:9200/_cat/indices/wazuh-states-inventory-*?v

   .. code-block:: none
      :class: output

      health status index                                                           uuid                   pri rep docs.count docs.deleted store.size pri.store.size
      green  open   wazuh-states-inventory-hotfixes-localhost.localdomain           0VISw7egSCOqS4_iW6lF-A   1   0         24            0      7.5kb          7.5kb
      green  open   wazuh-states-inventory-networks-localhost.localdomain           2VeQaHbKQGyGAw-zsBBG-Q   1   0          6            0       17kb           17kb
      green  open   wazuh-states-inventory-services-localhost.localdomain           8ZMbiB4eSvmQXxFhBOF3Wg   1   0        860            4    469.7kb        469.7kb
      green  open   wazuh-states-inventory-users-localhost.localdomain              Gj_vVwsORSW75SSNHRLo5A   1   0         60            1     89.2kb         89.2kb
      green  open   wazuh-states-inventory-browser-extensions-localhost.localdomain lmd4L0CKQVSZ6MkHPggKOg   1   0         22            0     56.7kb         56.7kb
      green  open   wazuh-states-inventory-system-localhost.localdomain             1KLOw7tZTc2mrLXigyAgOA   1   0          2            0     18.5kb         18.5kb
      green  open   wazuh-states-inventory-interfaces-localhost.localdomain         26kqFEdaQT6zLXCexqOm2g   1   0          3            0       21kb           21kb
      green  open   wazuh-states-inventory-packages-localhost.localdomain           OKQau-AmQd2XYKtMTbIiAA   1   0       1576           18    522.3kb        522.3kb
      green  open   wazuh-states-inventory-groups-localhost.localdomain             mKSYvXZ3QgWyP4gK3xymlA   1   0        101            0       62kb           62kb
      green  open   wazuh-states-inventory-ports-localhost.localdomain              GG3ZzWV8SbaLFmCDOymy8A   1   0        104            9     56.4kb         56.4kb
      green  open   wazuh-states-inventory-hardware-localhost.localdomain           pHS7eI08QAW7oEiDLSO2LA   1   0          2            0     16.1kb         16.1kb
      green  open   wazuh-states-inventory-protocols-localhost.localdomain          55hrDEMMTIS9UzzteTjnBQ   1   0          6            0     16.2kb         16.2kb
      green  open   wazuh-states-inventory-processes-localhost.localdomain          G-vbdw1WRsaRmNdoqqcaqQ   1   0        528          100    138.7kb        138.7kb

#. Use the command below to query the system inventory index for the packages on the endpoints. Replace ``<WAZUH_INDEXER_USERNAME>`` with the Wazuh indexer username and type the Wazuh indexer password when prompted.

   .. code-block:: console

      # curl -k -u "<WAZUH_INDEXER_USERNAME>" https://<WAZUH_INDEXER_IP>:9200/wazuh-states-inventory-packages-*/_search?pretty

   .. code-block:: none
      :class: output

      {
        "took" : 1,
        "timed_out" : false,
        "_shards" : {
          "total" : 1,
          "successful" : 1,
          "skipped" : 0,
          "failed" : 0
        },
        "hits" : {
          "total" : {
            "value" : 1585,
            "relation" : "eq"
          },
          "max_score" : 1.0,
          "hits" : [
            {
              "_index" : "wazuh-states-inventory-packages-wazuh-vmware-virtual-platform",
              "_id" : "006_041f8e6a4f5473b6ad05a32d8cbcc6fba389cabb",
              "_score" : 1.0,
              "_source" : {
                "agent" : {
                  "id" : "006",
                  "name" : "Cent_Stream",
                  "version" : "v4.14.0"
                },
                "package" : {
                  "architecture" : "x86_64",
                  "description" : "A library that wraps other spell checking backends.",
                  "installed" : "2025-06-30T19:18:17.000Z",
                  "name" : "enchant2",
                  "size" : 167594,
                  "type" : "rpm",
                  "vendor" : "CentOS",
                  "version" : "2.2.15-6.el9"
                },
                "wazuh" : {
                  "cluster" : {
                    "name" : "wazuh-VMware-Virtual-Platform"
                  },
                  "schema" : {
                    "version" : "1.0"
                  }
                }
              }
            },
            {
              "_index" : "wazuh-states-inventory-packages-wazuh-vmware-virtual-platform",
              "_id" : "006_044fc408c207df2320ea52d29231919b2616f4ce",
              "_score" : 1.0,
              "_source" : {
                "agent" : {
                  "id" : "006",
                  "name" : "Cent_Stream",
                  "version" : "v4.14.0"
                },
                "package" : {
                  "architecture" : "x86_64",
                  "description" : "The ATK library provides a set of interfaces for adding accessibility\nsupport to applications and graphical user interface toolkits. By\nsupporting the ATK interfaces, an application or toolkit can be used\nwith tools such as screen readers, magnifiers, and alternative input\ndevices.",
                  "installed" : "2025-06-30T19:18:17.000Z",
                  "name" : "atk",
                  "size" : 1304627,
                  "type" : "rpm",
                  "vendor" : "CentOS",
                  "version" : "2.36.0-5.el9"
                },
                "wazuh" : {
                  "cluster" : {
                    "name" : "wazuh-VMware-Virtual-Platform"
                  },
                  "schema" : {
                    "version" : "1.0"
                  }
                }
              }
            },
            {
              "_index" : "wazuh-states-inventory-packages-wazuh-vmware-virtual-platform",
              "_id" : "006_045d1c99dc4f5c48377352432af35e0cd2c2451c",
              "_score" : 1.0,
              "_source" : {
                "agent" : {
                  "id" : "006",
                  "name" : "Cent_Stream",
                  "version" : "v4.14.0"
                },
                "package" : {
                  "architecture" : "x86_64",
                  "description" : "A backend implementation for xdg-desktop-portal that is using various pieces of\nGNOME infrastructure, such as the org.gnome.Shell.Screenshot or\norg.gnome.SessionManager D-Bus interfaces.",
                  "installed" : "2025-06-30T19:31:26.000Z",
                  "name" : "xdg-desktop-portal-gnome",
                  "size" : 568978,
                  "type" : "rpm",
                  "vendor" : "CentOS",
                  "version" : "41.2-3.el9"
                },
                "wazuh" : {
                  "cluster" : {
                    "name" : "wazuh-VMware-Virtual-Platform"
                  },
                  "schema" : {
                    "version" : "1.0"
                  }
                }
              }
            },
            {
              "_index" : "wazuh-states-inventory-packages-wazuh-vmware-virtual-platform",
              "_id" : "006_0467d452f839f61a318267d502b6c81154316e40",
              "_score" : 1.0,
              "_source" : {
                "agent" : {
                  "id" : "006",
                  "name" : "Cent_Stream",
                  "version" : "v4.14.0"
                },
                "package" : {
                  "architecture" : "x86_64",
                  "description" : "This package contains the shared library for sqlite.",
                  "installed" : "2025-06-30T19:30:06.000Z",
                  "name" : "sqlite-libs",
                  "size" : 1368872,
                  "type" : "rpm",
                  "vendor" : "CentOS",
                  "version" : "3.34.1-8.el9"
                },
                "wazuh" : {
                  "cluster" : {
                    "name" : "wazuh-VMware-Virtual-Platform"
                  },
                  "schema" : {
                    "version" : "1.0"
                  }
                }
              }
            },
            {
              "_index" : "wazuh-states-inventory-packages-wazuh-vmware-virtual-platform",
              "_id" : "006_0480a23ae60e573ec6b243b3a6068723fda63ee2",
              "_score" : 1.0,
              "_source" : {
                "agent" : {
                  "id" : "006",
                  "name" : "Cent_Stream",
                  "version" : "v4.14.0"
                },
                "package" : {
                  "architecture" : "x86_64",
                  "description" : "Cheese is a Photobooth-inspired GNOME application for taking pictures and\nvideos from a webcam. It can also apply fancy graphical effects.",
                  "installed" : "2025-06-30T19:19:07.000Z",
                  "name" : "cheese",
                  "size" : 378533,
                  "type" : "rpm",
                  "vendor" : "CentOS",
                  "version" : "2:3.38.0-6.el9"
                },
                "wazuh" : {
                  "cluster" : {
                    "name" : "wazuh-VMware-Virtual-Platform"
                  },
                  "schema" : {
                    "version" : "1.0"
                  }
                }
              }
            },
            {
              "_index" : "wazuh-states-inventory-packages-wazuh-vmware-virtual-platform",
              "_id" : "006_048923b45c38753ce27dc4346d16612a6e9fa6bc",
              "_score" : 1.0,
              "_source" : {
                "agent" : {
                  "id" : "006",
                  "name" : "Cent_Stream",
                  "version" : "v4.14.0"
                },
                "package" : {
                  "architecture" : "x86_64",
                  "description" : "The filesystem package is one of the basic packages that is installed\non a Linux system. Filesystem contains the basic directory layout\nfor a Linux operating system, including the correct permissions for\nthe directories.",
                  "installed" : "2025-06-30T19:30:05.000Z",
                  "name" : "filesystem",
                  "size" : 106,
                  "type" : "rpm",
                  "vendor" : "CentOS",
                  "version" : "3.16-5.el9"
                },
                "wazuh" : {
                  "cluster" : {
                    "name" : "wazuh-VMware-Virtual-Platform"
                  },
                  "schema" : {
                    "version" : "1.0"
                  }
                }
              }
            },
            {
              "_index" : "wazuh-states-inventory-packages-wazuh-vmware-virtual-platform",
              "_id" : "006_04c8813e7928463fee47e0006c90e16e5d924ca6",
              "_score" : 1.0,
              "_source" : {
                "agent" : {
                  "id" : "006",
                  "name" : "Cent_Stream",
                  "version" : "v4.14.0"
                },
                "package" : {
                  "architecture" : "x86_64",
                  "description" : "The POSIX module permits you to access all (or nearly all) the standard POSIX\n1003.1 identifiers. Many of these identifiers have been given Perl interfaces.",
                  "installed" : "2025-07-17T14:42:06.000Z",
                  "name" : "perl-POSIX",
                  "size" : 240020,
                  "type" : "rpm",
                  "vendor" : "CentOS",
                  "version" : "1.94-483.el9"
                },
                "wazuh" : {
                  "cluster" : {
                    "name" : "wazuh-VMware-Virtual-Platform"
                  },
                  "schema" : {
                    "version" : "1.0"
                  }
                }
              }
            },
            {
              "_index" : "wazuh-states-inventory-packages-wazuh-vmware-virtual-platform",
              "_id" : "006_0507d1d203a41466eddaf4e8ea773427f6137e4b",
              "_score" : 1.0,
              "_source" : {
                "agent" : {
                  "id" : "006",
                  "name" : "Cent_Stream",
                  "version" : "v4.14.0"
                },
                "package" : {
                  "architecture" : "x86_64",
                  "description" : "A library to handle bidirectional scripts (for example Hebrew, Arabic),\nso that the display is done in the proper way; while the text data itself\nis always written in logical order.",
                  "installed" : "2025-06-30T19:18:13.000Z",
                  "name" : "fribidi",
                  "size" : 347380,
                  "type" : "rpm",
                  "vendor" : "CentOS",
                  "version" : "1.0.10-6.el9.2"
                },
                "wazuh" : {
                  "cluster" : {
                    "name" : "wazuh-VMware-Virtual-Platform"
                  },
                  "schema" : {
                    "version" : "1.0"
                  }
                }
              }
            },
            {
              "_index" : "wazuh-states-inventory-packages-wazuh-vmware-virtual-platform",
              "_id" : "006_050946eb0960e99615ecf95988f96aa67b278099",
              "_score" : 1.0,
              "_source" : {
                "agent" : {
                  "id" : "006",
                  "name" : "Cent_Stream",
                  "version" : "v4.14.0"
                },
                "package" : {
                  "architecture" : "x86_64",
                  "description" : "lxml is a Pythonic, mature binding for the libxml2 and libxslt libraries. It\nprovides safe and convenient access to these libraries using the ElementTree It\nextends the ElementTree API significantly to offer support for XPath, RelaxNG,\nXML Schema, XSLT, C14N and much more.To contact the project, go to the project\nhome page < or see our bug tracker at case you want to use the current ...\n\nPython 3 version.",
                  "installed" : "2025-06-30T19:18:20.000Z",
                  "name" : "python3-lxml",
                  "size" : 4351883,
                  "type" : "rpm",
                  "vendor" : "CentOS",
                  "version" : "4.6.5-3.el9"
                },
                "wazuh" : {
                  "cluster" : {
                    "name" : "wazuh-VMware-Virtual-Platform"
                  },
                  "schema" : {
                    "version" : "1.0"
                  }
                }
              }
            },
            {
              "_index" : "wazuh-states-inventory-packages-wazuh-vmware-virtual-platform",
              "_id" : "006_054268e7568db7e74481fec3f76cabba9612d810",
              "_score" : 1.0,
              "_source" : {
                "agent" : {
                  "id" : "006",
                  "name" : "Cent_Stream",
                  "version" : "v4.14.0"
                },
                "package" : {
                  "architecture" : "noarch",
                  "description" : "Python3 bindings for firewalld.",
                  "installed" : "2025-06-30T19:30:16.000Z",
                  "name" : "python3-firewall",
                  "size" : 2193288,
                  "type" : "rpm",
                  "vendor" : "CentOS",
                  "version" : "1.3.4-9.el9"
                },
                "wazuh" : {
                  "cluster" : {
                    "name" : "wazuh-VMware-Virtual-Platform"
                  },
                  "schema" : {
                    "version" : "1.0"
                  }
                }
              }
            }
          ]
        }
      }

#. You can query the system inventory index to look up specific details, such as whether a particular package is installed on any monitored endpoints. For example, the following command checks the package inventory for the presence of the ``wazuh-agent`` package. Replace ``<WAZUH_INDEXER_USERNAME>`` with the Wazuh indexer username and type the Wazuh indexer password when prompted:

   .. code-block:: bash

      curl -k -u "<WAZUH_INDEXER_USERNAME>" "https://<WAZUH_INDEXER_IP>:9200/wazuh-states-inventory-packages-*/_search?pretty" \
      -H 'Content-Type: application/json' \
      -d '{
        "query": {
          "term": {
            "package.name": "wazuh-agent"
          }
        }
      }'

   .. code-block:: none
      :class: output

      {
        "took" : 1,
        "timed_out" : false,
        "_shards" : {
          "total" : 1,
          "successful" : 1,
          "skipped" : 0,
          "failed" : 0
        },
        "hits" : {
          "total" : {
            "value" : 1,
            "relation" : "eq"
          },
          "max_score" : 6.9660244,
          "hits" : [
            {
              "_index" : "wazuh-states-inventory-packages-wazuh-vmware-virtual-platform",
              "_id" : "006_1cdcea1b59fb2fd59b3de004d393bcbcfea352ee",
              "_score" : 6.9660244,
              "_source" : {
                "agent" : {
                  "id" : "006",
                  "name" : "Cent_Stream",
                  "version" : "v4.14.0"
                },
                "package" : {
                  "architecture" : "x86_64",
                  "description" : "Wazuh helps you to gain security visibility into your infrastructure by monitoring\nhosts at an operating system and application level. It provides the following capabilities:\nlog analysis, file integrity monitoring, intrusions detection and policy and compliance monitoring",
                  "installed" : "2025-09-12T18:04:48.000Z",
                  "name" : "wazuh-agent",
                  "size" : 31169915,
                  "type" : "rpm",
                  "vendor" : "Wazuh",
                  "version" : "4.13.0-1"
                },
                "wazuh" : {
                  "cluster" : {
                    "name" : "wazuh-VMware-Virtual-Platform"
                  },
                  "schema" : {
                    "version" : "1.0"
                  }
                }
              }
            }
          ]
        }
      }

#. Furthermore, you can check whether a package is installed on a specific endpoint. In the command below, we check if the Wazuh agent is installed on a Windows endpoint. Replace ``<WAZUH_INDEXER_USERNAME>`` with the Wazuh indexer username, ``<AGENT_NAME>`` with the name of the Wazuh endpoint, and type the Wazuh indexer password when prompted.

   .. code-block:: bash

      curl -k -u "<WAZUH_INDEXER_USERNAME>" "https://<WAZUH_INDEXER_IP>:9200/wazuh-states-inventory-packages-*/_search?pretty" \
      -H 'Content-Type: application/json' \
      -d '{
        "query": {
          "bool": {
            "must": [
              { "term": { "agent.name": "Windows-11" }},
              { "match": { "package.name": "Wazuh Agent" }}
            ]
          }
        }
      }'

   .. code-block:: none
      :class: output

      {
        "took" : 2,
        "timed_out" : false,
        "_shards" : {
          "total" : 1,
          "successful" : 1,
          "skipped" : 0,
          "failed" : 0
        },
        "hits" : {
          "total" : {
            "value" : 1,
            "relation" : "eq"
          },
          "max_score" : 10.26218,
          "hits" : [
            {
              "_index" : "wazuh-states-inventory-packages-wazuh-vmware-virtual-platform",
              "_id" : "005_717e026c55c0e6b98d7a00d73963ca70cba8609f",
              "_score" : 10.26218,
              "_source" : {
                "agent" : {
                  "id" : "005",
                  "name" : "Windows-11",
                  "version" : "v4.14.0"
                },
                "package" : {
                  "architecture" : "i686",
                  "name" : "Wazuh Agent",
                  "size" : 0,
                  "type" : "win",
                  "vendor" : "Wazuh",
                  "version" : "4.13.0"
                },
                "wazuh" : {
                  "cluster" : {
                    "name" : "wazuh-VMware-Virtual-Platform"
                  },
                  "schema" : {
                    "version" : "1.0"
                  }
                }
              }
            }
          ]
        }
      }

Using the Wazuh server API
^^^^^^^^^^^^^^^^^^^^^^^^^^

You can query the Wazuh inventory data using the `Wazuh server API <https://documentation.wazuh.com/current/user-manual/api/reference.html#tag/Syscollector>`__, which retrieves nested data in JSON format. You can use the Wazuh server API GUI on the dashboard or a command-line tool like ``cURL`` to query the inventory database of a Wazuh agent.

Wazuh server API GUI
~~~~~~~~~~~~~~~~~~~~

On the Wazuh dashboard, navigate to **Wazuh** > **Tools** > **API Console**. On the **Console**, type the following:

.. code-block:: none

   GET /syscollector/<AGENT_ID>/

Where ``<AGENT_ID>`` corresponds to the agent ID of the endpoint.

The Wazuh dashboard will suggest a list of available tables that you can query via the API.

.. thumbnail:: /images/manual/system-inventory/api-console.png
   :title: Server management > Dev Tools
   :alt: Server management > Dev Tools
   :align: center
   :width: 80%

For example, you can use the command ``GET /syscollector/<AGENT_ID>/packages`` to query the inventory data for installed packages on the endpoint. After typing, click the **play** icon to run the query.

Furthermore, you can query the inventory data for specific information about any property. For example, the command below queries the package inventory to check for the ``wazuh-agent`` package:

.. code-block:: none

   GET /syscollector/<AGENT_ID>/packages?pretty=true&name=wazuh-agent

Where:

-  ``packages`` reference the package table in the inventory database, which stores information about the currently installed software on an endpoint. You can reference the table of your interest.
-  ``name=wazuh-agent`` specifies the ``wazuh-agent`` package name. You can use different properties and values.
-  ``pretty=true`` ensures the output is properly formatted and easy to read.

.. thumbnail:: /images/manual/system-inventory/query-the-inventory-data.png
   :title: Query the inventory data
   :alt: Query the inventory data
   :align: center
   :width: 80%

.. _inventory_wazuh_api_curl:

cURL
~~~~

Follow the steps below to query the system inventory indices from the command line using ``cURL``:

- Generate a JSON Web Token (JWT) for authenticating to the Wazuh server by running the following command. Enter the Wazuh server API password when prompted:

   .. code-block:: console

      TOKEN=$(curl -u <USER> -k -X GET "https://<WAZUH_SERVER_IP>:55000/security/user/authenticate?raw=true")

   Where:

   -  ``<USER>`` is the Wazuh server API username. The default username is ``wazuh``.
   -  ``<WAZUH_SERVER_IP>`` is the Wazuh server IP address.

   Run the command ``echo $TOKEN`` to confirm that you successfully generated the token. The output should be like this:

   .. code-block:: console
      :class: output

      eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNjQzMDExMjQ0LCJleHAiOjE2NDMwMTIxNDQsInN1YiI6IndhenVoIiwicnVuX2FzIjpmYWxzZSwicmJhY19yb2xlcyI6WzFdLCJyYmFjX21vZGUiOiJ3aGl0ZSJ9.Ad6zOZvx0BEV7K0J6s3pIXAXTWB-zdVfxaX2fotLfZMQkiYPMkwDaQHUFiOInsWJ_7KZV3y2BbhEs9-kBqlJAMvMAD0NDBPhEQ2qBd_iutZ7QWZECd6eYfIP83xGqH9iqS7uMI6fXOKr3w4aFV13Q6qsHSUQ1A-1LgDnnDGGaqF5ITYo

- Query the endpoint information of interest using a command which takes the following format:

   .. code-block:: console

      curl -k -X GET "https://<WAZUH_SERVER_IP>:55000/syscollector/<AGENT_ID>/<SYSCOLLECTOR_PROPERTY>?pretty=true" -H "Authorization: Bearer $TOKEN"

   For example, to retrieve information about the applications installed on an endpoint with agent ID of ``010``, the command will be:

   .. code-block:: console

      curl -k -X GET "https://<WAZUH_SERVER_IP>:55000/syscollector/010/packages?pretty=true" -H  "Authorization: Bearer $TOKEN"

   The other inventory properties are ``hardware``, ``hotfixes``, ``netaddr``, ``netiface``, ``netproto``, ``os``, ``ports``, and ``processes``. These all correspond to the tables in the :doc:`inventory database </user-manual/capabilities/system-inventory/available-inventory-fields>`. You can learn more about these options in our `API documentation <https://documentation.wazuh.com/current/user-manual/api/reference.html#tag/Syscollector>`_.

   .. code-block:: console
      :class: output

      {
         "data": {
            "affected_items": [
               {
                  "scan": {
                     "id": 0,
                     "time": "2022-09-27T09:16:45+00:00"
                  },
                  "priority": "optional",
                  "multiarch": "foreign",
                  "format": "deb",
                  "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
                  "size": 12219,
                  "version": "0.4.9-2",
                  "description": "encoding data for the poppler PDF rendering library",
                  "section": "misc",
                  "name": "poppler-data",
                  "architecture": "all",
                  "agent_id": "010"
               },
               {
                  "scan": {
                     "id": 0,
                     "time": "2022-09-27T09:16:45+00:00"
                  },
                  "priority": "optional",
                  "multiarch": "foreign",
                  "format": "deb",
                  "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
                  "size": 31,
                  "version": "3.20-4",
                  "description": "data tables pertaining to HTML",
                  "section": "perl",
                  "name": "libhtml-tagset-perl",
                  "architecture": "all",
                  "agent_id": "010"
               },
               {
                  "scan": {
                     "id": 0,
                     "time": "2022-09-27T09:16:45+00:00"
                  },
                  "priority": "optional",
                  "multiarch": "same",
                  "format": "deb",
                  "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
                  "size": 426,
                  "version": "1.17-6ubuntu4.1",
                  "description": "MIT Kerberos runtime libraries - krb5 GSS-API Mechanism",
                  "section": "libs",
                  "source": "krb5",
                  "name": "libgssapi-krb5-2",
                  "architecture": "amd64",
                  "agent_id": "010"
               },
      …

   Furthermore, you can query the inventory data to find specific information about any property. For example, the command below queries the package inventory to check if the ``wazuh-agent`` package is present.

   .. code-block:: console

      curl -k -X GET "https://<WAZUH_SERVER_IP>:55000/syscollector/010/packages?pretty=true&name=wazuh-agent" -H  "Authorization: Bearer $TOKEN"

   .. code-block:: console
      :class: output
      :emphasize-lines: 9

      {
         "data": {
            "affected_items": [
               {
                  "scan": {
                     "id": 0,
                     "time": "2025-08-18T16:50:06+00:00"
                  },
                  "name": "wazuh-agent",
                  "section": "System Environment/Daemons",
                  "architecture": "x86_64",
                  "description": "Wazuh helps you to gain security visibility into your infrastructure by monitoring\nhosts at an operating system and application level. It provides the following capabilities:\nlog analysis, file integrity monitoring, intrusions detection and policy and compliance monitoring",
                  "location": " ",
                  "source": " ",
                  "format": "rpm",
                  "install_time": "1755535740",
                  "version": "4.12.0-1",
                  "size": 30461944,
                  "priority": " ",
                  "vendor": "Wazuh, Inc <info@wazuh.com>",
                  "agent_id": "010"
               }
            ],
            "total_affected_items": 1,
            "total_failed_items": 0,
            "failed_items": []
         },
         "message": "All specified syscollector information was returned",
         "error": 0
      }

Using SQLite
^^^^^^^^^^^^

The location of the database for each monitored endpoint is on the Wazuh server at ``/var/ossec/queue/db/``. You can query each database directly by following these steps.

#. If SQLite is not already installed, install it with this command:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            $ sudo apt install sqlite3

      .. group-tab:: YUM

         .. code-block:: console

            $ sudo yum install sqlite3

#. Use the command below to connect to the database of an endpoint:

   .. code-block:: console

      $ sqlite3 /var/ossec/queue/db/<AGENT_ID>.db

   Where ``<AGENT_ID>`` corresponds to the agent ID of the monitored endpoint.

   .. code-block:: none
      :class: output

      SQLite version 3.7.17 2013-05-20 00:56:22
      Enter ".help" for instructions
      Enter SQL statements terminated with a ";"
      sqlite>

After connecting to the database, you can query the list of tables in it using the command below:

.. code-block:: console

   sqlite>.tables

.. code-block:: none
   :class: output

   ciscat_results          sca_scan_info           sys_netiface
   fim_entry               scan_info               sys_netproto
   metadata                sync_info               sys_osinfo
   pm_event                sys_browser_extensions  sys_ports
   sca_check               sys_groups              sys_processes
   sca_check_compliance    sys_hotfixes            sys_programs
   sca_check_rules         sys_hwinfo              sys_services
   sca_policy              sys_netaddr             sys_users

You can further query the tables for any information you are interested in. For example, if you want to know if a particular software is present on an endpoint, you can query the ``sys_programs`` table using  ``sqlite>select * from sys_programs where name="<SOFTWARE_NAME>";``. The command below checks whether the ``wazuh-agent`` program is present on a monitored Linux endpoint and shows the captured details:

.. code-block:: console

   sqlite>select * from sys_programs where name="wazuh-agent";

.. code-block:: console
   :class: output

   0|2023/01/06 13:48:56|rpm|wazuh-agent||System Environment/Daemons|25988677|Wazuh, Inc <info@wazuh.com>|1673012221|4.3.10-1|x86_64|||Wazuh helps you to gain security visibility into your infrastructure by monitoring hosts at an operating system and application level. It provides the following capabilities: log analysis, file integrity monitoring, intrusions detection and policy and compliance monitoring||1|||1cf5a056a0ff5b6201939eba76ef68f6d860af36|5747279dac052d61c6d3ec87b475edddb84e9dd1







