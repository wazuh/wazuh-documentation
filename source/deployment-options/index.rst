.. Copyright (C) 2021 Wazuh, Inc.

.. _deployment:

Installation alternatives
=========================

You can install Wazuh using other deployment options. These are complementary to the installation methods you can find in the  :doc:`/installation-guide/index` and the :doc:`/quickstart`. 

Installing the Wazuh central components
---------------------------------------

All the alternatives include instructions on how to install the Wazuh central components. After installing the :doc:`central components </getting-started/components/index>`, you then need to deploy agents to your endpoints.  

.. raw:: html

    <h3>Ready-to-use machines</h3>

- :doc:`virtual-machine/virtual-machine`: Wazuh provides a pre-built virtual machine image (OVA) that you can directly import using VirtualBox or other OVA compatible virtualization systems. 
  
- :doc:`amazon-machine-images/amazon-machine-images`: This is a pre-built Amazon Machine Image (AMI) you can directly launch on an AWS cloud instance.


.. raw:: html

    <h3>Containers</h3>

- :doc:`docker/index`: Docker is a set of platform-as-a-service (PaaS) products that delivers software in packages called containers. Using Docker, you can install and configure the Wazuh deployment as a single-host architecture. 

  
- :doc:`deploying-with-kubernetes/index`: Kubernetes is an open-source system for automating deployment, scaling, and managing containerized applications. This deployment type uses Wazuh images from Docker and allows you to build the Wazuh environment. 


.. raw:: html

    <h3>Offline</h3>
    
- :doc:`offline-installation`: Installing the solution offline involves downloading the Wazuh components to later install them on a system with no internet connection. 


.. raw:: html

    <h3>From sources</h3>

- :doc:`Installing the Wazuh server from sources <wazuh-from-sources/index>`: Installing Wazuh from source means installing the Wazuh manager without using a package manager. You compile the source code and copy the binaries to your computer instead.



.. raw:: html

    <h3>Commercial options</h3>

- :doc:`elastic-stack/index`: As an alternative to Open Distro for Elasticsearch, you can install Wazuh using the Elastic Stack basic license option. It contains everything included in the open source version under the `Apache License, Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_, plus some additional capabilities such as Elastic Stack Security features, Kibana alerting, and others. According to your chosen configuration, Wazuh and Elastic Stack are installed on the same host, as an all-in-one deployment, on a separate host as a single-node or multi-node cluster.

- :doc:`Installation with Splunk <splunk/index>`: You install Wazuh along with Splunk Enterprise, including the Splunk forwarder and the Wazuh Splunk app. This can be done as a single instance or as a multi-instance cluster.


Installing the Wazuh agent
--------------------------

The :doc:`/installation-guide/wazuh-agent/index` is a single and lightweight monitoring software. It is a multi-platform component that can be deployed to laptops, desktops, servers, cloud instances, containers, or virtual machines. It provides visibility into the endpoint's security by collecting critical system and application records, inventory data, and detecting potential anomalies. 

If the Wazuh central components are already installed in your environment, select your operating system below and follow the installation steps to deploy the agent on the endpoints. 


.. raw:: html

  <div class="agent-os">
      <div class="item-agent">
          <a href="../installation-guide/wazuh-agent/wazuh-agent-package-linux.html" class="d-flex align-items-center">
            <p>Linux</p>

.. image:: ../images/installation/linux.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="../installation-guide/wazuh-agent/wazuh-agent-package-windows.html" class="d-flex align-items-center">
                    <p>Windows</p>

.. image:: ../images/installation/windows_icon.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="../installation-guide/wazuh-agent/wazuh-agent-package-macos.html" class="d-flex align-items-center">
            <p>macOS</p>

.. image:: ../images/installation/macOS_logo.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent" id="solaris-logo">
        <a href="../installation-guide/wazuh-agent/wazuh-agent-package-solaris.html" class="d-flex align-items-center">
            <p>Solaris</p>

.. image:: ../images/installation/solaris.png
      :align: center      

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="../installation-guide/wazuh-agent/wazuh-agent-package-aix.html" class="d-flex align-items-center">
            <p>AIX</p>

.. image:: ../images/installation/AIX.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="../installation-guide/wazuh-agent/wazuh-agent-package-hpux.html" class="d-flex align-items-center">
            <p>HP-UX</p>

.. image:: ../images/installation/hpux.png
      :align: center

.. raw:: html

          </a>
      </div>
  </div>


.. raw:: html

    <h3>From sources</h3>

- :doc:`Installing the Wazuh agent from sources <wazuh-from-sources/wazuh-agent/index>`: Installing Wazuh from source means installing the Wazuh agent without using a package manager. You compile the source code and copy the binaries to your computer instead.

Orchestration tools
-------------------

These alternatives guide you to install the Wazuh central components along with the single universal agent.


- :doc:`deploying-with-ansible/index`: Ansible is an open source platform designed for automating tasks. Its deployment tool is used to deploy the Wazuh infrastructure on AWS. The Wazuh environment consists of the Wazuh central components and a Wazuh agent.

- :doc:`deploying-with-puppet/index`: Puppet is an open-source software tool that gives you an automatic way to inspect, deliver, operate, and future-proof all of your software, no matter where it is executed. It is very simple to use and allows you to install and configure Wazuh easily.



.. toctree::
    :hidden:
    :maxdepth: 1
    
    virtual-machine/virtual-machine
    amazon-machine-images/amazon-machine-images
    docker/index 
    deploying-with-kubernetes/index
    deploying-with-ansible/index
    deploying-with-puppet/index
    offline-installation
    wazuh-from-sources/index
    elastic-stack/index
    splunk/index
