// Test that the frontmatter parser works correctly
import { getAllPosts, getPostBySlug } from '../src/blog/postsLoader.js';

console.log('=== Test getAllPosts ===');
const posts = getAllPosts();
console.log(`Found ${posts.length} posts\n`);

for (const post of posts) {
  console.log(`Slug: ${post.slug}`);
  console.log(`  Title: ${post.title}`);
  console.log(`  Date: ${post.date}`);
  console.log(`  Category: ${post.category}`);
  console.log(`  Author: ${post.author}`);
  console.log(`  Excerpt: ${post.excerpt}`);
  console.log(`  Content length: ${post.content.length} chars`);
  console.log(`  Content preview: ${post.content.slice(0, 80)}...`);
  console.log('');
}

console.log('=== Test getPostBySlug ===');
const test = getPostBySlug('vacunacion-en-perros-guia-completa');
console.log(`Found: ${test ? test.title : 'NOT FOUND'}`);

const notFound = getPostBySlug('does-not-exist');
console.log(`Not found test: ${notFound === null ? 'OK (null)' : 'FAIL'}`);
