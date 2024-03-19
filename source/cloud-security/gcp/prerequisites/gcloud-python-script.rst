.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: 

Gcloud Python script
====================

The Wazuh modules for Google Cloud are accessible through the ``var/ossec/wodles/gcloud/gcloud`` Python script. This script enables them to automatically fetch various types of events from Google Cloud Pub/Sub and Google Cloud Storage bucket services based on the configuration. It provides multiple options to manually fetch data and test the configuration as shown below:

.. code-block:: console

   # /var/ossec/wodles/gcloud/gcloud --help

.. code-block:: none
   :class: output

   usage: usage: gcloud.py [options]
   
   Wazuh wodle for monitoring Google Cloud
   
   optional arguments:
     -h, --help            show this help message and exit
     -T INTEGRATION_TYPE, --integration_type INTEGRATION_TYPE
                           Supported integration types: ('pubsub', 'access_logs')
     -p PROJECT, --project PROJECT
                           Project ID
     -s SUBSCRIPTION_ID, --subscription_id SUBSCRIPTION_ID
                           Subscription name
     -c CREDENTIALS_FILE, --credentials_file CREDENTIALS_FILE
                           Path to credentials file
     -m MAX_MESSAGES, --max_messages MAX_MESSAGES
                           Number of maximum messages pulled in each iteration
     -l LOG_LEVEL, --log_level LOG_LEVEL
                           Log level
     -b BUCKET_NAME, --bucket_name BUCKET_NAME
                           The name of the bucket to read the logs from
     -P PREFIX, --prefix PREFIX
                           The relative path to the logs
     -r, --remove          Remove processed blobs from the GCS bucket
     -o ONLY_LOGS_AFTER, --only_logs_after ONLY_LOGS_AFTER
                           Only parse logs after this date - format YYYY-MMM-DD
     -t N_THREADS, --num_threads N_THREADS
                           Number of threads
     --reparse             Parse the log, even if its been parsed before
