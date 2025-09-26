# ReStructured Text cheatsheet

## Inline markup

```
*text*    // emphasis (italics)
**text**  // strong emphasis (boldface)
``text``  // code samples
```

- Remove any trailing or leading spaces in marked text.
- Separate marked text from the rest of the content using spaces or new lines.

## Titles

```
####### *******
Title 1 Title 2 Title 3 Title 4 Title 5 Title 6
####### ******* ======= ------- ^^^^^^^ """""""
```

## Links

```
`Link text <Link URL>`
```

- Remove any trailing or leading spaces between the backticks.
- There must be a space separating text and link.
- Separate links from the rest of the content using spaces or new lines.

## Code blocks

```
.. code-block:: <language>

  <content>
```

- Content must have one level of indentation more than block header.
- There must be a space separating the `code-block::` directive and the name of the programming language.
- Use 'default' as a programming language to prevent code from being pigmented.
- There must be a blank line (two carriage returns) separating the header and the content.
- If [the code-block is inside a list](https://github.com/wazuh/wazuh-documentation/blob/master/guide/good-practices.md#code-blocks-inside-lists), pay attention to its indentation.

## Notes and warnings

```
.. note::

  This is note text. Use a note for information you want the user to pay particular attention to.

.. warning::

  This is warning text. Use a warning for information the user must understand to avoid negative consequences.
```

- Content must have one level of indentation more than block header.
- There must be a blank line (two carriage returns) separating the header and the content.

## Alerts

Alerts are note-like blocks used for more specific purpose. They will be displayed in a colored box to convey its meaning.

```
.. attention::

  <content>.

.. caution::

  <content>.

.. danger::

  <content>.

.. error::

  <content>.

.. hint::

  <content>.

.. important::

  <content>.

.. tip::

  <content>.
```

- Content must have one level of indentation more than block header.
- There must be a blank line (two carriage returns) separating the header and the content.

## Admonitions

Admonitions are note-like blocks with a custom title.

```
.. admonition:: <title>

  <content>
```

- Content must have one level of indentation more than block header.
- There must be a space separating the `admonition::` directive and the title.
- There must be a blank line (two carriage returns) separating the header and the content.

## Tables

Tables are easier to manage using an automatic generator:

- [Online table generator](https://www.tablesgenerator.com/text_tables)
- [Table editor for Atom](https://atom.io/packages/table-editor)
- [Table editor for VSCode](https://marketplace.visualstudio.com/items?itemName=shuworks.vscode-table-formatter)
- [Table editor for VIM](https://www.vim.org/scripts/script.php?script_id=3041)

```
+----------------------+----------+----------+----------+
| Header row, column 1 | Header 2 | Header 3 | Header 4 |
+======================+==========+==========+==========+
| body row 1, column 1 | column 2 | column 3 | column 4 |
+----------------------+----------+----------+----------+
| body row 2, column 1 | Cells may span several columns |
+----------------------+----------+----------+----------+
| body row 3, column 1 | And also | column 3 | column 4 |
+----------------------+          +----------+----------+
| body row 4, column 1 | several  | column 3 | column 4 |
+----------------------+          +----------+----------+
| body row 5, column 1 | rows     | column 3 | column 4 |
+----------------------+----------+----------+----------+
```

- `+` for table vertices.
- `|` for vertical borders.
- `-` for horizontal borders.
- `=` for header/body separation.

Simplified table syntax:

```
======== ======= ===========
 Header1 Header2 Header3
======== ======= ===========
Lorem    ipsum   dolor
sit      amet    consectetur  
======== ======= ===========
```

## Lists

```
* Unordered lists
* Are usually displayed using bullets
  * Can be nested
  * Nested item

#. Ordered lists
#. Using # will generate list numbers automatically
  #. Ordered lists can be nested as well
  #. Nested item

1. Another way of defining ordered lists
2. Hardcoding list numbers is harder to maintain
3. Please use # lists instead

* Unordered lists
  #. Can have nested ordered lists

#. And it also works
  * The other way around
```

## Images

```
.. image:: path/to/image.jpg
  :title: Image title
  :align: center
  :width: 80%
```

- Full list of image options [here](https://docutils.sourceforge.io/docs/ref/rst/directives.html#images).
- There must be a space separating the `image::` directive and the image URL.
- Image options must have one level of indentation more than image header.
