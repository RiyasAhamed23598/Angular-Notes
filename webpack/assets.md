## 4 types of Asset Modules

- **asset/resoursce** - can be used for import large images or large font files
- **asset/inline** - for small files like svg, injected directly in js bundle, doesn't generate a new file in output folder
- **asset** - general asset type, webpack will automatically choose if asset file more or less than 8kb. We can change this magic number
- **asset/sourse** - for plain text or js code, injects in bundle as a string of text
