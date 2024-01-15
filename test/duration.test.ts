import "../src";
import {Duration} from "../src";
import "../src";

describe('Duration class', () => {
    it('should create a Duration object from nanoseconds', () => {
        const duration = Duration.nanoseconds(1e9);
        expect(duration.inWholeSeconds()).toBe(1);
    });

    it('should create a Duration object from microseconds', () => {
        const duration = Duration.microseconds(5000000);
        expect(duration.inWholeSeconds()).toBe(5);
    });

    it('should create a Duration object from milliseconds', () => {
        const duration = Duration.milliseconds(5000);
        expect(duration.inWholeSeconds()).toBe(5);
    });

    it('should create a Duration object from seconds', () => {
        const duration = (60).seconds();
        expect(duration.inWholeSeconds()).toBe(60);
    });

    it('should create a Duration object from minutes', () => {
        const duration = (60).minutes();
        expect(duration.inWholeSeconds()).toBe(3600);
    });

    it('should create a Duration object from hours', () => {
        const duration = (24).hours();
        expect(duration.inWholeSeconds()).toBe(86400);
    });

    it('should create a Duration object from days', () => {
        const duration = (7).days();
        expect(duration.inWholeSeconds()).toBe(604800);
    });

    it('should convert duration to whole seconds', () => {
        const duration = (2).minutes();
        expect(duration.inWholeSeconds()).toBe(120);
    });

    it('should convert duration to whole minutes', () => {
        const duration = (2).hours();
        expect(duration.inWholeMinutes()).toBe(120);
    });

    it('should convert duration to whole hours', () => {
        const duration = (1).days();
        expect(duration.inWholeHours()).toBe(24);
    });

    it('should convert duration to whole days', () => {
        const duration = (48).hours();
        expect(duration.inWholeDays()).toBe(2);
    });

    it('should convert duration to object with time units', () => {
        const duration = (123).seconds();
        const durationObject = duration.toObject();
        expect(durationObject).toEqual({
            nanoseconds: 123000000000,
            microseconds: 123000000,
            milliseconds: 123000,
            seconds: 123,
            minutes: 2,
            hours: 0,
            days: 0,
        });
    });

    it('should split duration into components', () => {
        const duration = (2).days().add((12).hours());
        const components = duration.toComponents();
        expect(components).toEqual({
            days: 2,
            hours: 12,
            minutes: 0,
            seconds: 0,
            nanoseconds: 0,
        });
    });

    it('should add two durations', () => {
        const duration1 = (12).hours();
        const duration2 = (30).minutes();
        const sum = duration1.add(duration2);
        expect(sum.inWholeMinutes()).toBe(750);
    });

    it('should subtract two durations', () => {
        const duration1 = (12).hours();// 720
        const duration2 = (30).minutes();
        const difference = duration1.subtract(duration2);
        expect(difference.inWholeMinutes()).toBe(690);
    });

    it('should multiply duration by a factor', () => {
        const duration = (10).minutes();
        const multiplied = duration.multiply(2);
        expect(multiplied.inWholeMinutes()).toBe(20);
    });

    it('should divide duration by a divisor', () => {
        const duration = (1).hours();
        const divided = duration.divide(2);
        expect(divided.inWholeMinutes()).toBe(30);
    });

    it('should check if two durations are equal', () => {
        const duration1 = (5).hours();
        const duration2 =(5).hours();
        expect(duration1.equals(duration2)).toBe(true);
    });

    it('should check if duration is less than another duration', () => {
        const duration1 = (5).hours();
        const duration2 = (10).hours();
        expect(duration1.lessThan(duration2)).toBe(true);
    });

    it('should check if duration is greater than another duration', () => {
        const duration1 = (10).hours();
        const duration2 = (5).hours();
        expect(duration1.greaterThan(duration2)).toBe(true);
    });

    it('should compare two durations', () => {
        const duration1 = (1).days();
        const duration2 = (24).hours();
        expect(duration1.compareTo(duration2)).toBe(0);
    });

    it('should run action with duration components', () => {
        const duration = (3600).seconds();

        const result = duration.runIt((days, hours, minutes, seconds, nanoseconds) => {
            return `${days}d ${hours}h ${minutes}m ${seconds}s ${nanoseconds}ns`;
        });
        expect(result).toBe('0d 1h 0m 0s 0ns');
    });

    it('should format duration as a string', () => {
        const duration = (1).days().add((6).hours());
        const formattedString = duration.toString();
        expect(formattedString).toBe('1d 6h 0m 0s 0ns');
    });
});

describe('Global extensions', () => {
    it('should create a Duration object using durationOf function', () => {
        const duration = durationOf(5000);
        expect(duration.inWholeSeconds()).toBe(5);
    });

    it('should create a Duration object representing years', () => {
        const duration = (2).years();
        expect(duration.inWholeDays()).toBe(730);
    });

    it('should create a Duration object representing months', () => {
        const duration = (2).months();
        expect(duration.inWholeDays()).toBe(60);
    });

    it('should create a Duration object representing days', () => {
        const duration = (3).days();
        expect(duration.inWholeDays()).toBe(3);
    });

    it('should create a Duration object representing hours', () => {
        const duration = (1).hours();
        expect(duration.inWholeHours()).toBe(1);
    });

    it('should create a Duration object representing minutes', () => {
        const duration = (2).minutes();
        expect(duration.inWholeMinutes()).toBe(2);
    });

    it('should create a Duration object representing seconds', () => {
        const duration = (5).seconds();
        expect(duration.inWholeSeconds()).toBe(5);
    });
});
