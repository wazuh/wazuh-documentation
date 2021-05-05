.. Copyright (C) 2020 Wazuh, Inc.

.. meta::
  :description: Learn how to get started with Wazuh Cloud Service

.. _cloud_getting_started:

Getting started
===============

To get started with Wazuh Cloud you need to create a Wazuh Cloud account and set up the environment that contains all the Wazuh components ready for you to use. Creating an environment is a streamlined process in which installing the Wazuh components, defining scalability, and updating the solution is all handled by Wazuh. 
To start using Wazuh Cloud, you need to access the Wazuh WUI and simply deploy the Wazuh agent to your endpoints.

Wazuh provides a free trial that allows you to create a cloud environment and access the Wazuh solution and its capabilities.


.. _cloud_getting_started_sign_up:

Sign up for a trial
-------------------

.. meta::
  :description: Learn about signing up for a trial. 

Wazuh provides a free trial for you to create a cloud environment and access the Wazuh solution and its capabilities.

Follow the next steps to create your trial environment.

Sign up
^^^^^^^

To sign up, all you need is an email address:

1. Go to our `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_ page.
2. Enter your email address and password, or sign up with a Google account.

You are ready to create your first :ref:`environment <cloud_glossary_environment>`.

Create environment
^^^^^^^^^^^^^^^^^^

Follow these steps to quickly set up and run your environment:

1. From the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_, click **Start your free trial**.

2. Configure your environment:

   1. Give your environment a name.

   2. Choose a :ref:`tier <cloud_glossary_tier>` to define the size in bytes of the indexed events. You can use this `estimation tool <https://wazuh.com/cloud/#pricing>`_ to calculate the Wazuh Cloud data tier.
   
   .. note:: During the 14-day trial period, the tier limit is 100GB. Then, after your first payment, the full tier becomes unlocked. If all you want to do is try out Wazuh, the trial includes more than enough to get you started.

   1. Select the :ref:`region <cloud_glossary_region>` where your environment gets hosted. If you are not sure what to pick, select one that is the closest to your location since this typically reduces latency for indexing and search requests.

   2. Choose the support plan that best suits your needs. 

3. Click **View the summary** and then click **Create** to build your environment. This process might take a moment.

Once the environment is ready, you can access the Wazuh WUI and register the agents.

.. _cloud_getting_started_wui_access:

Access Wazuh WUI
----------------

.. meta::
  :description: Learn about how to access Wazuh WUI. 

The Wazuh WUI is a flexible and intuitive web interface. Through this WUI, you have access to the tools for mining and visualizing events, giving you a comprehensive insight into your monitored systems.

Follow these steps to access Wazuh WUI:

1. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.
2. On the **Environments** page, select the environment you want to access.
3. Click **Open Wazuh** to open Wazuh WUI:
4. Choose from one of these methods to log in:
  
  - Log in with the default credentials. You can download them by clicking **Default credentials** on the Environments page. Then, use the `Wazuh WUI - Username` and `Wazuh WUI - Password` to log in.
  - If Single sign-on (SSO) is enabled, use your own account.
  - You can also log in with any user you already created in Wazuh WUI already.

It is highly recommended for security reasons to change the default password and create your own users. 

.. note:: You can access the Wazuh WUI directly using the URL ``https://<cloud_id>.cloud.wazuh.com``, where ``<cloud_id>`` is your Cloud ID.

.. _cloud_getting_started_register_agents:

Register agents
---------------

.. meta::
  :description: Learn about how to register agents. 

To start using Wazuh, you need to install a Wazuh agent on your endpoint and register it in your environment. 

To register an agent, follow these steps:

1. Log into the Wazuh WUI.

2. Click **Wazuh** and then **Agents**.

3. Click **Deploy a new agent**.

4. Follow the steps described in Wazuh WUI.

.. note::

   Agents must use **TCP** to communicate with your environment.
  

If you have any doubt about the Wazuh cloud, please visit the :ref:`Cloud service FAQ <cloud_getting_started_starting_faq>`.
	   
   .. toctree::
      :hidden:
      :maxdepth: 1

      starting-faq
