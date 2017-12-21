/// <reference types="request" />
import * as Promise from 'core-js/es6/promise';
import * as request from 'request';
import { Manifest, DomoClient, NodeRequest } from '../models';
export default class Transport {
    private manifest;
    private client;
    private domainPromise;
    constructor(manifest: Manifest);
    getManifest(): Manifest;
    getDomoClient(): DomoClient;
    getDomainPromise(): Promise;
    getLastLogin(): DomoClient;
    getDomoDomain(): Promise<string>;
    isValidRequest(url: string): boolean;
    build(req: NodeRequest): Promise;
    createContext(): Promise;
    getEnv(): string;
    get: (options: any) => request.Request;
}
