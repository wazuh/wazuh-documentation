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
      :title: Average metrics aggregation
      :alt: Average metrics aggregation

   Average aggregation helps in calculating the average duration of security incidents, average severity score of alerts, average response time to resolve incidents and more.

#. **Count**: This is the number of data values that match a query within the selected index pattern. It counts the number of data points in a set and provides the total count of a queried event.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/count-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Count metrics aggregation
      :alt: Count metrics aggregation

   Count aggregation helps in determining the total number of security events, number of alerts triggered by a specific rule, the number of failed login attempts and more.

#. **Max**: This is the maximum value of a numeric field within a selected index pattern. Max identifies the highest value among a group of values.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/max-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Max metrics aggregation
      :alt: Max metrics aggregation

   Max aggregation helps in identifying the maximum severity level of alerts, maximum CPU usage, the maximum number of failed login attempts within a given timeframe and more.

#. **Median**: This is the median value in a numeric field. Median determines the middle value in a sorted set of values within a selected index pattern by separating the higher half from the lower half of the data.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/median-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Median metrics aggregation
      :alt: Median metrics aggregation

   Median aggregation helps to provide the middle value of event durations, helping to identify the typical or median response time.

#. **Min**: This is the minimum value in a numeric field set. Min identifies the lowest value among a group of values.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/min-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Min metrics aggregation
      :alt: Min metrics aggregation

   Min aggregation helps in determining the minimum severity level of alerts, minimum disk space usage, the minimum number of successful logins and more.

#. **Percentile Ranks**: This is the ranking for values within a given numeric field in percentile. Percentile rank calculates the percentage of values below a specific value in a set and expresses how a given value compares to the distribution of the data.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/percentile-ranks-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Percentile ranks metrics aggregation
      :alt: Percentile ranks metrics aggregation

   Percentile rank aggregation helps in assessing the relative severity of alerts in comparison to the entire dataset. This determines the percentile rank of a specific severity score.

#. **Percentile**: This aggregation changes numeric field values into percentile bands. Percentile identifies specific data values that correspond to specific percentiles. For example, the 90th percentile represents the value below which 90% of the data falls.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/percentiles-metric-aggregation.png
      :align: center
      :width: 80%
      :title: Percentiles metrics aggregation
      :alt: Percentiles metrics aggregation

#. **Standard Deviation**: This measures the amount of variation in a set of numeric field values. It evaluates the average distance between each value and the mean value.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/standard-deviation-aggregation.png
      :align: center
      :width: 80%
      :title: Standard deviation metrics aggregation
      :alt: Standard deviation metrics aggregation

   Standard deviation aggregation can help identify changes in event durations. This provides insights into the volatility or stability of security events.

#. **Sum**: This is the total sum of a numeric field. Sum calculates the total sum of a set of values by adding up all the values in the dataset within a selected index pattern.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/sum-aggregation.png
      :align: center
      :width: 80%
      :title: Sum metrics aggregation
      :alt: Sum metrics aggregation

   Sum aggregation helps in determining the total count of specific event types, the total number of successful logins, the total disk space used and more.

#. **Top Hit**: This aggregation identifies the top data point based on a specified criteria or sort order. Top hit is commonly used to extract specific information from the dataset based on the top metric.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/top-hit-aggregation.png
      :align: center
      :width: 80%
      :title: Top Hit metrics aggregation
      :alt: Top Hit metrics aggregation

   Top hit aggregation helps in extracting key information from security events, such as retrieving the most recent log entry for a particular host or user.

#. **Unique Count**: This is the count of unique values within a designated field. It counts the number of unique or distinct values in a set. Unique count disregards any duplicate event and provides the count of unique values.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/unique-count-aggregation.png
      :align: center
      :width: 80%
      :title: Unique Count metrics aggregation
      :alt: Unique Count metrics aggregation

   Unique count aggregation helps in determining the number of distinct IP addresses accessing a system, the number of unique users triggering alerts, the count of unique event types and more.

Parent Pipeline Aggregations
............................

#. **Cumulative Sum**: This is the calculation of the running sum of a metric across a specified set of data points. It shows the progressive total as each data point is added.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/cumulative-sum-aggregation.png
      :align: center
      :width: 80%
      :title: Cumulative Sum metrics aggregation
      :alt: Cumulative Sum metrics aggregation

   Cumulative sum aggregation can be used to track the total count of security events over time, providing insights into the cumulative impact of incidents.

