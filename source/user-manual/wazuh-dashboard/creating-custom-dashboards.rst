.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out how to create a set of custom visualizations and add them together to create a custom dashboard.

Creating custom dashboards
==========================
        
This section describes the process of creating a set of custom visualizations using the Wazuh dashboard component. We also show how to add individually created visualizations together to create a custom dashboard.

Visualizing the data
--------------------

Data visualization enhances the ability to comprehend complex security data by providing a visual representation. This representation can reveal patterns, trends, anomalies, and insights more effectively than raw data alone. This simplifies the interpretation of large datasets and makes it easier to identify security threats, assess the overall state of security, and make informed decisions.

There are different visualization techniques that can help make data clear and appealing. The Wazuh **Visualize** page takes data from the **Discover** page and turns it into various visual types like Bar, Area, Line Charts, Pie Charts, Maps, and Tables. These visuals can be saved, combined for dashboards, and shared with others using the Wazuh dashboard.

We will cover the practical aspect of dashboard creation by creating different types of visualizations in the Wazuh dashboard and then integrate the visualizations to create a custom dashboard.

Creating visualizations
^^^^^^^^^^^^^^^^^^^^^^^

To create a visualization, click the upper-left menu icon and navigate to **OpenSearch Dashboards** > **Visualize**. This action will open a page where a list of visualizations is displayed if any have already been created. If not, the page will show a **Create new visualization** button in the middle.

.. thumbnail:: /images/wazuh-dashboard/custom-dashboards/create-new-visualization.png
   :align: center
   :width: 80%
   :title: Create new visualization
   :alt: Create new visualization

Next, we must select the visualization type from the **New Visualization** screen. This screen presents various visualization types, as shown below:

.. thumbnail:: /images/wazuh-dashboard/custom-dashboards/select-visualization-type.png
   :align: center
   :width: 80%
   :title: Select visualization type
   :alt: Select visualization type

Choose the visualization option that best suits your data by clicking on the visualization type box. Here, we selected the Area chart visualization.

After selecting the visualization type, for most of the visualization types, the next step is to choose the desired index to work with. This will be the data source that the visualization will be built on. The visualization type selected will redirect you to the screen displayed below.

.. thumbnail:: /images/wazuh-dashboard/custom-dashboards/choose-source.png
   :align: center
   :width: 80%
   :title: Choose a source
   :alt: Choose a source

Wazuh dashboard aggregation
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Wazuh dashboard visualization contains two main aggregation objects;

-  Metric aggregation.
-  Bucket aggregation.

Metric aggregation
''''''''''''''''''

Metric aggregation calculates metrics by aggregating data values. This contains the actual values of the metric to be calculated. Metric aggregation is typically represented on the Y-axis.

There are different types of metric aggregations as shown below:

#. **Average**: This is the average of a numeric field. It calculates the arithmetic mean of an existing set of data values. The Average is obtained by adding up all the data values and dividing its sum by the total count.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/average-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Average metric aggregation
      :alt: Average metric aggregation

   Average aggregation helps in calculating the average duration of security incidents, average severity score of alerts, average response time to resolve incidents and more.

#. **Count**: This is the number of data values that match a query within the selected index pattern. It counts the number of data points in a set and provides the total count of a queried event.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/count-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Count metric aggregation
      :alt: Count metric aggregation

   Count aggregation helps in determining the total number of security events, number of alerts triggered by a specific rule, the number of failed login attempts and more.

#. **Max**: This is the maximum value of a numeric field within a selected index pattern. Max identifies the highest value among a group of values.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/max-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Max metric aggregation
      :alt: Max metric aggregation

   Max aggregation helps in identifying the maximum severity level of alerts, maximum CPU usage, the maximum number of failed login attempts within a given timeframe and more.

#. **Median**: This is the median value in a numeric field. Median determines the middle value in a sorted set of values within a selected index pattern by separating the higher half from the lower half of the data.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/median-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Median metric aggregation
      :alt: Median metric aggregation

   Median aggregation helps to provide the middle value of event durations, helping to identify the typical or median response time.

#. **Min**: This is the minimum value in a numeric field set. Min identifies the lowest value among a group of values.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/min-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Min metric aggregation
      :alt: Min metric aggregation

   Min aggregation helps in determining the minimum severity level of alerts, minimum disk space usage, the minimum number of successful logins and more.

#. **Percentile Ranks**: This is the ranking for values within a given numeric field in percentile. Percentile rank calculates the percentage of values below a specific value in a set and expresses how a given value compares to the distribution of the data.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/percentile-ranks-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Percentile ranks metric aggregation
      :alt: Percentile ranks metric aggregation

   Percentile rank aggregation helps in assessing the relative severity of alerts in comparison to the entire dataset. This determines the percentile rank of a specific severity score.

#. **Percentile**: This aggregation changes numeric field values into percentile bands. Percentile identifies specific data values that correspond to specific percentiles. For example, the 90th percentile represents the value below which 90% of the data falls.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/percentiles-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Percentiles metric aggregation
      :alt: Percentiles metric aggregation

#. **Standard Deviation**: This measures the amount of variation in a set of numeric field values. It evaluates the average distance between each value and the mean value.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/standard-deviation-aggregation.png
      :align: center
      :width: 80%
      :title: Standard deviation metric aggregation
      :alt: Standard deviation metric aggregation

   Standard deviation aggregation can help identify changes in event durations. This provides insights into the volatility or stability of security events.

#. **Sum**: This is the total sum of a numeric field. Sum calculates the total sum of a set of values by adding up all the values in the dataset within a selected index pattern.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/sum-aggregation.png
      :align: center
      :width: 80%
      :title: Sum metric aggregation
      :alt: Sum metric aggregation

   Sum aggregation helps in determining the total count of specific event types, the total number of successful logins, the total disk space used and more.

#. 