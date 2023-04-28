.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides different approaches to connecting your private network securely. Learn more about how to connect agents without Internet here.

.. _cloud_your_environment_agents_without_internet:

Agents without Internet access
===============================

Even if an agent does not have Internet access, Wazuh provides different approaches to securely connect your private network to your environment:

- `Using a forwarding proxy`_

- `Using AWS Private Link`_

Using a forwarding proxy
------------------------

It is possible to access your environment using an NGINX forwarding proxy.

.. thumbnail:: ../../images/cloud-service/nginx-scheme.png
    :title: Using an NGINX forwarding proxy
    :alt: Using an NGINX forwarding proxy
    :align: center
    :width: 80%


To achieve this configuration, follow these steps:

1. Deploy a new instance in a public subnet with internet access.

2. Install NGINX on your instance following the `NGINX documentation <https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/>`_.

3. Configure NGINX.

   #. Add the following lines to the HTTP section in your NGINX configuration, located in ``/etc/nginx/nginx.conf``.


      .. code-block::

         http{
         ...
         real_ip_header X-Forwarded-For;
         set_real_ip_from nginx_ip;
            }

   #. Add the following block to the end of the NGINX configuration.

      .. code-block::

	 stream {
	   upstream master {
	     server <cloud_id>.cloud.wazuh.com:1515;
	   }
	   upstream mycluster {
	     server <cloud_id>.cloud.wazuh.com:1514;
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

      Make sure to replace ``<cloud_id>`` with the Cloud ID of your environment.
	
   #. Restart NGINX with ``systemctl restart nginx``.

   #. Register your agent but replace the *WAZUH_MANAGER_IP* value (``nginx_ip``) with the NGINX instance IP address. To learn more on how to register agents, see the :ref:`Register agents <cloud_register_agents>` section.

      Example:

      .. code-block::

         WAZUH_MANAGER_IP=nginx_ip WAZUH_PROTOCOL="tcp" \
         WAZUH_PASSWORD="xxxx" \
         yum install wazuh-agent
         
      In this example, make sure to replace ``<xxxx>`` with your actual password.

Using AWS Private Link
----------------------

In case your agents are located in AWS, you can access our Wazuh Cloud service securely by keeping your network traffic within the AWS network. For that purpose, we use AWS Private Link.

1. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.
   
2. Go to the **Help** section to contact the Wazuh team requesting your VPC endpoint service name. It has this format:

   ``com.amazonaws.vpce.<region>.vpce-svc-<aws-service-id>``

3. Select your endpoints in AWS:
   
   #. Navigate to your AWS Console.

   #. Select **VPC**.

   #. Select **Endpoints**.

4. Create a new endpoint pointing to the endpoint service you requested from the Wazuh team. Keep in mind that the endpoint must be located in the same AWS Region as the endpoint service. For more information on AWS PrivateLink and VPC endpoints, see the  `AWS documentation <https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint>`_.

5. After the endpoint is created, Wazuh approves the connection and sends a notification when it is ready to use.

6. You can now register your agent but replace the *WAZUH_MANAGER_IP* value (``vpce-<aws-endpoint-id>.vpce-svc-<aws-service-id>.<region>.vpce.amazonaws.com``) with the endpoint's DNS.

   If the agents are located in a different region than your endpoint, use VPC Peerings to connect them to the endpoint service.

   Example:

   .. code-block::

      WAZUH_MANAGER_IP=vpce-<aws-endpoint-id>.vpce-svc-<aws-service-id>.<region>.vpce.amazonaws.com WAZUH_PROTOCOL="tcp" \
      WAZUH_PASSWORD="xxxx" \
      yum install wazuh-agent

   In this example, make sure to replace ``<xxxx>`` with your actual password.
