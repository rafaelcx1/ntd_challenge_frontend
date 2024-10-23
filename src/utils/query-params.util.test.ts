import { mapToQueryParam } from "./query-params.util"

describe("Query Params Util", () => {
    it("should returns mapped query params correctly", ()=> {
        const paramsObj = {
            test1: "test1",
            test2: "test2",
            test3: null,
            test4: "test4",
        }

        const result = mapToQueryParam(paramsObj)

        expect(result).toBe("?test1=test1&test2=test2&test4=test4")
    })
})