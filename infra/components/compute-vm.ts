import * as gcp from "@pulumi/gcp";

export function createVM(name: string, machineType: string, region: string, zone: string, image: string, vpc: gcp.compute.Network, subnet: gcp.compute.Subnetwork, serviceAccountEmail: string) {

    return new gcp.compute.Instance(name, {
        name: name,
        machineType: machineType,
        zone: zone,
        bootDisk: {
            initializeParams: {
                image: image,
            },
        },
        networkInterfaces: [
            {
                subnetwork: subnet.id,
                accessConfigs: [
                    {
                        // Ephemeral IP
                        natIp: undefined,
                    },
                ],
            },
        ],
        serviceAccount: {
            email: serviceAccountEmail,
            scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        },
    });
}
