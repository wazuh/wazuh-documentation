.. _index:

Welcome to Wazuh documentation
===============================

Here you will find instructions to install and deploy Wazuh HIDS, both the `official version <http://github.com/ossec/ossec-hids>`_ and `our forked one <http://github.com/wazuh/ossec-wazuh>`_. Please note that this documentation is not intended to substitute OSSEC HIDS `documentation <http://ossec.github.io/docs/>`_, or the `reference manual <http://ossec.github.io/docs/manual/index.html>`_, which are currently maintained by the project `team members <http://ossec.github.io/about.html#ossec-team>`_ and external contributors.

Wazuh team is currently supporting OSSEC enterprise users, and decided to develop and publish additional capabilities as a way to contribute back to the Open Source community. Find below a list and description of our main projects, that have been released under the terms of `GPLv2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_ license.

+ :ref:`OSSEC Wazuh Ruleset <ossec_ruleset>`: Includes new rootchecks, decoders and rules, increasing OSSEC monitoring and detection capabilities. Those have also been tagged for PCI Data Security Standard, allowing users to monitor compliance for each of the standard requirements. Users can contribute to this ruleset by submitting pull requests to our `Github repository <https://github.com/wazuh/ossec-rules>`_. Our team will continue to maintain and update it periodically.

- :ref:`Wazuh HIDS <wazuh_installation>`: Our OSSEC fork. Implements bug fixes and new features. It provides extended JSON logging capabilities, for easy :ref:`integration with ELK Stack <ossec_elk>` and third party log management tools. It also includes compliance support, and modifications in OSSEC binaries needed by the :ref:`OSSEC RESTful API <ossec_api>`.

+ :ref:`Wazuh RESTful API <ossec_api>`: Used to monitor and control your OSSEC deployment, providing an interface to interact with the manager from anything that can send an HTTP request.

- :ref:`Pre-compiled installation packages <ossec_installation>`, both for OSSEC agent and manager: Including repositories for RedHat, CentOS, Fedora, Debian, Ubuntu and Windows.

+ :ref:`Puppet scripts <ossec_puppet>` for automatic OSSEC deployment and configuration.

- :ref:`Docker containers <ossec_docker>` to virtualize and run your OSSEC manager and an all-in-one integration with ELK Stack.

+ :ref:`Splunk for Wazuh app <ossec_splunk>` to manage and visualize Wazuh OSSEC data through Splunk.

- :ref:`Wazuh plugin for Kibana <wazuh_kibana>` for easy and complete management of Wazuh OSSEC HIDS through Kibana.

.. note:: If you want to contribute to this documentation or our projects please head over to our `Github repositories <https://github.com/wazuh>`_. You can also join our `users mailing list <https://groups.google.com/d/forum/wazuh>`_, by sending an email to ``wazuh+subscribe@googlegroups.com``, to ask questions and participate in discussions.

.. toctree::
   :maxdepth: 2

   about
   wazuh_installation
   ossec_api
   ossec_elk
   management_monitoring
   ossec_pci_dss
   ossec_amazon
   wazuh_modules_openscap
   wazuh_modules_virustotal
   deployment

   ossec_reference
   ossec_ruleset
