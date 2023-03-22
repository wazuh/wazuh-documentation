.. _cloud_sign_up:

.. meta::
  :description: Wazuh offers cloud-delivered protection. Prevent, detect, and respond to threats in real-time. Learn more about Wazuh Cloud here. 

Sign up for a trial
===================

Wazuh provides a 14-day free trial for you to create a cloud environment and explore the Wazuh Cloud service. 

Follow the next steps to create your trial environment.

Sign up
-------

To sign up for a free trial, all you need is an email address:

#. Go to our `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_ page.

#. Enter your email address and password.

Now you are ready to create your first :ref:`environment <cloud_glossary_environment>`.

Create environment
------------------

Follow these steps to quickly set up and run your environment:

#. From the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_, click **Start your free trial**.

#. Configure your environment:

   #. Give your environment a name.

   #. Choose a :ref:`tier <cloud_glossary_tier>` to define the size in bytes of the indexed events. You can use this `estimation tool <https://wazuh.com/cloud/#pricing>`_ to calculate the Wazuh Cloud data tier.
   
      .. note:: During the 14-day trial period, the tier limit is 100GB. Then, after your first payment, the full tier becomes unlocked. For testing purposes, 100 GB is more than enough to get an insight into Wazuh Cloud.

   #. Select the :ref:`region <cloud_glossary_region>` where your environment gets hosted. If you are not sure what to pick, select one that is the closest to your location since this typically reduces latency for indexing and search requests.

   #. Choose the support plan that best suits your needs. 

   #. Complete your user profile. This step is only shown when there is missing information on your profile. 
   
      To edit your user profile information, see the :ref:`Edit user settings <cloud_user_settings>` section.

#. Click **View the summary** and then **Create** to build your environment. This process might take a moment.

Once the environment is ready, you can :ref:`access the Wazuh WUI <cloud_wui_access>`  and register the agents. 

If you have any questions about the Wazuh Cloud, see the :doc:`Cloud service FAQ </cloud-service/getting-started/starting-faq>`.