#. **Derivative**: This is the calculation of the rate of change of values over time. Derivative is the difference between consecutive values in a time series or dataset.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/derivative-aggregation.png
      :align: center
      :width: 80%
      :title: Derivative metrics aggregation
      :alt: Derivative metrics aggregation
   
   Derivative aggregation helps in calculating the rate of change in event counts or severity scores. This enables the detection of sudden spikes or anomalies.

#. **Moving Avg**: This is the calculation of the average of a metric over a moving window of data points. It provides a neat representation of the data, hence reducing noise or fluctuations.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/moving-avg-aggregation.png
      :align: center
      :width: 80%
      :title: Moving Avg metrics aggregation
      :alt: Moving Avg metrics aggregation

   Moving average aggregation helps in smoothing out fluctuations in event counts or resource usage, enabling trend analysis or anomaly detection.

#. **Serial Diff**: This is the difference between consecutive values in a time series or ordered dataset. It measures the absolute change from one data point to the next.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/serial-diff-aggregation.png
      :align: center
      :width: 80%
      :title: Serial Diff metrics aggregation
      :alt: Serial Diff metrics aggregation

   Serial diff aggregation helps in identifying the difference in event counts or resource usage between consecutive data points, showing changes or trends.

Sibling Pipeline Aggregations
.............................

#. **Average Bucket**: This is the average value of a metric within each bucket of a specified aggregation. Average bucket provides the average value per group or category.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/average-bucket-aggregation.png
      :align: center
      :width: 80%
      :title: Average Bucket metrics aggregation
      :alt: Average Bucket metrics aggregation

   Average bucket aggregation helps in calculating the average severity score or event count within specific time intervals or categories.

#. **Max Bucket**: This is the maximum value of a metric within each bucket of a specified aggregation. It identifies the highest value per group.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/max-bucket-aggregation.png
      :align: center
      :width: 80%
      :title: Max Bucket metrics aggregation
      :alt: Max Bucket metrics aggregation

   Max bucket aggregation enables the identification of the maximum severity level or event count within specific time intervals or categories.

#. **Min Bucket**: This is the minimum value of a metric within each bucket of a specified aggregation. It identifies the lowest value per group or category.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/min-bucket-aggregation.png
      :align: center
      :width: 80%
      :title: Min Bucket metrics aggregation
      :alt: Min Bucket metrics aggregation
   
   Min bucket aggregation helps identify the minimum severity level or event count within specific time intervals or categories.

#. **Sum Bucket**: This is the total sum of a metric within each bucket of a specified aggregation. It adds up the values per group.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/sum-bucket-aggregation.png
      :align: center
      :width: 80%
      :title: Sum Bucket metrics aggregation
      :alt: Sum Bucket metrics aggregation

   Sum bucket aggregation helps in calculating the total count or severity score within specific time intervals or categories.

Bucket aggregation
''''''''''''''''''

This is used to determine the type of information we are trying to get from the dataset. The bucket aggregation determines how the data is segmented or grouped such as by date. It is typically represented on the X-axis.

These are the following types of bucket aggregations for a pie chart:

#. **Date Histogram**: This aggregation is used to display a numeric field and organize that using the date.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/date-histogram-aggregation.png
      :align: center
      :width: 80%
      :title: Date Histogram buckets aggregation
      :alt: Date Histogram buckets aggregation

#. **Date Range**: This aggregation is used to report the values within a date range which we can specify.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/date-range-aggregation.png
      :align: center
      :width: 80%
      :title: Date Range buckets aggregation
      :alt: Date Range buckets aggregation

#. **Filters**: This aggregation is used to apply filters on data.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/filters-aggregation.png
      :align: center
      :width: 80%
      :title: Filters buckets aggregation
      :alt: Filters buckets aggregation

#. **Histogram**: This aggregation is used for numeric fields, where we can provide the integer interval for the selected field.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/histogram-aggregation.png
      :align: center
      :width: 80%
      :title: Histogram buckets aggregation
      :alt: Histogram buckets aggregation

#. **IPv4 Range**: This aggregation provides us with the option to set the range using IPv4 addresses.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/ipv4-range-aggregation.png
      :align: center
      :width: 80%
      :title: IPv4 Range buckets aggregation
      :alt: IPv4 Range buckets aggregation

#. **Range**: This aggregation is used to provide the range of numeric field values.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/range-aggregation.png
      :align: center
      :width: 80%
      :title: Range buckets aggregation
      :alt: Range buckets aggregation

#. **Significant Terms**: This aggregation returns interesting or unusual occurrences of terms in a set.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/significant-terms-aggregation.png
      :align: center
      :width: 80%
      :title: Significant Terms buckets aggregation
      :alt: Significant Terms buckets aggregation

