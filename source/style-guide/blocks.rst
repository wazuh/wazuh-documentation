.. _blocks:

=============================
Block elements
=============================

Bullet Lists
============

Bullet lists:

- This is item 1
- This is item 2

- Bullets are "-", "*" or "+".
  Continuing text must be aligned
  after the bullet and whitespace.

Note that a blank line is required
before the first item and after the
last, but is optional between items.

Nested bullets:

- Level 1

  - Level 2
  
    - Level 3
    
      - Level 4
      
        - Level 5

Enumerated Lists
================

Enumerated lists:

3. This is the first item
4. This is the second item
5. Enumerators are arabic numbers, single letters, or roman numerals
6. List items should be sequentially numbered, but need not start at 1 (although not all formatters will honour the first index).
#. This item is auto-enumerated

Bullets:

1. Arabic numerals.

   a) lower alpha)

      (i) (lower roman)

          A. upper alpha.

             I) upper roman)

2. Lists that don't start at 1:

   3. Three

   4. Four

   C. C

   D. D

   iii. iii

   iv. iv

#. List items may also be auto-enumerated.

Nested Lists
============

* Unordered item
* Unordered item

  1. Nested ordered item
  2. Nested ordered item
  
     a. Nested ordered item

* Unordered item

----

#. Ordered list
#. Ordered list

   - Nested unordered item
   - Nested unordered item

     #. Ordered list

#. Ordered list

----

a. Ordered list

   1. Nested ordered item

      * Unordered item
      * Unordered item
      
   2. Nested ordered item

      * Unordered item
      * Unordered item

b. Ordered list

   1. Nested ordered item

      * Unordered item
      * Unordered item

   2. Nested ordered item

      * Unordered item
      * Unordered item


---- 

- A) Using bullets and letters. (A)
- B) Using bullets and letters. (B)
- C) Using bullets and letters. (C)

----

Simple
^^^^^^

- A simple list.
- There are no margins between list items.
- Simple lists do not contain multiple paragraphs. That's a complex list.
- In the case of a nested list

  - There are no margins between elements

    - Still no margins

      - Still no margins

Complex
^^^^^^^

- A bullet list

  + Nested bullet list.
  + Nested item 2.

- Item 2.

  Paragraph 2 of item 2.

  * Nested bullet list.
  * Nested item 2.

    - Third level.
    - Item 2.

  * Nested item 3.

- ``inline literal``
- This item has multiple paragraphs.

  This item has multiple paragraphs.
- This item has multiple paragraphs.

  This item has multiple paragraphs.

Block nested in the list
^^^^^^^^^^^^^^^^^^^^^^^^

- here is a list containing other blocks.
- `Google <https://www.google.com>`_

  - `Wazuh <https://www.wazuh.com>`_
  - here is an inner ``bullet``

    - one more ``with an inline literally``. `Wazuh documentation <https://documentation.wazuh.com>`_

      Look at this embed (code block):

      .. code-block:: js
          :linenos:
          
          let str1 = "hellow";
          let str2 = "world";
          let result = str1 + " " + str2
          
  - and another link. `Wazuh <https://www.wazuh.com>`_
  - ``hi``
- how about an admonition?

  .. note::
      This is a note nested in a list.

- The end

Hlists
^^^^^^

.. hlist::
    :columns: 2

    - First item
    - Second item
    - Third item
    - Forth item
    - Fifth item
    - Sixths item
    
.. hlist::
  :columns: 2
  
  - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id eros vitae mi volutpat tincidunt vel sit amet lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tincidunt nisl at tellus mattis ultrices. Aenean faucibus mi et ex lacinia imperdiet. 
  - Suspendisse iaculis dignissim orci non suscipit. Aliquam erat volutpat. Nunc a pellentesque arcu. Donec tristique ex quis arcu luctus, sed vehicula lacus accumsan. Donec sed convallis eros. Quisque ac aliquam arcu, sed luctus metus. 
  - Sed quis tristique lorem, quis maximus dui. Duis tempus dolor id purus posuere, quis semper quam dapibus. Etiam laoreet ante blandit vehicula ullamcorper. 
  - Pellentesque lacinia tellus sit amet lacus ullamcorper elementum. Curabitur gravida purus accumsan justo blandit, vel mattis erat scelerisque.


