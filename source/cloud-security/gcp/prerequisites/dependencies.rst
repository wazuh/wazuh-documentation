.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Install Python and Pip on the Wazuh agent endpoint you are performing the integration to monitor Google Cloud.

Installing dependencies
=======================

The Google Cloud integration runs on a Wazuh agent. Install the required dependencies on the monitored endpoint before configuring the integration.

Python
------

The Google Cloud integration is compatible with Python 3.8 and later. This documentation uses Python 3.11 or later for the configuration examples.

If Python 3 is not installed on the monitored endpoint, use the following commands to install it.

.. note::

   Python 3.8 and 3.9 have reached end of support. Python 3.10 reaches end of support in October 2026. We recommend using Python 3.11 or later.

.. tabs::

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3

Install the required Python modules using Pip. Most UNIX distributions provide Pip through their package repositories. If Pip is not installed on the monitored endpoint, use the following command to install it.

.. tabs::

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3-pip

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3-pip

Run the command below to check your pip version.

.. code-block:: console

   # pip3 --version

Google Cloud pip dependencies
------------------------------

The `google-cloud-pubsub <https://pypi.org/project/google-cloud-pubsub/>`__ and `google-cloud-storage <https://pypi.org/project/google-cloud-storage/>`__ packages provide Python clients for Google Cloud Pub/Sub and Cloud Storage.

The integration uses the Pub/Sub client to retrieve messages from configured subscriptions and the Cloud Storage client to retrieve data from configured buckets.

Run the following command to install the required dependencies for Python 3.11–3.13:

.. code-block:: console

   # sudo pip3 install --break-system-packages google-cloud-pubsub==2.7.1 "google-cloud-storage>=2.14.0" pytz==2020.1 setuptools==68.0.0

.. note::

   When using a virtual environment, remove the ``--break-system-packages`` option from the command.
