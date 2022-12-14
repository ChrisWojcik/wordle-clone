module.exports = ({ htmlWebpackPlugin }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>${htmlWebpackPlugin.options.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      ${htmlWebpackPlugin.tags.headTags}
    </head>
    <body>
      <div id="app"></div>

      ${htmlWebpackPlugin.tags.bodyTags}
    </body>
  </html>
`;
