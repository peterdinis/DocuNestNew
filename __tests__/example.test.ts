import '@testing-library/jest-dom'

const sum = (a: number, b: number): number => {
    return a + b;
};

describe('sum function', () => {
    it('should add two numbers correctly', () => {
        expect(sum(1, 2)).toBe(3);
    });

    it('should return negative number when adding negative and positive numbers', () => {
        expect(sum(-1, 2)).toBe(1);
    });

    it('should return zero when adding opposites', () => {
        expect(sum(-2, 2)).toBe(0);
    });
});
