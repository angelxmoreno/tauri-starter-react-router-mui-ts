// noinspection HtmlRequiredAltAttribute

import { ImageCacheService } from '@app/utils/ImageCacheService.ts';
import { FC, ImgHTMLAttributes, useEffect, useState } from 'react';

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & { src: string };
const Image: FC<ImageProps> = ({ src, ...props }) => {
    const [imgPath, setImagePath] = useState<string>(src);
    useEffect(() => {
        ImageCacheService.cacheImageUrl(src).then(localPath => setImagePath(localPath));
    }, [src]);
    return <img src={imgPath} {...props} />;
};

export default Image;
