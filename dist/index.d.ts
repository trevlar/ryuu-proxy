import { Manifest } from './lib/models';
export declare class Proxy {
    private transport;
    constructor(manifest: Manifest);
    express: () => (req: any, res: any, next: any) => any;
    stream: (req: any) => any;
}
