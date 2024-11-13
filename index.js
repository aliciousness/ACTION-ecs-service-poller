import core from '@actions/core';
import { pollDeploymentStatus } from './src/poll.js'; // Import pollDeploymentStatus function from poll file

(async () => {
  const clusterName = core.getInput('cluster_name', { required: true });
  const serviceName = core.getInput('service_name', { required: true });

  try {
    await pollDeploymentStatus(clusterName, serviceName);
    console.log("Service is successfully running");
    core.setOutput('status', 'RUNNING'); // Set output status to running
  } catch (error) {
    console.error("Service failed to update within the timeout period.");
    core.setOutput('status', 'FAILURE'); // Set output status to failure
    console.error(error); // Log error
    // eslint-disable-next-line no-undef
    process.exit(1); // Exit
  }
})();