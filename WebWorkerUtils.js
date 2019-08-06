
        function createWebWorkerByCode(workerjsCodeString) {
            var workerjsCodeBlob = new Blob([workerjsCodeString],{type:"text/plain"});
            var workerjsCodeBlobUrl = URL.createObjectURL(workerjsCodeBlob);
            var workerInstance = new Worker(workerjsCodeBlobUrl);
            return workerInstance
        }

        async function createWebWorkerByURL(url) {
            let fetchRequest = await fetch(url);
            let workerjsCodeBlob = await fetchRequest.blob();
            let workerjsCodeBlobUrl = URL.createObjectURL(workerjsCodeBlob);
            return new Worker(workerjsCodeBlobUrl);
        }


module.exports = {
    createWebWorkerByCode:createWebWorkerByCode,
    createWebWorkerByURL:createWebWorkerByURL
};
