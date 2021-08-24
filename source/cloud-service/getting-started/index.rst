.. Copyright (C) 2020 Wazuh, Inc.

.. meta::
  :description: Learn how to get started with Wazuh Cloud Service. We provide a free trial for you to create a cloud environment and explore the Wazuh Cloud. 

.. _cloud_getting_started:

Getting started
===============

To get started with Wazuh Cloud, you need to create a Wazuh Cloud account and set up your environment, a deployment that contains all the Wazuh components ready to be used. Creating an environment is streamlined for you. Installing and updating the Wazuh components, and defining scalability is all handled by Wazuh Cloud. Once your environment is ready, you need to access the Wazuh WUI and simply deploy the Wazuh agent to your endpoints. 


.. _cloud_getting_started_sign_up:

Sign up for a trial
-------------------

Wazuh provides a free trial for you to create a cloud environment and explore the Wazuh Cloud service. 

Follow the next steps to create your trial environment.

Sign up
^^^^^^^

To sign up, all you need is an email address:

#. Go to our `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_ page.

#. Enter your email address and password, or sign up with a Google account.

Now you are ready to create your first :ref:`environment <cloud_glossary_environment>`.

Create environment
^^^^^^^^^^^^^^^^^^

Follow these steps to quickly set up and run your environment:

#. From the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_, click **Start your free trial**.

#. Configure your environment:

   #. Give your environment a name.

   #. Choose a :ref:`tier <cloud_glossary_tier>` to define the size in bytes of the indexed events. You can use this `estimation tool <https://wazuh.com/cloud/#pricing>`_ to calculate the Wazuh Cloud data tier.
   
      .. note:: During the 14-day trial period, the tier limit is 100GB. Then, after your first payment, the full tier becomes unlocked. For testing purposes, 100 GB is more than enough to get an insight into Wazuh Cloud.

   #. Select the :ref:`region <cloud_glossary_region>` where your environment gets hosted. If you are not sure what to pick, select one that is the closest to your location since this typically reduces latency for indexing and search requests.

   #. Choose the support plan that best suits your needs. 

#. Click **View the summary** and then **Create** to build your environment. This process might take a moment.

Once the environment is ready, you can access the Wazuh WUI and register the agents.

.. _cloud_getting_started_wui_access:

Access Wazuh WUI
----------------

.. meta::
  :description: Learn about how to access Wazuh WUI. 

The Wazuh WUI is a flexible and intuitive web interface. Through this WUI, you have access to the tools for mining and visualizing events, giving you a comprehensive insight into your monitored systems.

Follow these steps to access Wazuh WUI:

#. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.
#. On the **Environments** page, select the environment you want to access.
#. Click **Open Wazuh** to open Wazuh WUI.
#. Choose from one of these methods to log in:
  
  - Log in with the default credentials. You can download them by clicking **Default credentials** on the Environments page. Then, use the `Wazuh WUI - Username` and `Wazuh WUI - Password` to log in.
  - If Single sign-on (SSO) is enabled, use your own account.
  - You can also log in with any user you already created in Wazuh WUI.

It is highly recommended for security reasons to change the default password and create your own users. 

.. note:: You can access the Wazuh WUI directly using the URL *https://<cloud_id>.cloud.wazuh.com*, where ``<cloud_id>`` is the Cloud ID of your environment.

.. _cloud_getting_started_register_agents:

Register agents
---------------

.. meta::
  :description: Learn about how to register agents. 

To start using Wazuh, you need to install a Wazuh agent on your endpoint and register it in your environment. 

To register an agent, follow these steps:

#. Log into the Wazuh WUI.

#. Click **Wazuh** and then **Agents**.

#. Click **Deploy a new agent**.

#. Follow the steps described in Wazuh WUI.

.. note::

   Agents must use **TCP** to communicate with your environment.
  

If you have any questions about the Wazuh Cloud, see the :ref:`Cloud service FAQ <cloud_getting_started_starting_faq>`.
	   
   .. toctree::
      :hidden:
      :maxdepth: 1

      Sign up for a trial <https://documentation.wazuh.com/current/cloud-service/getting-started/index.html#cloud_getting_started_sign_up>
      Access Wazuh WUI <https://documentation.wazuh.com/current/cloud-service/getting-started/index.html#cloud_getting_started_wui_access>
      Register agents <https://documentation.wazuh.com/current/cloud-service/getting-started/index.html#register-agents>
      starting-faq
