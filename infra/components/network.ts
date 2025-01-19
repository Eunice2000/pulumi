import * as gcp from "@pulumi/gcp";

export function createVPC(name: string) {
    return new gcp.compute.Network(name, {
        autoCreateSubnetworks: false,
    });
}

export function createSubnet(name: string, vpc: gcp.compute.Network, cidrBlock: string, region: string) {
    return new gcp.compute.Subnetwork(name, {
        ipCidrRange: cidrBlock,
        network: vpc.id,
        region: region,
    });
}

export function createFirewall(name: string, vpc: gcp.compute.Network) {
    return new gcp.compute.Firewall(name, {
        name: name,
        network: vpc.id,
        allows: [
            {
                protocol: "tcp",
                ports: ["22", "80", "443"],
            },
        ],
        // Add source_ranges to allow traffic from specific IP ranges
        sourceRanges: ["0.0.0.0/0"], // Allow from all IP addresses
    });
}
