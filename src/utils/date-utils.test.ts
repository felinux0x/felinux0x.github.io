import { describe, expect, it } from 'vitest';
import { formatDateToYYYYMMDD } from './date-utils';

describe('date-utils', () => {
    it('formatDateToYYYYMMDD should format date correctly', () => {
        const date = new Date('2024-05-15T12:00:00Z');
        expect(formatDateToYYYYMMDD(date)).toBe('2024-05-15');
    });
});
