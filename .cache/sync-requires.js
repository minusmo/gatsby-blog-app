const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-index-js": hot(preferDefault(require("/Users/eumhojun/Desktop/Workspace/hello-friends/src/templates/index.js"))),
  "component---src-templates-page-js": hot(preferDefault(require("/Users/eumhojun/Desktop/Workspace/hello-friends/src/templates/page.js"))),
  "component---src-templates-tags-js": hot(preferDefault(require("/Users/eumhojun/Desktop/Workspace/hello-friends/src/templates/tags.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/eumhojun/Desktop/Workspace/hello-friends/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/eumhojun/Desktop/Workspace/hello-friends/src/pages/404.js")))
}