.. hlist::
    :columns: 3

    - * Item 1-1
    
        Item 1-1 line 2
        
      * Item 1-2
      
    - * Item 2-1
    
      * Item 2-2
      
        Item 2-2 line 2
          
    - * Item 3-1
    
        * Item 3-1-1
          
          * Item 3-1-1-1

.. rubric:: Hlist with images
    :class: h4
    
Note: the line above is a rubric, a paragraph heading that is not meant to appear as a node in the table of contents.

.. hlist::
    :columns: 2

    - .. figure:: ../images/style-guide/wazuh_placeholder_hd.png

         This is a short caption for a figure.

    - .. figure:: ../images/style-guide/wazuh_placeholder_hd.png

         This is a long caption for a figure. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
         Donec porttitor dolor in odio posuere, vitae ornare libero mattis. In lobortis justo vestibulum nibh aliquet, non.

.. hlist::
    :columns: 4

    - .. figure:: ../images/style-guide/wazuh_placeholder_hd.png
    - .. thumbnail:: ../images/style-guide/wazuh_placeholder_hd.png
    - .. image:: ../images/style-guide/wazuh_placeholder_hd.png
    - .. wazuh_image:: ../images/style-guide/wazuh_placeholder_hd.png

Definition Lists
================

Definition lists:

what
  Definition lists associate a term with a definition.

how
  The term is a one-line phrase, and the definition is one or more paragraphs or body elements, indented relative to the term. Blank lines are not allowed between term and definition.

Field Lists
===========

:Authors:
    Tony J. (Tibs) Ibbs,
    David Goodger
    (and sundry other good-natured folks)

:Version: 1.0 of 2001/08/08
:Dedication: To my father.

Option Lists
============

For listing command-line options:

-a            command-line option "a"
-b file       options can have arguments and long descriptions
--long        options can be long also
--input=file  long options can also have arguments

--very-long-option
              The description can also start on the next line.

              The description may contain multiple body elements,
              regardless of where it starts.

-x, -y, -z    Multiple options are an "option group".
-v, --verbose  Commonly-seen: short & long options.
-1 file, --one=file, --two file
              Multiple options with arguments.
/V            DOS/VMS-style options too

There must be at least two spaces between the option and the description.

Literal Blocks
==============

A paragraph containing only two colons indicates that the following indented or quoted text is a literal block.

::

  Whitespace, newlines, blank lines, and all kinds of markup (like *this* or \this) is preserved by literal blocks.

  The paragraph containing only '::' will be omitted from the result.

The ``::`` may be tacked onto the very end of any paragraph. The ``::`` will be omitted if it is preceded by whitespace.
The ``::`` will be converted to a single colon if preceded by text, like this::

  It's very convenient to use this form.

Literal blocks end when text returns to the preceding paragraph's indentation.
This means that something like this is possible::

      We start here
    and continue here
  and end here.

Per-line quoting can also be used on unindented literal blocks::

> Useful for quotes from email and
> for Haskell literate programming.

.. warning::
  :class: long

  We recommend against the use of ``::`` since, once parsed, the result might not be the one expected. Instead, we prefer the use of code-blocks. For example, this one doesn't contain highlighted keywords:

  .. code-block:: none

    > Useful for quotes from email and
    > for Haskell literate programming.
  
  An the next one contains highlights for Powershell:
  
  .. code-block:: powershell

    > echo "You should see appropriate colored highlight here" >> file.txt
    > exit

Line Blocks
===========

| Line blocks are useful for addresses,
| verse, and adornment-free lists.
|
| Each new line begins with a
| vertical bar ("|").
|     Line breaks and initial indents
|     are preserved.
| Continuation lines are wrapped
  portions of long lines; they begin
  with spaces in place of vertical bars.

Block Quotes
============

Block quotes are just:

    Indented paragraphs (though not when the HTML is rendered in our case),

        and they may nest.

Tables
======

Grid table:

