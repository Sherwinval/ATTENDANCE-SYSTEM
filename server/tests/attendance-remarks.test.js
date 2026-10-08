import test from 'node:test';
import assert from 'node:assert/strict';

import { getAttendanceRemark } from '../routes/attendance.js';

test('login after 12:45 PM is marked as late', () => {
  const lateTime = new Date('2026-10-08T12:46:00');
  assert.equal(getAttendanceRemark('login', lateTime), 'Late');
});

test('login before or at 12:45 PM is not marked late', () => {
  const onTime = new Date('2026-10-08T12:45:00');
  assert.equal(getAttendanceRemark('login', onTime), 'On Time');
});