#. **Terms**: This aggregation enables us to pick the top or bottom n elements of the selected field.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/terms-aggregation.png
      :align: center
      :width: 80%
      :title: Terms buckets aggregation
      :alt: Terms buckets aggregation

Both the Y-axis and the X-axis are used to plot the data points on a visualization chart.

Basic charts
^^^^^^^^^^^^

The following is a list of the basic charts for visualization:

-  **Bar, area, and line charts**: These charts are used for comparing different series in x and y axis.
-  **Pie charts**: These charts are used when all of the fields are related to each other; for example, the voting percentage for different parties in an election.
-  **Heat maps**: These are used to shade the cells within a matrix.

Bar charts
~~~~~~~~~~

Bar charts are a type of visualization that are used to compare specific measures for different data categories. These are the most common type of visualization, and are easy to create and interpret. Bar charts are used to present categorical data in the form of rectangular bars with heights/lengths that are proportional to the given values.

Creating a Bar chart
''''''''''''''''''''

**Horizontal Bar**: This is a type of bar chart where rectangular bars are displayed horizontally. The length or width of each bar corresponds to a particular value. This allows an easy comparison between different data points. Horizontal bar charts are often used to visualize data that has distinct categories or to show rankings.

#. From the **Visualize** tab, click **Create Visualization**, select the ``Horizontal bar`` visualization format and use ``wazuh-alerts-*`` as the index pattern name.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/create-horizontal-bar-visualization.png
      :align: center
      :width: 80%
      :title: Create horizontal bar visualization
      :alt: Create horizontal bar visualization

#. In the ``Data`` section, on the ``Y-axis`` of **Metrics**, set the following value:

   -  ``Aggregation`` = ``Count``

#. Add a ``X-axis`` in **Bucket** and set the following values:

   -  ``Aggregation`` = ``Terms``
   -  ``Field`` = ``rule.mitre.tactic``
   -  ``Order by`` = ``Metric: Count``
   -  ``Order`` = ``Descending``
   -  ``Size`` = ``10``

#. Click the **Update** button.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/create-horizontal-bar-visualization-update-button.png
      :align: center
      :width: 80%
      :title: Create horizontal bar visualization – Update button
      :alt: Create horizontal bar visualization – Update button

#. Click the upper-right **Save** button and assign a title to save the visualization.

**Vertical Bar**: This is a type of bar chart where the bars are displayed vertically, with the length or height of each bar representing a particular value. Vertical bar charts are suitable for comparing data across different categories. They are commonly used to display rankings, comparisons, or distribution of values.

#. From the **Visualize** tab, select the ``Vertical Bar`` visualization format and use ``wazuh-alerts-*`` as the index pattern name.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/create-vertical-bar-visualization.png
      :align: center
      :width: 80%
      :title: Create vertical bar visualization
      :alt: Create vertical bar visualization

#. In the ``Data`` section, on the ``Y-axis`` of **Metrics**, set the following value:

   -  ``Aggregation`` = ``Count``

#. Add a ``X-axis`` in **Bucket** and set the following values:

   -  ``Aggregation`` = ``Terms``
   -  ``Field`` = ``rule.mitre.tactic``
   -  ``Order by`` = ``Metric: Count``
   -  ``Order`` = ``Descending``
   -  ``Size`` = ``10``

#. Click the **Update** button.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/create-vertical-bar-visualization-update-button.png
      :align: center
      :width: 80%
      :title: Create vertical bar visualization – Update button
      :alt: Create vertical bar visualization – Update button

#. Click the upper-right **Save** button and assign a title to save the visualization.

Pie charts
~~~~~~~~~~

This is a circular chart that is divided into sectors, with each sector representing a percentage of a whole data set. They are commonly used to show market share, composition of data, or distribution of categories.

The total slice size of a pie chart is calculated by the metrics aggregation. In the case of a pie chart, we use the count, sum, unique count.

Creating a Pie chart
''''''''''''''''''''

#. From the **Visualize** tab, click **Create Visualization**, select the ``Pie`` visualization format and use ``wazuh-alerts-*`` as the index pattern name.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/create-pie-visualization.png
      :align: center
      :width: 80%
      :title: Create pie visualization
      :alt: Create pie visualization

#. In the ``Data`` section, on the ``Slice size`` of **Metrics**, set the following value:

   -  ``Aggregation`` = ``Count``

#. Add a ``Split slices`` in **Bucket** and set the following values:

   -  ``Aggregation`` = ``Terms``
   - ``Field`` = ``rule.mitre.tactic``
   -  ``Order by`` = ``Metric: Count``
   -  ``Order`` = ``Descending``
   -  ``Size`` = ``10``

