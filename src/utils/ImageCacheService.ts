import { createDir, exists, writeBinaryFile } from '@tauri-apps/api/fs';
import { fetch, ResponseType } from '@tauri-apps/api/http';
import { appCacheDir, BaseDirectory, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { MD5 } from 'object-hash';

const CACHE_DIR = 'cached-images';

const getCachedImagesDir = async () => `${await appCacheDir()}${CACHE_DIR}`;

const downloadImageFromUrl = async (url: string, localFilePath: string) => {
    const { data, status } = await fetch<ArrayBuffer>(url, {
        method: 'GET',
        responseType: ResponseType.Binary,
    });
    if (status === 200) {
        await writeBinaryFile({
            path: localFilePath,
            contents: data,
        });
    }
};

const createCacheDir = async () => {
    const cachedImagesDir = await getCachedImagesDir();
    const dirExists = await exists(cachedImagesDir, {
        dir: BaseDirectory.AppCache,
    });

    if (!dirExists) {
        await createDir(cachedImagesDir, { dir: BaseDirectory.AppCache, recursive: true });
    }
};

const cacheImageUrl = async (url: string) => {
    await createCacheDir();
    const imageName = MD5(url);
    const appCacheDirPath = await appCacheDir();
    const localPath = await join(appCacheDirPath, CACHE_DIR, `${imageName}.png`);
    const assetUrl = convertFileSrc(localPath);

    const fileExists = await exists(localPath, {
        dir: BaseDirectory.AppCache,
    });

    if (!fileExists) {
        await downloadImageFromUrl(url, localPath);
    }

    return assetUrl;
};

export const ImageCacheService = { cacheImageUrl };
