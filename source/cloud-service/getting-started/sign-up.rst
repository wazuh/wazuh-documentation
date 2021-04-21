.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_getting_started_sign_up:

Sign up for a trial
===================

.. meta::
  :description: Learn about signing up for a trial. 

Follow the next steps to create your trial environment.

Sign up
-------

To sign up, all you need is an email address:

1. Go to our `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_ page.
2. Enter your email address and password, or sign up with a Google account. Make sure you’ve read through our terms of service.

You are ready to create your first :ref:`environment <cloud_glossary_environment>`.

Create environment
------------------

To get up and running with your environment quickly:

1. From the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_, click **Start your free trial**.

2. Configure your environment:

   1. Give your environment a name.

   2. Choose a :ref:`tier <cloud_glossary_tier>`: The tier is the size in bytes of the indexed events. When the tier is reached, oldest events disappear from your index. Events removed from your index are still available in cold storage. This `estimation tool <https://wazuh.com/cloud/#pricing>`_ may be helpful to calculate it.
   
   .. note:: During the 14-day trial period, the tier will be limited to 100GB. Then, after your first payment, the full tier will be unlocked. If all you want to do is try out Wazuh, the trial includes more than enough to get you started.

   3. Select a :ref:`region <cloud_glossary_region>` where your environment gets hosted. If you are not sure what to pick, select one that is close to you since typically reduces latency for indexing and search requests.

   4. Choose the :ref:`support <cloud_getting_started_support>` plan that best suits your needs. 

3. Click on **View the summary** and on **Create**.

4. Your environment should be listed in the *Environments* section soon.

Once the environment is ready, next steps will be accessing the Wazuh WUI and registering the first agents.
