import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { createVPC, createSubnet, createFirewall } from "./components/network";
import { createVM } from "./components/compute-vm";
import { createSecret, createSecretVersion, grantSecretAccess } from "./components/secret";
import { createServiceAccount, assignIAMRole } from "./components/serviceaccount";
import { environments } from "./components/variables";
import { enableMonitoring, enableLogging } from "./components/monitoring";
import { createStorageBucket, uploadStaticAsset } from "./components/storage";

// Get environment-specific configuration
const stack = pulumi.getStack() as keyof typeof environments;
const env = environments[stack];

// VPC and Networking
const vpc = stack === "development" ? gcp.compute.Network.get("default", "default") : createVPC(`${stack}-vpc`);
const subnet = createSubnet(`${stack}-subnet`, vpc, "10.0.0.0/24", env.region);
createFirewall(`${stack}-firewall`, vpc);

// Service Account
const serviceAccount = createServiceAccount(`${stack}-service-account`);
assignIAMRole(serviceAccount, "roles/secretmanager.secretAccessor");

// // Secrets
// const secret = createSecret("api-key");
// createSecretVersion(secret, "my-sensitive-api-key");
// grantSecretAccess(serviceAccount.email, secret);

// Compute Instance
serviceAccount.email.apply(email => {
    const vm = createVM(env.vmName, env.machineType, env.region, env.zone, env.image, vpc, subnet, email);
    // Continue with the rest of your code here
});

// Monitoring and Logging
enableMonitoring();
enableLogging();

// Cloud Storage
const bucket = createStorageBucket(`shorlet-static-file`);
uploadStaticAsset(bucket, "index.html", "<html><body>Hello World</body></html>");
