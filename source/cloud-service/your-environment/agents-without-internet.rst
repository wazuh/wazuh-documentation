.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_agents_without_internet:

.. meta::
  :description: Learn about connecting agents without internet to your environment

Connect agents without internet
===============================

Even if an agent do not has Internet access, we provide different approaches to securely connect your private network to our cloud service:

- `Using a forwarding proxy`_

- `Using AWS Private Link`_

Using a forwarding proxy
------------------------

It is possible to access Wazuh Cloud Service using an NGINX forwarding proxy. Eventually, the resulting environment will have the following structure.

.. thumbnail:: ../../images/cloud-service/nginx-scheme.png
    :align: center
    :width: 100%


Follow these steps:

1. Deploy a new instance in a public subnet with internet access.

2. Install NGINX in your instance using `the official documentation <https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/>`_.

3. Configure NGINX.

   1. Add the following lines to the http section in your NGINX configuration, located in ``/etc/nginx/nginx.conf``


   .. code-block::

      http{
        ...
	real_ip_header X-Forwarded-For;
	set_real_ip_from nginx_ip;
      }

   2. Add the following block to the end of the NGINX configuration mentioned below:

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

   Please, mind replacing ``<cloud_id>`` with the environment's Cloud ID.
	
   3. Restart NGINX with: ``systemctl restart nginx``

   4. Register your agent following the instructions but replacing the WAZUH_MANAGER_IP value with the NGINX instance IP.

   Example:

   .. code-block::

      WAZUH_MANAGER_IP=nginx_ip WAZUH_PROTOCOL="tcp" \
      WAZUH_PASSWORD="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
      yum install wazuh-agent-3.13.2-1
      
   On this example, mind replacing ``<cloud_id>`` with your password.

Using AWS Private Link
----------------------

In case your agents are located in AWS, you can access to our cloud service securely by keeping your network traffic within the AWS network. For that purpose, we use AWS Private Link.


To do this:

1. Open a ticket requesting your VPC endpoint service name. It has this format:

   ``com.amazonaws.vpce.<region>.vpce-svc-<aws-service-id>``

2. Navigate to your AWS Console > VPC > Endpoints

3. Create a new Endpoint pointing to the endpoint service mentioned above. (`AWS documentation <https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint>`_)

   Keep in mind that the endpoint must be located in the same AWS Region as the endpoint service.

4. After the endpoint's creation, Wazuh will approve the connection and notify you when it is ready to use.

5. Once the endpoint has been approved, you can register your agent following the instructions but replacing the ``WAZUH_MANAGER_IP`` value with the endpoint's DNS.

   If your agents are located in a different region than your endpoint, use VPC Peerings to connect them to the endpoint service.

   Example:

   .. code-block::

      WAZUH_MANAGER_IP=vpce-<aws-endpoint-id>.vpce-svc-<aws-service-id>.<region>.vpce.amazonaws.com WAZUH_PROTOCOL="tcp" \
      WAZUH_PASSWORD="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
      yum install wazuh-agent-3.13.2-1

   On this example, mind replacing ``<cloud_id>`` with your password.