+------------+------------+-----------+
| Header 1   | Header 2   | Header 3  |
+============+============+===========+
| body row 1 | column 2   | column 3  |
+------------+------------+-----------+
| body row 2 | Cells may span columns.|
+------------+------------+-----------+
| body row 3 | Cells may  | - Cells   |
+------------+ span rows. | - contain |
| body row 4 | [#fn1]_    | - blocks. |
+------------+------------+-----------+

Simple table:

=====  =====  ======
   Inputs     Output
------------  ------
  A      B    A or B
=====  =====  ======
False  False  False
True   False  True
False  True   True
True   True   True
=====  =====  ======

Giant Tables
^^^^^^^^^^^^

+------------+------------+-----------+------------+------------+-----------+------------+------------+-----------+------------+------------+-----------+
| Header 1   | Header 2   | Header 3  | Header 1   | Header 2   | Header 3  | Header 1   | Header 2   | Header 3  | Header 1   | Header 2   | Header 3  |
+============+============+===========+============+============+===========+============+============+===========+============+============+===========+
| body row 1 | column 2   | column 3  | body row 1 | column 2   | column 3  | body row 1 | column 2   | column 3  | body row 1 | column 2   | column 3  |
+------------+------------+-----------+------------+------------+-----------+------------+------------+-----------+------------+------------+-----------+
| body row 1 | column 2   | column 3  | body row 1 | column 2   | column 3  | body row 1 | column 2   | column 3  | body row 1 | column 2   | column 3  |
+------------+------------+-----------+------------+------------+-----------+------------+------------+-----------+------------+------------+-----------+
| body row 1 | column 2   | column 3  | body row 1 | column 2   | column 3  | body row 1 | column 2   | column 3  | body row 1 | column 2   | column 3  |
+------------+------------+-----------+------------+------------+-----------+------------+------------+-----------+------------+------------+-----------+
| body row 1 | column 2   | column 3  | body row 1 | column 2   | column 3  | body row 1 | column 2   | column 3  | body row 1 | column 2   | column 3  |
+------------+------------+-----------+------------+------------+-----------+------------+------------+-----------+------------+------------+-----------+

List Tables
^^^^^^^^^^^

.. list-table:: List tables can have captions like this one.
    :widths: 10 5 10 50
    :header-rows: 1
    :stub-columns: 1

    * - List table
      - Header 1
      - Header 2
      - Header 3 long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet mauris arcu.
    * - Stub Row 1
      - Row 1
      - Column 2
      - Column 3 long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet mauris arcu.
    * - Stub Row 2
      - Row 2
      - Column 2
      - Column 3 long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet mauris arcu.
    * - Stub Row 3
      - Row 3
      - Column 2
      - Column 3 long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet mauris arcu.

.. list-table:: This is a list table with images in it.
    :class: align-cells-top

    * - .. figure:: ../images/style-guide/wazuh_placeholder_hd.png

           
           This is a short caption for a figure.

      - .. figure:: ../images/style-guide/wazuh_placeholder_hd.png

           
           This is a long caption for a figure. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Donec porttitor dolor in odio posuere, vitae ornare libero mattis. In lobortis justo vestibulum nibh aliquet, non.


List-rows tables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: list-rows type table.
    :header-rows: 0
    :stub-columns: 0
    :class: list-rows align-cells-bottom
    :widths: 10 20 20 50
    
    * - .. figure:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
      - .. thumbnail:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
      - .. image:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
      - .. wazuh_image:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
    * - .. figure:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
      - .. thumbnail:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
      - .. image:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
      - .. wazuh_image:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins


.. list-table:: 
    :header-rows: 0
    :stub-columns: 0
    :class: list-rows
    
    * - .. figure:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
      - .. thumbnail:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
      - .. image:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
      - .. wazuh_image:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
    * - .. figure:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
      - .. thumbnail:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
      - .. image:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins
      - .. wazuh_image:: ../images/style-guide/wazuh_placeholder_hd.png
           :class: no-margins

List-tables for release notes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rubric:: Manager
   :class: h5

.. list-table:: 
    :widths: 15 95
    :stub-columns: 1
    :class: release-notes

    * - `#9779 <https://github.com/wazuh/wazuh/pull/9779>`_ 
      - Authd now refuses enrollment attempts if the agent already holds a valid key. With this added feature, Authd can only generate new keys if the agent key does not exist on the manager side. Based on this, the manager has the capability to decide if a new key should be generated or not. Since the introduction of *Enrollment* in version 4.0.0, Wazuh provides the user with an automated mechanism to enroll agents with minimal configuration. This registration method might cause agents to self-register under certain circumstances, even if they were already registered. This improvement prevents this issue from happening and avoids re-registering agents that already have valid keys. 

.. rubric:: Agent
   :class: h5

.. list-table:: 
    :widths: 15 95
    :header-rows: 0
    :stub-columns: 1
    :class: release-notes

    * - `#9927 <https://github.com/wazuh/wazuh/pull/9927>`_ 
      - The Google Cloud Pub/Sub integration module is updated to increase processed events per second. The rework of this integration module allows multithreading, increases performance significantly, and adds a new ``num_threads`` option to the module configuration. The new multithreading feature allows pulling messages with multiple subscribers simultaneously, improving the performance drastically. In addition, this new Google Cloud integration includes some improvements in the pulling and acknowledging mechanism, and the socket connection as well.

.. rubric:: Wazuh Kibana plugin
   :class: h5

.. list-table:: 
    :widths: 15 95
    :class: release-notes

    * - `#3175 <https://github.com/wazuh/wazuh-kibana-app/pull/3175>`_ 
      - Wazuh improves the API selector and Index pattern selector of the Wazuh Kibana plugin, moving both from the main menu to the upper right corner of the header bar for quick access. This new UX improvement allows users to have better management of these two features.  As for visualization, the  **API** selector is displayed when there is more than one to select. The **Index pattern** selector is displayed under the same conditions and only contains index patterns that have Wazuh alerts.

    * - `#3503 <https://github.com/wazuh/wazuh-kibana-app/pull/3503>`_
      - Wazuh adds a new functionality that allows users to change the logotype settings of the Wazuh Kibana plugin. From the **Logo Customization** section of the **Configuration** page, users can customize the logos of the app easily and to their liking. Setting options include customization of **Logo App**, **Logo Sidebar**, **Logo Health Check**, and **Logo Reports**. 

        .. thumbnail:: ../images/style-guide/wazuh_placeholder_small.png
         :alt: Logo customization settings
         :align: center
         :wrap_image: No

Transitions
===========

Transition marker is a horizontal line of 4 or more repeated punctuation characters.

------------

A transition should not begin or end a section or document, nor should two transitions be immediately adjacent.

Footnotes
==========

The text can contain **footnotes** [#fn2]_.

.. [#fn1]
    This is a **footnote**. You can find its reference inside a table some sections above (click the link in this line).
    
.. [#fn2]
    This is another **footnote**.

Images
======

Image
^^^^^

.. rubric:: Images using the directive ``image``
  :class: h5

.. image:: ../images/style-guide/wazuh_placeholder_hd.png
  :height: 200px
  :width: 200px
  :align: right
  :target: `Tables`_

.. image:: ../images/style-guide/wazuh_placeholder_4k.png

.. image:: ../images/style-guide/wazuh_placeholder_medium.png

.. image:: ../images/style-guide/wazuh_placeholder_small.png

.. image:: ../images/style-guide/wazuh_placeholder_small_white_bg.png

.. rubric:: Images using the directive ``wazuh_image``
  :class: h5

Wazuh Image
^^^^^^^^^^^

These images can be opened in the light-box (requires our custom extension ``wazuh-doc-images``).

.. wazuh_image:: ../images/style-guide/wazuh_placeholder_hd.png
  :height: 200px
  :width: 200px
  :align: right
  :target: `Tables`_

.. wazuh_image:: ../images/style-guide/wazuh_placeholder_4k.png

.. wazuh_image:: ../images/style-guide/wazuh_placeholder_medium.png

.. wazuh_image:: ../images/style-guide/wazuh_placeholder_small.png

.. wazuh_image:: ../images/style-guide/wazuh_placeholder_small_white_bg.png

Thumbnail
^^^^^^^^^

These images can be opened in the light-box (requires our custom extension ``wazuh-doc-images``).

.. thumbnail:: ../images/style-guide/wazuh_placeholder_hd.png

.. thumbnail:: ../images/style-guide/wazuh_placeholder_4k.png

.. thumbnail:: ../images/style-guide/wazuh_placeholder_medium.png

.. thumbnail:: ../images/style-guide/wazuh_placeholder_small.png

.. thumbnail:: ../images/style-guide/wazuh_placeholder_small_white_bg.png

Figure
^^^^^^

.. figure:: ../images/style-guide/wazuh_placeholder_hd.png
  :height: 200px

.. figure:: ../images/style-guide/wazuh_placeholder_4k.png

.. figure:: ../images/style-guide/wazuh_placeholder_medium.png

.. figure:: ../images/style-guide/wazuh_placeholder_small.png

.. figure:: ../images/style-guide/wazuh_placeholder_small_white_bg.png

Comments
========

.. This text will not be shown
   (but, for instance, in HTML might be
   rendered as an HTML comment)	 

An "empty comment" does not consume following blocks.
(An empty comment is ".." with blank lines before and after.)

..

        So this block is not "lost",
        despite its indentation.
