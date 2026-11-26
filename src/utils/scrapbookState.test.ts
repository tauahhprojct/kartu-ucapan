import test from 'node:test';
import assert from 'node:assert/strict';
import { MEMORIES, RECIPIENT_NAME } from '../data/memories';
import {
  BLEACHERS_TRIBUTE_PROGRESSION,
  MUSIC_TRACK_BPM,
  MUSIC_TRACK_TITLE,
} from './musicBox';
import {
  buildInitialCaptions,
  getNextLightboxIndex,
  mergeSavedCaptions,
  sanitizeCaption,
  shouldAutostartFromSearch,
} from './scrapbookState';

test('MEMORIES contains exactly 5 photos pointing to /images/foto1..5.jpg and targets Pak Budi', () => {
  assert.equal(RECIPIENT_NAME, 'Pak Budi');
  assert.equal(MEMORIES.length, 5);
  MEMORIES.forEach((m, idx) => {
    assert.equal(m.src, `/images/foto${idx + 1}.jpg`);
    assert.equal(m.index, idx + 1);
  });
});

test('BLEACHERS_TRIBUTE_PROGRESSION matches D Major 112 BPM structure', () => {
  assert.match(MUSIC_TRACK_TITLE, /Bleachers — Merry Christmas/);
  assert.equal(MUSIC_TRACK_BPM, 112);
  assert.equal(BLEACHERS_TRIBUTE_PROGRESSION.length, 8);
  assert.equal(BLEACHERS_TRIBUTE_PROGRESSION[0].chordName, 'D');
  assert.equal(BLEACHERS_TRIBUTE_PROGRESSION[1].chordName, 'D/F#');
  assert.equal(BLEACHERS_TRIBUTE_PROGRESSION[2].chordName, 'Bm');
  assert.equal(BLEACHERS_TRIBUTE_PROGRESSION[3].chordName, 'G');
  BLEACHERS_TRIBUTE_PROGRESSION.forEach((bar) => {
    assert.equal(bar.melody.length, 8);
    assert.ok(bar.chordFreqs.length >= 4);
  });
});

test('sanitizeCaption trims, collapses whitespace, limits length, and falls back when empty', () => {
  assert.equal(sanitizeCaption('   ', 'Default'), 'Default');
  assert.equal(sanitizeCaption('  Kenangan   indah  ', 'Default'), 'Kenangan indah');
  const longText = 'a'.repeat(200);
  assert.equal(sanitizeCaption(longText, 'Default').length, 140);
});

test('mergeSavedCaptions safely merges valid saved entries and ignores corrupted JSON', () => {
  const initial = buildInitialCaptions(MEMORIES);
  assert.deepEqual(mergeSavedCaptions(MEMORIES, null), initial);
  assert.deepEqual(mergeSavedCaptions(MEMORIES, '{bad-json'), initial);

  const merged = mergeSavedCaptions(
    MEMORIES,
    JSON.stringify({ 'foto-1': 'Apel pagi bersama tim', 'foto-2': '' })
  );
  assert.equal(merged['foto-1'], 'Apel pagi bersama tim');
  assert.equal(merged['foto-2'], MEMORIES[1].defaultCaption);
});

test('getNextLightboxIndex wraps cleanly across 5 photos', () => {
  assert.equal(getNextLightboxIndex(0, 'prev', 5), 4);
  assert.equal(getNextLightboxIndex(4, 'next', 5), 0);
  assert.equal(getNextLightboxIndex(2, 'next', 5), 3);
  assert.equal(getNextLightboxIndex(0, 'next', 0), -1);
});

test('shouldAutostartFromSearch detects ?autostart=1', () => {
  assert.equal(shouldAutostartFromSearch('?autostart=1'), true);
  assert.equal(shouldAutostartFromSearch('?foo=bar&autostart=1'), true);
  assert.equal(shouldAutostartFromSearch(''), false);
});
