import { formatDate } from "./date.util"

describe("Date Util", () => {
    it("Should return correct Date", () => {
        const date = new Date(2024, 0, 1, 1, 0, 0)

        const result = formatDate(date)

        expect(result).toBe("01/01/2024 01:00:00")
    })

    it("Should return null if Date null is passed", () => {
        const result = formatDate(null)

        expect(result).toBe(null)
    })
})