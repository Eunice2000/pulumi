export const environments = {
    development: {
        vmName: "dev-vm",
        machineType: "e2-micro",
        region: "us-central1",
        zone: "us-central1-a",
        image: "debian-cloud/debian-11",
    },
    staging: {
        vmName: "staging-vm",
        machineType: "n2-standard-2",
        region: "us-central1",
        zone: "us-central1-b",
        image: "debian-cloud/debian-11",
    },
    production: {
        vmName: "prod-vm",
        machineType: "n2-standard-2",
        region: "us-central1",
        zone: "us-central1-c",
        image: "debian-cloud/debian-11",
    },
};
