/*
 * Copyright (C) 2020 HERE Europe B.V.
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

import { assert } from "chai";
import {
    TileRequest,
    getTile,
    OlpClientSettings,
    HRN
} from "@here/olp-sdk-dataservice-read/lib";

describe("getTile", () => {
    const settings = new OlpClientSettings({
        environment: "mock-env",
        getToken: () => Promise.resolve("mocked-token"),
        dm: {
            download: (url: string) =>
                Promise.resolve(new Response("test-response"))
        }
    });

    const request = new TileRequest({
        settings,
        catalogHrn: HRN.fromString("hrn:here:data:::mocked-hrn"),
        layerId: "mocked-layer-id",
        layerType: "versioned"
    });

    it("Should throw an error if not tile key", async () => {
        const tile = await getTile(request).catch(err => err.message);
        assert.isTrue(tile === "Please provide correct QuadKey");
    });
});
