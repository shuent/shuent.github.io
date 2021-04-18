const dateFormat = require('dateformat')

module.exports = {
  fileName: 'title', // required
  directory: 'contents/posts', // required
  prefix: dateFormat(new Date(), 'yyyy-mm-dd-'),
  template: 'contents/blogTemplate.md',
  builtinAttribute: {
    date: 'yyyy-mm-dd',
  },
}
