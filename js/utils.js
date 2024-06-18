export const formatSize = (bytes) => {
    const formatAsMegabytes = (bytes) => {
        // 1 Byte = 0.000001 MB (in decimal)
        // 1 Byte = 0.00000095367432 MB (in binary)
        const sizeInMB = (bytes / 1000000).toFixed(3);
        return `${sizeInMB} MB`;
    };
    const formatAsKilobytes = (bytes) => {
        // 1 Byte = 0.01 KB (in decimal)
        // 1 Byte = 0.0009765625 KB (in binary)
        let sizeInKB;
        if (bytes < 100000) {
            sizeInKB = bytes / 1000;
            return `${sizeInKB.toFixed(2)} kB`;
        } else {
            sizeInKB = Math.round(bytes / 1000);
            return `${sizeInKB} kB`;
        }
    };
    return (bytes < 1000000) ? formatAsKilobytes(bytes) : formatAsMegabytes(bytes);
}
