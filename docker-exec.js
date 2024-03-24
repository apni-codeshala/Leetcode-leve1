const Docker = require("dockerode");
const docker = new Docker();

async function runCCode() {
    const cCode = `
        #include<stdio.h>
        int main() {
            printf("Hello javascript from docker");
            printf("\\n");
            return 0;
        }`;

    const containerName = 'jobid-528789';
    const options = {
        Image: 'gcc',
        name: containerName,
        AttachStdout: true,
        AttachStderr: true,
        Tty: false,
        Cmd: ['/bin/bash', '-c', `echo '${cCode}' > /program.c && gcc /program.c -o /program && /program`]
    };

    const container = await docker.createContainer(options);
    console.log('Container created.');

    await container.start();
    console.log('Container started.');

    const stream = await container.attach({ stream: true, stdout: true, stderr: true });

    let output = '';
    stream.on('data', (chunk) => {
        output += chunk.toString('utf8');
        console.log(chunk.toString('utf8'));
    });

    stream.on('end', () => {
        console.log('Container stream ended.');
    });

    return output;
}

runCCode().then((output) => {
    console.log('Output from container:', output);
}).catch((err) => {
    console.error('Error:', err);
});