.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides different approaches to connecting your private network securely. Learn more about how to connect agents without Internet here.

Agents without Internet access
===============================

In many organizations, certain systems, especially those in restricted, segmented, or highly secure networks do not have direct access to the Internet. These systems still generate important security events that need to be monitored by Wazuh.

Wazuh Cloud supports secure methods to ensure that such isolated or private network agents can still send their data to your cloud environment. This enables visibility across your infrastructure, even for systems operating in air-gapped or compliance-restricted environments. The following options are available for this purpose:

-  `Using a forwarding proxy`_
-  `Using AWS PrivateLink`_

Using a forwarding proxy
------------------------

It is possible to access your environment using an NGINX forwarding proxy.

.. thumbnail:: ../../images/cloud-service/nginx-scheme.png
    :title: Using an NGINX forwarding proxy
    :alt: Using an NGINX forwarding proxy
    :align: center
    :width: 80%


To achieve this configuration, follow these steps:

#. Deploy a new instance in a public subnet with internet access.
#. Install NGINX on your instance following the `NGINX documentation <https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/>`_.
#. Configure NGINX.

   #. Add the following lines to the HTTP section in your NGINX configuration, located in the ``/etc/nginx/nginx.conf`` file. This configuration enables Nginx to extract and use the real client IP address from the ``X-Forwarded-For`` header and sets restrictions on which real IP addresses are accepted as valid.

      .. code-block::

         http{
         real_ip_header X-Forwarded-For;
         set_real_ip_from <nginx_ip>;
            }

   #. Add the following block to the end of the NGINX configuration file ``/etc/nginx/nginx.conf`` and replace ``<CLOUD_ID>`` with the Cloud ID of your environment. This configuration enables stream proxying, where incoming traffic on specific ports is forwarded to the corresponding upstream servers (master or mycluster). This is based on the port numbers, ``1515`` and ``1514`` specified in the listen directive.

      .. code-block:: nginx
         :emphasize-lines: 3, 6

   	   stream {
   	     upstream master {
   	       server <CLOUD_ID>.cloud.wazuh.com:1515;
   	     }
   	     upstream mycluster {
   	       server <CLOUD_ID>.cloud.wazuh.com:1514;
   	       }
   	     server {
   	       listen nginx_ip:1515;
   	       proxy_pass master;
   	     }
   	     server {
   	       listen nginx_ip:1514;
   	       proxy_pass mycluster;
   	     }
   	   }

   #. Restart the NGINX service.

      .. code-block:: console

         # systemctl restart nginx

   #. Enroll your agent with the IP address of the NGINX instance. To learn more about registering agents, see the :doc:`Enroll agents </cloud-service/getting-started/enroll-agents>` section.

      Example:

      .. code-block:: console

         # WAZUH_MANAGER_IP=<NGINX_IP_ADDRESS> \
         WAZUH_PASSWORD="<PASSWORD>" \
         yum install wazuh-agent|WAZUH_AGENT_RPM_PKG_INSTALL|

      Replace ``<PASSWORD>`` with your Wazuh server enrollment password.

Using AWS PrivateLink
---------------------

If your agents are deployed within AWS, you can connect them securely to your Wazuh Cloud environment without sending traffic over the public Internet. Wazuh Cloud supports AWS PrivateLink, which keeps all communication within the AWS internal network. This approach enhances security, simplifies compliance, and reduces the risk of data exposure.

Follow the below steps to connect using AWS PrivateLink:

#. Request your Wazuh Virtual Private Cloud (VPC)  endpoint service name

   #. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.
   #. Navigate to the Help section and contact the Wazuh Support team.
   #. Request your VPC endpoint service name, which follows this format:  ``com.amazonaws.vpce.<REGION>.vpce-svc-<AWS_SERVICE_ID>``

#. Create a VPC endpoint in your AWS account

   #. Log in to your AWS Management Console.
   #. Go to **VPC**, select **Endpoints**.
   #. Click **Create endpoint**.
   #. Choose the endpoint service provided by the Wazuh team.
   #. Ensure the endpoint is created in the same AWS Region as the Wazuh service. For more details, see the `AWS documentation <https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint>`__.

#. Wait for Wazuh to approve the connection

   -  Once your endpoint is created, the Wazuh team will approve the connection.
   -  You will receive a notification when the PrivateLink connection is ready for use.

#. Enroll your Wazuh agent

   -  When configuring your agent, replace the ``WAZUH_MANAGER_IP`` value with your endpoint’s DNS name: ``vpce-<AWS_ENDPOINT_ID>.vpce-svc-<AWS_SERVICE_ID>.<REGION>.vpce.amazonaws.com``.

#. If the agents are located in a different region than your endpoint, use VPC Peerings to connect them to the endpoint service. This allows them to send data securely through the PrivateLink connection.

   Example:

   .. code-block:: console

      # WAZUH_MANAGER_IP=vpce-<AWS_ENDPOINT_ID>.vpce-svc-<AWS_SERVICE_ID>.<REGION>.vpce.amazonaws.com \
      WAZUH_PASSWORD="<PASSWORD>>" \
      yum install wazuh-agent|WAZUH_AGENT_RPM_PKG_INSTALL|

   In this example, make sure to replace ``<PASSWORD>`` with your actual password.
