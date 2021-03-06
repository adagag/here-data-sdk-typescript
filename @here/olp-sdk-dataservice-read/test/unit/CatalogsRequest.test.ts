/*
 * Copyright (C) 2019 HERE Europe B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 * License-Filename: LICENSE
 */

import sinon = require("sinon");
import * as chai from "chai";
import sinonChai = require("sinon-chai");

import { CatalogsRequest } from "../../lib";

chai.use(sinonChai);

const assert = chai.assert;
const expect = chai.expect;

describe("CatalogsRequest", () => {
    const billingTag = "billingTag";
    const mockedSchemaHRN1 = "hrn:::test-hrn1";
    const mockedSchemaHRN2 = "hrn:::test-hrn2";

    it("Should initialize", () => {
        const catalogsRequest = new CatalogsRequest();

        assert.isDefined(catalogsRequest);
        expect(catalogsRequest).be.instanceOf(CatalogsRequest);
    });

    it("Should set parameters", () => {
        const catalogsRequest = new CatalogsRequest();
        const catalogsRequestWithSchemaHrn = catalogsRequest.withSchema(mockedSchemaHRN1);
        const catalogsRequestWithBillTag = catalogsRequest.withBillingTag(billingTag);

        expect(catalogsRequestWithSchemaHrn.getSchema()).to.be.equal(mockedSchemaHRN1);
        expect(catalogsRequestWithBillTag.getBillingTag()).to.be.equal(billingTag);
    });

    it("Should set parameters with chain", () => {
        const catalogsRequest = new CatalogsRequest()
            .withSchema(mockedSchemaHRN1)
            .withSchema(mockedSchemaHRN2)
            .withBillingTag(billingTag);

        expect(catalogsRequest.getSchema()).to.be.equal(mockedSchemaHRN2);
        expect(catalogsRequest.getBillingTag()).to.be.equal(billingTag);
    });
});
