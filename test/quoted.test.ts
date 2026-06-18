import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { parseQuotedTweet, renderQuotedSection, expandLinks, SyndicationTweet } from '../obsidian-plugin/quoted';

const here = dirname(fileURLToPath(import.meta.url));
const load = (name: string): SyndicationTweet =>
  JSON.parse(readFileSync(join(here, 'fixtures', name), 'utf8')) as SyndicationTweet;

let passed = 0;
const check = (label: string, fn: () => void) => {
  fn();
  passed++;
  console.log(`  ok  ${label}`);
};

console.log('parseQuotedTweet — real photo-quote fixture');
{
  const q = parseQuotedTweet(load('syndication-photo-quote.json'));
  assert.ok(q, 'expected a quoted tweet');
  check('author name + handle', () => {
    assert.equal(q!.name, 'Matt Pocock');
    assert.equal(q!.username, '@mattpocockuk');
  });
  check('permalink uses quote id', () =>
    assert.equal(q!.url, 'https://x.com/mattpocockuk/status/2067259590488510471'));
  check('trailing t.co media link stripped from text', () => {
    assert.ok(!/t\.co/.test(q!.text), `text still has t.co: ${q!.text}`);
    assert.ok(q!.text.startsWith('Announcing mattpocock/skills v1'));
    assert.ok(q!.text.trimEnd().endsWith('rewritten from the ground'));
  });
  check('photo captured, normalized to large jpg', () => {
    assert.deepEqual(q!.images, ['https://pbs.twimg.com/media/HLBhYbMXAAA9NGk.png?format=jpg&name=large']);
  });
  check('no video posters on a photo quote', () => assert.equal(q!.videoPosters, undefined));
}

console.log('renderQuotedSection — real photo-quote fixture');
{
  const q = parseQuotedTweet(load('syndication-photo-quote.json'))!;
  const md = renderQuotedSection(q);
  check('heading present', () => assert.ok(md.includes('\n\n## Quoted tweet\n\n')));
  check('every body line is blockquoted', () => {
    const body = md.split('## Quoted tweet\n\n')[1];
    for (const line of body.split('\n')) assert.ok(line === '>' || line.startsWith('> '), `unquoted line: ${JSON.stringify(line)}`);
  });
  check('attribution + image + view link rendered', () => {
    assert.ok(md.includes('> **Matt Pocock** (@mattpocockuk)'));
    assert.ok(md.includes('> ![](https://pbs.twimg.com/media/HLBhYbMXAAA9NGk.png?format=jpg&name=large)'));
    assert.ok(md.includes('> [View on X](https://x.com/mattpocockuk/status/2067259590488510471)'));
  });
  check('no video marker on a photo quote', () => assert.ok(!md.includes('▶ Video')));
  console.log('\n--- rendered photo quote ---\n' + md.trim() + '\n');
}

console.log('video-quote fixture (faithful synthetic — proves the video branch)');
{
  const q = parseQuotedTweet(load('syndication-video-quote.json'));
  assert.ok(q, 'expected a quoted tweet');
  check('video poster extracted from mediaDetails', () =>
    assert.deepEqual(q!.videoPosters, ['https://pbs.twimg.com/amplify_video_thumb/1234567890000000001/img/POSTERxyz.jpg?format=jpg&name=large']));
  check('no photos on a video quote', () => assert.equal(q!.images, undefined));
  check('media t.co stripped from video-quote text', () => assert.ok(!/t\.co/.test(q!.text)));
  const md = renderQuotedSection(q!);
  check('▶ Video label and poster both link to the video viewer (/video/1)', () => {
    assert.ok(md.includes('> [▶ Video](https://x.com/demoacct/status/1234567890000000001/video/1)'));
    assert.ok(md.includes('> [![](https://pbs.twimg.com/amplify_video_thumb/1234567890000000001/img/POSTERxyz.jpg?format=jpg&name=large)](https://x.com/demoacct/status/1234567890000000001/video/1)'));
  });
  console.log('\n--- rendered video quote ---\n' + md.trim() + '\n');
}

console.log('expandLinks — real Emil Kowalski entities (parent-text path)');
{
  // Real entities from cdn.syndication.twimg.com for tweet 2067573717576667555:
  // one external link (expand) + one media link (strip).
  const raw = 'They complement each other well\n\nhttps://t.co/nbrXga5Btc https://t.co/o2hSyrDmFU';
  const out = expandLinks(
    raw,
    [{ url: 'https://t.co/nbrXga5Btc', expanded_url: 'http://emilkowal.ski/skill' }],
    [{ url: 'https://t.co/o2hSyrDmFU' }],
  );
  check('external t.co expanded to real url', () => assert.ok(out.includes('http://emilkowal.ski/skill')));
  check('media t.co stripped, no t.co remains', () => assert.ok(!/t\.co/.test(out)));
  check('trailing whitespace trimmed', () => assert.equal(out, 'They complement each other well\n\nhttp://emilkowal.ski/skill'));
  check('no entities → text unchanged', () => assert.equal(expandLinks('plain text', [], []), 'plain text'));
}

console.log('edge cases');
check('no quoted_tweet → undefined', () => assert.equal(parseQuotedTweet({ mediaDetails: [] }), undefined));
check('quote without author → undefined (protected/deleted)', () =>
  assert.equal(parseQuotedTweet({ quoted_tweet: { id_str: '1', text: 'x' } }), undefined));
check('null response → undefined', () => assert.equal(parseQuotedTweet(null), undefined));
check('note_tweet text preferred over truncated text', () => {
  const q = parseQuotedTweet({ quoted_tweet: { id_str: '9', user: { screen_name: 'a', name: 'A' }, text: 'short…', note_tweet: { text: 'the full long body' } } });
  assert.equal(q!.text, 'the full long body');
});

console.log(`\nAll ${passed} checks passed.`);
