OSSEC Wazuh documentation
=========================

About this documentation
------------------------

Welcome to OSSEC Wazuh documentation. Here you will find instructions to install and deploy OSSEC HIDS with Wazuh Open Source modules. Please note that this documentation is not intended to substitute OSSEC HIDS `documentation <http://ossec.github.io/docs/>`_, or the `reference manual <http://ossec.github.io/docs/manual/index.html>`_, which are currently maintained by the project `team members <http://ossec.github.io/about.html#ossec-team>`_ and external contributors.

Wazuh team is currently supporting OSSEC enterprise users, and decided to develop and publish additional modules as a way to contribute back to the Open Source community. Find below a list and description of these modules, that have been released under the terms of `GPLv2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_ license. 

+ OSSEC HIDS :ref:`Rule set <ossec_rule_set>`: Includes compliance mapping with PCI DSS v3.1, and additional decoders and rules. Users can contribute to this rule set by submitting pull requests to our `Github repository <https://github.com/wazuh/ossec-rules>`_. Our team will continue to maintain and update it periodically.

- OSSEC manager with extended JSON logging capabilities, for easy :ref:`integration with ELK Stack <ossec_elk>` and third party log management tools. This new format includes compliance support and modifications in OSSEC binaries needed by the :ref:`OSSEC RESTful API <ossec_api>`.
   
+ :ref:`OSSEC RESTful API <ossec_api>`: Used to monitor and control your OSSEC installation, providing an interface to interact with the manager from anything that can send an HTTP request.
   
- :ref:`Pre-compiled installation packages <ossec_installers>`, both for OSSEC agent and manager: Include repositories for RedHat, CentOS, Fedora, Debian, Ubuntu and Windows.
   
+ :ref:`Puppet scripts <ossec_puppet>` for automatic OSSEC deployment and configuration.
   
- :ref:`Docker containers <ossec_docker>` to virtualize and run your OSSEC manager and an all-in-one integration with ELK Stack.

.. note:: If you want to contribute to this documentation or our projects please head over to our `Github repositories <https://github.com/wazuh>`_. You can also join our `users mailing list <https://groups.google.com/d/forum/wazuh>`_, by sending an email to wazuh+subscribe@googlegroups.com, to ask questions and participate in discussions.  

Table of contents:
------------------

.. toctree::
   :maxdepth: 2

   ossecwazuh
   ossec
   ossec_rule_set
   basicconfiguration
   docker
   puppet   
   readme
