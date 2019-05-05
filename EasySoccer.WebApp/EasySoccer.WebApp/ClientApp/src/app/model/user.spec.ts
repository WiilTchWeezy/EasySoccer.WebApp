import { User } from './user';

describe('User', () => {
	it('should create an instance', () => {
		expect(new User('a', 'aa', 'AAA', 'AAAA')).toBeTruthy();
	});
});
