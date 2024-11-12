import { ECSClient, DescribeServicesCommand } from "@aws-sdk/client-ecs";
import core from '@actions/core'

const region = core.getInput('region', { required: true });
const max_retries = core.getInput('max_retries', { required: false });
const delay_ = core.getInput('delay', { required: false });

const ecsClient = new ECSClient({ region: region });

// eslint-disable-next-line no-unused-vars
async function pollDeploymentStatus(clusterName, serviceName, maxRetries = parseInt(max_retries), delay = parseInt(delay_)) {
  let attempts = 0;

  while (attempts < maxRetries) {
    attempts++;
    console.log(`Polling attempt ${attempts} at ${new Date().toISOString()}`);

    const command = new DescribeServicesCommand({
      cluster: clusterName,
      services: [serviceName],
    });

    try {
      const response = await ecsClient.send(command);
      const service = response.services[0];
      // console.log("Service: ", service);

      if (!service) {
        throw new Error("Service not found.");
      }

      // Find the PRIMARY deployment
      const primaryDeployment = service.deployments.find(
        deployment => deployment.status === "PRIMARY"
      );

      if (!primaryDeployment) {
        throw new Error("No PRIMARY deployment found.");
      }

      const { desiredCount, runningCount, pendingCount, rolloutState, id } = primaryDeployment;

      // Check if PRIMARY deployment has achieved desired state
      if (runningCount === desiredCount && pendingCount === 0 && rolloutState === "COMPLETED" && service.status === "ACTIVE") {
        console.log("Deployment has successfully completed.");
        return true;
      } else {
        console.log(`Deployment in progress. Status: ${rolloutState}`);
        console.log(`Deployment ID: ${id}`);
        console.log(`Desired: ${desiredCount}, Running: ${runningCount}, Pending: ${pendingCount}`);
      }
    } catch (error) {
      console.error("Error describing ECS service:", error);
    }

    // Delay before the next poll and show how long in minutes - seconds
    console.log(`Waiting for ${delay/1000/60} minutes and ${delay/1000%60} seconds before next poll`);
    console.log("------------------------------------------------------------");
    console.log(""); // Add a new line for better readability
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  throw new Error("ECS deployment did not complete within the timeout period.");
}

// Export pollDeploymentStatus };function
export { pollDeploymentStatus };