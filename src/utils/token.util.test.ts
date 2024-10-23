import { jwtDecode } from "jwt-decode";
import { isTokenValid } from "./token.util";

vi.mock('jwt-decode', () => ({
    jwtDecode: vi.fn(),
}));

describe("Token Util", () => {

    beforeEach(() => {
        vi.mocked(jwtDecode).mockClear()
    })

    it('should return false if no token is provided', () => {
        const result = isTokenValid(null);
        expect(result).toBe(false);
    });

    it('should return false if the token is invalid', () => {
        vi.mocked(jwtDecode).mockImplementation(() => {
            throw new Error('Invalid token');
        });

        const result = isTokenValid('invalid_token');
        expect(result).toBe(false);
    });

    it('should return false if decoded token has no exp field', () => {
        vi.mocked(jwtDecode).mockReturnValue({});

        const result = isTokenValid('valid_but_no_exp');
        expect(result).toBe(false);
    });

    it('should return false if the token is expired', () => {
        const expiredToken = { exp: Date.now() / 1000 - 1000 };
        vi.mocked(jwtDecode).mockReturnValue(expiredToken);

        const result = isTokenValid('expired_token');
        expect(result).toBe(false);
    });

    it('should return true if the token is valid and not expired', () => {
        const validToken = { exp: Date.now() / 1000 + 1000 };
        vi.mocked(jwtDecode).mockReturnValue(validToken);

        const result = isTokenValid('valid_token');
        expect(result).toBe(true);
    });
})