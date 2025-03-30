
## PDF Compression Levels

When you use the compression API, select the level of compression you want to apply to your PDF file in the `compression_level` setting.

We provide three standard values for compressing your PDF document:

1. `high` Make the PDF file as small as possible. This may reduce the quality of the output. If you choose `high`, you may see a difference in the way the PDF document renders when you print it or open it in a viewing tool.
2. `medium` A balance between `high` and `low` compression.
3. `low` Preserve the quality of the PDF file at the expense of file size optimization.

### Compression Effects

The `compression_level` parameter applies different effects to different resources within a PDF. The following is a list of how `high`, `medium`, and `low` affect resources such as images, transparencies, and more:

#### Images


::tabs{variant="card"}
  ::div{label="Images"}
  The final quality of images in the PDF file after compression.

- `high` Minimum size. Compress images aggressively to reduce the size of the PDF file.
- `medium` A balance between high and low.
- `low` Maximum size. Protect the final appearance of the images at the cost of a larger file size.
  ::
  ::div{label="Fonts"}
The fonts that are included, removed, and/or subsetted.

- `high` Remove all unneeded fonts. Subset, remove unused fonts, consolidate duplicate fonts, and unembed base 14 fonts.
- `medium` Same as High, but don’t subset fonts.
- `low` No font changes.
  ::
  ::div{label="Objects"}
Discard objects embedded in the PDF document to make it smaller.

- `high` Throw away everything, including embedded JavaScript code, bookmarks, thumbnails, and other objects.
- `medium` Only remove alternate images.
- `low` No object changes.
  ::
  ::div{label="User Data"}
Discard metadata and information in the PDF document to make it smaller.

- `high` Throw away metadata, comments, attachments, and other specialized content.
- `medium` No user data changes.
- `low` No user data changes.
  ::
  ::div{label="Cleanup"}
General file compression settings.

- `high` All file compression settings turned on.
- `medium` All file compression settings turned on.
- `low` Only compress document structure and optimize file.
  ::
  ::div{label="Color Conversion"}
Adjusts whether color conversion is enabled.

- `high` Color conversion enabled. Decalibrate, switch to standard profile srgb.
- `medium` Color conversion turned off.
- `low` Color conversion turned off.
  ::
  ::div{label="Transparency"}
To flatten transparencies in a PDF input document, add one of these `quality`settings to your JSON profile file. If you don't include the `quality` setting in your JSON profile, the pdfRest API will not flatten transparencies.

- `high` Line art and text 1200 DPI, gradients 300 DPI
- `medium` Line art and text 300 DPI, gradients 150 DPI
- `low` Line art and text 288 DPI, gradients 144 DPI
  ::
::
