.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides a 14-day free trial to create a cloud environment and explore the Wazuh Cloud service. Learn more in this section of the documentation.

Sign up for a trial
===================

You can start with a free trial to create an environment and explore Wazuh Cloud service. Wazuh provides a 14-day free trial period.

Follow these steps to create your trial environment.

.. note::

   No credit card is required to start the free trial. See the `Wazuh Cloud <https://wazuh.com/cloud/>`__ page for information related to the Wazuh Cloud trial experience.

Signing up
----------

Perform the following steps to sign up for a free trial:

#. Go to the Wazuh Cloud page.
#. Select `Start your free trial <https://console.cloud.wazuh.com/sign-up?landing=trial>`__.
#. Fill in the required information and click **Start free trial**.
#. Verify your email address.

Now you are ready to create your first :ref:`environment <cloud_glossary_environment>`.

Creating environment
--------------------

Follow these steps to set up and run your environment:

#. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`__ using your email address and password configured during registration.

#. Click **Create environment**.

#. Give your environment a name.

#. Fill in the use case. This information helps us understand why our users utilize our service, allowing us to improve it accordingly.

#. Select your preferred :ref:`region <cloud_glossary_region>` for data residency. If you are not sure what to pick, select the region closest to your location to reduce latency for indexing and search requests.

#. Select one of the available profiles: **Small**, **Medium** or **Large**. If none of these predefined profiles meets your requirements, select the **Custom** option to customize the settings.

   +-----------------------------------+-------------+--------------+--------------+
   | Metric                            | Small       | Medium       | Large        |
   +===================================+=============+==============+==============+
   | **Active agents**                 | Up to 100   | Up to 250    | Up to 500    |
   +-----------------------------------+-------------+--------------+--------------+
   | **Indexed data retention**        | 1 month     | 3 Months     | 3 Months     |
   +-----------------------------------+-------------+--------------+--------------+
   | **Archived data retention**       | 3 months    | 1 Year       | 1 Year       |
   +-----------------------------------+-------------+--------------+--------------+
   | **Average/Peak Events Per Second**| 100/500 EPS | 250/1250 EPS | 500/2500 EPS |
   +-----------------------------------+-------------+--------------+--------------+
   | **Indexed data capacity**         | 25 GB       | 250 GB       | 500 GB       |
   +-----------------------------------+-------------+--------------+--------------+

   For more details about the settings and their functionality, see the :doc:`Settings <../your-environment/settings>` section.

   .. note::

      During the trial period, some settings are limited. However, they do not prevent you from exploring and using the Wazuh Cloud platform. All restrictions are removed once you purchase the environment.

#. Select your pricing: **Monthly** or **Annual**. If you choose the monthly option, you will be billed monthly, whereas the annual option entails a single payment per year.

#. Click **Start your free trial** to build your environment. This process might take a few minutes.

#. Once your environment is ready, access the :doc:`Wazuh dashboard <access-wazuh-wui>` and enroll agents to start monitoring your endpoints.

.. thumbnail:: /images/cloud-service/create-wazuh-cloud-service-environment.png
   :title: Create Wazuh cloud service environment
   :alt: Create Wazuh cloud service environment
   :align: center
   :width: 80%

.. note::

   If you do not enroll an agent within 3 days of starting the trial, your environment will be terminated due to inactivity.
