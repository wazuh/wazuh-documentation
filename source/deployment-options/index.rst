.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can install Wazuh using different deployment options. Learn more about Wazuh installation alternatives in this section of the Wazuh documentation.

Installation alternatives
=========================

You can install Wazuh using other deployment options. These are complementary to the installation methods you can find in the  :doc:`/installation-guide/index` and the :doc:`/quickstart`.

Installing the Wazuh central components
---------------------------------------

All the alternatives include instructions on how to install the :doc:`Wazuh central components </getting-started/components/index>`. After these are installed, you then need to deploy agents to your endpoints.

+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------+
| **I want to...**                           | **Use**                                                                                                                   | **Typical time**                                   |
+============================================+===========================================================================================================================+====================================================+
| Try Wazuh on one Linux host                | :doc:`Quickstart </quickstart>`                                                                                           | About 5 to 10 minutes                              |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------+
| Install on one or more hosts with a script | :doc:`Assisted installation </installation-guide/wazuh-indexer/installation-assistant>`                                   | About 6 minutes (all-in-one), 15 minutes (3 hosts) |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------+
| Control every step                         | :doc:`Step-by-step installation </installation-guide/wazuh-indexer/step-by-step>`                                         | About 20 minutes (all-in-one)                      |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------+
| Install without internet access            | :doc:`Offline installation </deployment-options/offline-installation/index>`                                              | About 20 minutes, plus the download                |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------+
| Import a ready virtual machine             | :doc:`Virtual machine (OVA) </deployment-options/virtual-machine/virtual-machine>`                                        | About 15 minutes, plus a 3.8 GB download           |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------+
| Run in containers                          | :doc:`Docker </deployment-options/docker/index>`, :doc:`Kubernetes </deployment-options/deploying-with-kubernetes/index>` | About 15 minutes (Docker single-node)              |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------+
| Automate with Ansible                      | :doc:`Ansible </deployment-options/deploying-with-ansible/index>`                                                         | About 10 minutes (all-in-one)                      |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------+

.. raw:: html

   <h3>Ready-to-use machines</h3>

-  :doc:`virtual-machine/virtual-machine`: Wazuh provides a pre-built virtual machine image (OVA) that you can directly import using VirtualBox or other OVA compatible virtualization systems.

..
   -  :doc:`amazon-machine-images/amazon-machine-images`: This is a pre-built Amazon Machine Image (AMI) you can directly launch on an AWS cloud instance.

.. raw:: html

   <h3>Containers</h3>

-  :doc:`docker/index`: Deploy Wazuh with the official Wazuh Docker images. Using Docker, you can deploy a single-node or multi-node Wazuh stack on one Docker host. A Wazuh agent container is also available.
-  :doc:`deploying-with-kubernetes/index`: Deploy the Wazuh central components on Amazon EKS or on a local Kubernetes cluster, and deploy Wazuh agents on Kubernetes.

.. raw:: html

   <h3>Offline</h3>

-  :doc:`offline-installation/index`: Installing the solution offline involves downloading the Wazuh components to later install them on a system with no internet connection.

.. raw:: html

   <h3>From sources</h3>

-  :doc:`Installing the Wazuh server from sources <wazuh-from-sources/index>`: Installing Wazuh from sources means installing the Wazuh manager without using a package manager. You compile the source code and copy the binaries to your computer instead.

..
   .. note::

      To integrate Wazuh with Elastic or Splunk, refer to our :doc:`/integrations-guide/index`.

Installing the Wazuh agent
--------------------------

The :doc:`/installation-guide/wazuh-agent/index` is a single and lightweight monitoring software. It is a multi-platform component that can be deployed to laptops, desktops, servers, cloud instances, containers, or virtual machines. It provides visibility into the endpoint security by collecting critical system and application records, inventory data, and detecting potential anomalies.

If the Wazuh central components are already installed in your environment, create an enrollment token on the Wazuh manager, as described in :ref:`Generate the enrollment token <generate_enrollment_token>`. Then select your operating system below and follow the installation steps to deploy the agent on the endpoints.

.. raw:: html

   <div class="link-boxes-group layout-6">
     <div class="link-boxes-item">
       <a class="link-boxes-link" href="../installation-guide/wazuh-agent/wazuh-agent-package-linux.html">
         <p class="link-boxes-label">Linux</p>

.. image:: /images/installation/linux.png
   :alt: Linux Tux penguin logo
   :align: center

.. raw:: html

       </a>
     </div>
     <div class="link-boxes-item">
       <a class="link-boxes-link" href="../installation-guide/wazuh-agent/wazuh-agent-package-windows.html">
         <p class="link-boxes-label">Windows</p>

.. image:: /images/installation/windows-logo.png
   :alt: Windows logo
   :align: center

.. raw:: html

       </a>
     </div>
     <div class="link-boxes-item">
       <a class="link-boxes-link" href="../installation-guide/wazuh-agent/wazuh-agent-package-macos.html">
         <p class="link-boxes-label">macOS</p>

.. image:: /images/installation/macOS-logo.png
   :alt: Apple macOS logo
   :align: center

.. raw:: html

       </a>
     </div>
   </div>


.. raw:: html

   <h3>From sources</h3>

-  :doc:`Installing the Wazuh agent from sources <wazuh-from-sources/wazuh-agent/index>`: Installing Wazuh from sources means installing the Wazuh agent without using a package manager. You compile the source code and copy the binaries to your computer instead.

Orchestration tools
-------------------

These alternatives guide you to install the Wazuh central components.

-  :doc:`deploying-with-ansible/index`: Ansible playbooks deploy the Wazuh central components and Wazuh agents on your hosts.

..
   - :doc:`deploying-with-puppet/index`: Puppet is an open-source software tool that gives you an automatic way to inspect, deliver, operate, and future-proof all of your software, no matter where it is executed. It is very simple to use and allows you to install and configure Wazuh easily.

.. toctree::
   :hidden:
   :maxdepth: 1

   virtual-machine/virtual-machine
   docker/index
   deploying-with-kubernetes/index
   offline-installation/index
   wazuh-from-sources/index
   deploying-with-ansible/index
..
   amazon-machine-images/amazon-machine-images
   deploying-with-puppet/index
