import { Command } from '@tauri-apps/api/shell';

export interface FeedEntry {
    id: string;
    link?: string;
    title?: string;
    description?: string;
    published?: string;
}

export interface FeedData {
    link?: string;
    title?: string;
    description?: string;
    generator?: string;
    language?: string;
    published?: string;
    entries?: FeedEntry[];
}

export const extractRss = async (url: string): Promise<FeedData | null> => {
    const command = Command.sidecar('binaries/extractRss', [url]);
    const { stdout } = await command.execute();
    try {
        return JSON.parse(stdout);
    } catch (e) {
        console.error(`Unable to parse RSS URL: "${(e as Error).message}"`);
        return null;
    }
};
