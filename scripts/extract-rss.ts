import { extract } from '@extractus/feed-extractor';

const exitError = (msg: string) => {
    console.error(msg);
    process.exit(1);
};

const main = async () => {
    const args = process.argv;
    if (args.length !== 3) {
        throw new Error('bad arguments match');
    }
    const url = args[2];
    const data = await extract(url);
    console.info(JSON.stringify(data));
};

main().catch(error => exitError(error.message));
