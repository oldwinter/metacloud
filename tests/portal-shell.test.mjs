import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function read(rel) {
  return readFileSync(join(root, rel), 'utf8')
}

test('index.html title is metacloud and empty qiankun mounts are gone', () => {
  const html = read('portal/index.html')
  assert.match(html, /<title>metacloud<\/title>/)
  assert.doesNotMatch(html, /Vite App/)
  assert.doesNotMatch(html, /id="yourContainer/)
})

test('unknown paths have a catch-all 404 with a home next step', () => {
  const router = read('portal/src/router/index.ts')
  const notFound = read('portal/src/views/NotFoundView.vue')
  assert.match(router, /path:\s*'\/:pathMatch\(\.\*\)\*'/)
  assert.match(router, /NotFoundView\.vue/)
  assert.match(router, /path:\s*'\/'/)
  assert.match(router, /path:\s*'\/about'/)
  assert.match(notFound, /找不到这个页面/)
  assert.match(notFound, /这条路径没有对应页面/)
  assert.match(notFound, /<RouterLink to="\/">回到首页<\/RouterLink>/)
})

test('keyboard users can skip the header to #main', () => {
  const app = read('portal/src/App.vue')
  const skip = app.indexOf('class="skip-link"')
  const header = app.indexOf('<header>')
  const main = app.indexOf('id="main"')
  assert.ok(skip !== -1 && skip < header, 'skip-link must be the first control')
  assert.match(app, /href="#main"/)
  assert.match(app, /跳到正文/)
  assert.match(app, /id="main" tabindex="-1"/)
  assert.match(app, /\.skip-link:focus-visible/)
  assert.doesNotMatch(app, /\.skip-link:focus[^-]/)
})

test('portal declares color-scheme and honors reduced motion on body', () => {
  const css = read('portal/src/assets/base.css')
  assert.match(css, /color-scheme:\s*light/)
  assert.match(css, /prefers-color-scheme:\s*dark[\s\S]*color-scheme:\s*dark/)
  assert.match(
    css,
    /prefers-reduced-motion:\s*reduce[\s\S]*body\s*\{[\s\S]*transition:\s*none/
  )
})
