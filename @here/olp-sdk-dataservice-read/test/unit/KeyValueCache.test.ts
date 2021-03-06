import sinon = require("sinon");
import * as chai from "chai";
import sinonChai = require("sinon-chai");
import { KeyValueCache } from "../../lib";
chai.use(sinonChai);
const expect = chai.expect;

describe("KeyValueCache", () => {
    let sandbox: sinon.SinonSandbox;
    let keyValueCache1 = new KeyValueCache();

    beforeEach(() => {
        keyValueCache1.put("key1", "value1");
        keyValueCache1.put("key2", "value2");
    });

    it("Should put new key value", () => {
        keyValueCache1.put("key3", "value3");

        expect(keyValueCache1.get("key1")).equal("value1");
        expect(keyValueCache1.get("key2")).equal("value2");
        expect(keyValueCache1.get("key3")).equal("value3");
    });

    it("Should put handle error", () => {
        const cache = new KeyValueCache();
        const resp1 = cache.put("key", "somedata");
        expect(resp1).equal(true);
        cache.setCapacity(0.00000001);
        const resp2 = cache.put("key", "value");
        expect(resp2).equal(false);
    });

    it("Should getCapacity return cache capacity", () => {
        const cache = new KeyValueCache();
        expect(cache.getCapacity()).equal(2097152);
    });

    it("Should clear() clear the cache and remove all ietms", () => {
        const cache = new KeyValueCache();
        cache.put("key", "value");
        expect(cache.get("key")).equal("value");
        cache.clear();
        expect(cache.get("key")).equal(undefined);
    });

    it("Should get key value", () => {
        expect(keyValueCache1.get("key1")).equal("value1");
        expect(keyValueCache1.get("key2")).equal("value2");
    });

    it("Should remove key value", () => {
        keyValueCache1.remove("key1");

        expect(keyValueCache1.get("key1")).equal(undefined);
        expect(keyValueCache1.get("key2")).equal("value2");
    });
});
