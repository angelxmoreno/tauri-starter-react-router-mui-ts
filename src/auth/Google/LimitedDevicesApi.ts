import { emit } from '@tauri-apps/api/event';
import { Client, getClient, HttpOptions, ResponseType } from '@tauri-apps/api/http';

export type DeviceCodeResponse = {
    device_code: string;
    user_code: string;
    verification_url: string;
    expires_in: number;
    interval: number;
};

export type TokenResponse = {
    access_token: string;
    expires_in: 3599;
    refresh_token: string;
    scope: string;
    token_type: string;
    id_token: string;
};

export interface UserInfoResponse {
    access_token: string;
    expires_on: Date;
    refresh_token: string;
    id_token: string;
    email: string | null;
    email_verified: boolean | null;
    name: string | null;
    picture: string | null;
    given_name: string | null;
    family_name: string | null;
}

export class LimitedDevicesApi {
    static EVENT_NAME = 'LimitedDevicesApi_didGetUserInfo';
    protected client: Client | undefined = undefined;
    protected baseUrl: string;
    protected deviceCodeResponse: DeviceCodeResponse | null = null;
    protected userInfoResponse: UserInfoResponse | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected async getClient(): Promise<Client> {
        if (!this.client) {
            this.client = await getClient();
        }

        return this.client;
    }

    protected async request<T>(options: HttpOptions): Promise<T> {
        options.responseType = options.responseType || ResponseType.JSON;
        options.url = `${this.baseUrl}${options.url}`;

        const client = await this.getClient();
        const { data } = await client.request<T>(options);

        return data;
    }

    get deviceResponse(): DeviceCodeResponse | null {
        return this.deviceCodeResponse;
    }

    get userInfo(): UserInfoResponse | null {
        return this.userInfoResponse;
    }

    /**
     * @deprecated
     */
    async getDeviceCode(): Promise<DeviceCodeResponse> {
        const options: HttpOptions = {
            method: 'GET',
            url: `/google/devices/code`,
        };

        return this.request<DeviceCodeResponse>(options);
    }

    async buildNewDeviceCode(): Promise<DeviceCodeResponse> {
        const options: HttpOptions = {
            method: 'GET',
            url: `/google/devices/code`,
        };

        const response = await this.request<DeviceCodeResponse>(options);
        this.deviceCodeResponse = response;
        this.userInfoResponse = null;
        return response;
    }

    /**
     * @deprecated
     */
    async getToken(device_code: string): Promise<UserInfoResponse | null> {
        const options: HttpOptions = {
            method: 'GET',
            url: `/google/devices/token-with-user`,
            query: {
                device_code,
            },
        };

        return this.request<UserInfoResponse | null>(options);
    }

    async fetchUserInfo(): Promise<UserInfoResponse | null> {
        if (this.deviceCodeResponse === null) {
            await this.buildNewDeviceCode();
        }
        const options: HttpOptions = {
            method: 'GET',
            url: `/google/devices/token-with-user`,
            query: {
                device_code: this.deviceCodeResponse?.device_code,
            },
        };

        const response = await this.request<UserInfoResponse | null>(options);
        if (response?.access_token) {
            this.userInfoResponse = response;
            return response;
        }
        return null;
    }

    async startFetchTokenPolling() {
        if (this.userInfoResponse) return null;

        const response = await this.fetchUserInfo();
        if (response) {
            await emit(LimitedDevicesApi.EVENT_NAME, response);
        } else {
            setTimeout(() => {
                this.startFetchTokenPolling();
            }, 5000);
        }
    }
}
