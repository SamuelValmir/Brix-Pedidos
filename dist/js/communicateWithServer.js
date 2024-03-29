async function getTableFromServer() {
    return await fetch("http://127.0.0.1:9999/file/get", {
        method: "get",
        headers: { "Content-Type": "text/plain" }
    })
        .then(async (response) => {
            const json = await response.json();
            return ([response.status, json])
        })
        .then(data => {
            const errorCode = data[0];
            const json = data[1];

            if (errorCode !== 204) {
                return json;
            };
        });
};

async function getIntelbrasTableFromServer() {
    return await fetch("http://127.0.0.1:9999/table/intelbras/get", {
        method: "get",
        headers: { "Content-Type": "text/plain" }
    })
        .then(async (response) => {
            const json = await response.json();
            return ([response.status, json]);
        })
        .then(data => {
            const errorCode = data[0];
            const json = data[1];

            if (errorCode !== 204) {
                return json;
            };
        });
};


function sendIntelbrasTableToServer(jsonString) {
    fetch("http://127.0.0.1:9999/table/intelbras/post", {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: jsonString
    });
};

async function processEditTable(jsonString) {
    return await fetch("http://127.0.0.1:9999/table/editTable/process", {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: jsonString
    }).then(response => response.json());
};

function getNextSerialNumber() {
    return new Promise(resolve => {
        fetch("http://127.0.0.1:9999/contract/nextSerialNumber",
            { method: "get" })
            .then(response => {
                resolve(response.json());
            });
    });
};

function createClient(clientJsonString) {
    fetch("http://127.0.0.1:9999/client/create", {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: clientJsonString
    });
};

// I must get by client id in query field (method get)
function downloadPDFFromClient(clientId) {
    fetch(`http://127.0.0.1:9999/contract/pdf?clientId=${clientId}`, {
        method: "get"
    });
};

export default {
    getTableFromServer,
    getIntelbrasTableFromServer,
    sendIntelbrasTableToServer,
    processEditTable,
    getNextSerialNumber,
    createClient,
    downloadPDFFromClient
};

