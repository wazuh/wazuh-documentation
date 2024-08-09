.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides a 14-day free trial to create a cloud environment and explore the Wazuh Cloud service. Learn more in this section of the documentation.

Sign up for a trial
===================

Wazuh provides a 14-day free trial to create a cloud environment and explore the Wazuh Cloud service.

Follow the next steps to create your trial environment.

Sign up
-------

To sign up for a free trial, do the following.

#. Go to our Wazuh Cloud Console `Login <https://console.cloud.wazuh.com/>`__ page.

#. Fill in the required information and click the **Create account** button.

#. Verify your email address.

Now you are ready to create your first :ref:`environment <>`.

Create environment
------------------

Follow these steps to quickly set up and run your environment:

#. From the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`__, click the **Start your free trial** button.

#. Configure your environment:

   #. Give your environment a name.

   #. Select the :ref:`region <>` to host your environment. If you are not sure what to pick, select a region that is the closest to your location since this typically reduces latency for indexing and search requests.

   #. Fill in the use case. This information helps us understand why our users utilize our service, allowing us to improve it accordingly.

   #. Choose from the available settings by selecting one of three predefined profiles: **Small**, **Medium**, or **Large**. If these presets don't align with your needs, opt for the Custom option to configure settings individually.

      +-----------------------------------+-------------+--------------+--------------+
      |                                   | Small       | Medium       | Large        |
      +===================================+=============+==============+==============+
      | Active agents                     | 100         | Up to 250    | Up to 500    |
      +-----------------------------------+-------------+--------------+--------------+
      | Indexed data retention            | 1 Month     | 3 Months     | 3 Months     |
      +-----------------------------------+-------------+--------------+--------------+
      | Archived data retention           | 3 Months    | 1 Year       | 1 Year       |
      +-----------------------------------+-------------+--------------+--------------+
      | Recommended Average/Peak EPS      | 100/500 EPS | 250/1250 EPS | 500/2500 EPS |
      +-----------------------------------+-------------+--------------+--------------+
      | Recommended Indexed data capacity | 25 GB       | 250 GB       | 500 GB       |
      +-----------------------------------+-------------+--------------+--------------+

      For more details about the settings and their functionality, see the :doc:`Settings <../your-environment/settings>` section.

      .. note::

         Throughout the 14-day trial period, some settings are limited. However, they do not prevent you from exploring and using the Wazuh Cloud platform. All restrictions are removed after you make the initial payment.

   #. Select between monthly or annual payments. If you choose the monthly option, you will be billed on a monthly basis, whereas the annual option entails a single payment per year.

#. Click on **Start your free trial** to build your environment. This process might take a few minutes.

Once the environment is ready, access the :doc:`Wazuh dashboard <access-wazuh-wui>` and enroll the Wazuh agents.

If you have any questions about the Wazuh Cloud, see the :doc:`Cloud service FAQ <starting-faq>`.