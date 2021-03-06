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

const services = require('./base-urls.js')

function serviceBaseUrl(service) {
    const url = services[service]
    if (url === undefined) {
        return "not_used.com"
    }
    return url
}

function generatePlatformApiResponse(request) {
    const service = request[1]
    const api = {
        "api" : service,
        "version" : "v1",
        "baseURL" : "http://localhost:3000" + serviceBaseUrl(service),
        "parameters" : {}
    }
    return [api]
}

function generateResourceApiResponse(request) {
    const hrn = request[1]

    const apis = [];
    Object.keys(services).forEach(service => {
        const api = {
            "api" : service,
            "version" : "v1",
            "baseURL" : "http://localhost:3000" + serviceBaseUrl(service) + "/v1/catalogs/" + hrn,
            "parameters" : {}
        }

        apis.push(api);
    });

   
    return apis
}

const methods = [
{
    regex: /lookup\/v1\/platform\/apis\/(.+)\/(.+)$/,
    handler: generatePlatformApiResponse
},
{
    regex: /lookup\/v1\/resources\/(.+)\/apis$/,
    handler: generateResourceApiResponse
}
]

function lookup_handler(pathname, query) {
    for (method of methods) {
        let match = pathname.match(method.regex)
        if (match) {
            return { status: 200, text: JSON.stringify(method.handler(match)), headers: {"Content-Type": "application/json"} }
        }
    }
    console.log("Not handled", pathname)
    return { status: 404, text: "Not Found" }
}

exports.handler = lookup_handler