#. In the ``Options`` section, customize the Pie chart by toggling on ``show label``.

#. Click the **Update** button.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/create-pie-visualization-update-button.png
      :align: center
      :width: 80%
      :title: Create pie visualization – Update button
      :alt: Create pie visualization – Update button

#. Click the upper-right **Save** button and assign a title to save the visualization.

Area charts
~~~~~~~~~~~

This is used to display graphically quantitative data using filled-in areas. The areas between axes and lines are typically filled with colors or patterns to differentiate between different categories or data points. This emphasizes the quantity beneath a line chart.

Area charts are useful for showing the magnitude and distribution of data over time or categories. They are often used to display trends, comparisons, or cumulative values.

Creating a Area chart
'''''''''''''''''''''

#. From the **Visualize** tab, click **Create Visualization**, select the ``area`` visualization format, and use ``wazuh-alerts-*`` as the index pattern name.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/create-area-visualization.png
      :align: center
      :width: 80%
      :title: Create area visualization
      :alt: Create area visualization

#. On the ``Y-axis`` of **Metrics**, set the following values:

   -  ``Aggregation`` = ``Max``
   -  ``Field`` = ``data.memory.used_bytes``

#. Add another ``Y-axis`` in **Metric** and set the following values:

   -  ``Aggregation`` = ``Max``
   -  ``Field`` = ``data.memory.available_bytes``

#. Add an ``X-axis`` in **Bucket** and set the following values:

   -  ``Aggregation`` = ``Date Histogram``
   -  ``Field`` = ``timestamp``

#. Click the **Update** button.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/create-area-visualization-update-button.png
      :align: center
      :width: 80%
      :title: Create area visualization – Update button
      :alt: Create area visualization – Update button

#. Click the upper-right **Save** button and assign a title to save the visualization.

Line charts
~~~~~~~~~~~

This visualization represents data points connected by straight lines. It is commonly used to display trends, patterns, relationships over time or a continuous range. By plotting data along a Cartesian coordinate system, lines are drawn to connect the data points. This provides a clear depiction of how the values change.

Creating a Line chart
'''''''''''''''''''''

#. From the **Visualize** tab, click **Create Visualization**, select the ``Line`` visualization format and use ``wazuh-alerts-*`` as the index pattern name. 

#. On the ``Y-axis``, in **Metrics**, set the following values:

   -  ``Aggregation`` = ``Max``
   -  ``Field`` = ``data.memory.usage_%``

#. Add an ``X-axis`` in **Buckets** and set the following values:

   -  ``Aggregation`` = ``Date Histogram``
   -  ``Field`` = ``timestamp``
   -  ``Minimum interval`` = ``Minute``

#. Click the **Update** button.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/create-line-visualization-update-button.png
      :align: center
      :width: 80%
      :title: Create line visualization – Update button
      :alt: Create line visualization – Update button

#. Click the upper-right **Save** button and assign a title to save the visualization.

Heat maps
~~~~~~~~~

This is a graphical representation that uses colors to visualize the density of certain variables. Heat maps display data points as colored cells, with each color representing a different value or level of intensity.

Heat maps are useful for identifying patterns, trends, or variations within a dataset.

Creating a Heat Map
'''''''''''''''''''

#. From the **Visualize** tab, click **Create Visualization**, select the ``Heat Map`` visualization format and use ``wazuh-alerts-*`` as the index pattern name.

   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/create-heat-map-visualization.png
      :align: center
      :width: 80%
      :title: Create heat map visualization
      :alt: Create heat map visualization

#. On the ``Y-axis``, in **Metrics**, set the following value:

   -  ``Aggregation`` = ``Count``

#. Add an ``X-axis`` in **Buckets** and set the following values:

   -  ``Aggregation`` = ``Terms``
   -  ``Field`` = ``rule.mitre.tactic``
   -  ``Order by`` = ``Metric: Count``
   -  ``Order`` = ``Descending``
   -  ``Size`` = ``5``

#. Add a ``Y-axis`` in **Buckets** and set the following values:

   -  ``Aggregation`` = ``Terms``
   -  ``Field`` = ``rule.mitre.techniques``
   -  ``Order by`` = ``Metric: Count``
   -  ``Order`` = ``Descending``
   -  ``Size`` = ``5``

#. Click the **Update** button.


   .. thumbnail:: /images/wazuh-dashboard/custom-dashboards/create-heat-map-visualization-update-button.png
      :align: center
      :width: 80%
      :title: Create heat map visualization – Update button
      :alt: Create heat map visualization – Update button

Data
^^^^
