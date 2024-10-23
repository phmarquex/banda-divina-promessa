// check-npm.js
if (!process.env.npm_execpath.includes('pnpm')) {
  console.error('You must use pnpm to install dependencies. Please run "pnpm install" instead of "npm install".')
  process.exit(1)
}
