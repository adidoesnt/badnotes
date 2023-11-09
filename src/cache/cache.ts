import redis, {
    RedisClientType,
    RedisClientOptions,
    RedisModules
} from 'redis';

const { CACHE_EXPIRY, CACHE_HOST, CACHE_PORT } = process.env;
const host = CACHE_HOST ?? '127.0.0.1';
const port = parseInt(CACHE_PORT ?? '6379');

type ClientType =
    | RedisClientOptions<
          RedisModules,
          Record<string, never>,
          Record<string, never>
      >
    | undefined;

class Redis {
    private static instance: Redis;
    private cache: RedisClientType;

    constructor() {
        this.cache = redis.createClient({
            host,
            port
        } as ClientType);

        this.cache.on('connect', async () => {
            await this.clear();
            console.log('connected to cache');
        });

        this.cache.on('error', (error) => {
            console.error('error connecting to cache:', error);
        });

        this.cache.on('disconnect', (error) => {
            console.error('disconnected from cache:', error);
        });
    }

    public async clear() {
        try {
            await this.cache.flushAll();
            console.log('successfully cleared cache');
        } catch (error) {
            console.error(error);
        }
    }

    public async connect() {
        await this.cache.connect();
    }

    public static getInstance() {
        if (!this.instance) {
            Redis.instance = new Redis();
        }
        return Redis.instance;
    }

    public async disconnect() {
        await this.cache.disconnect();
    }

    public async get(key: string) {
        const cachedData = await this.cache.get(key);
        if (cachedData) {
            try {
                const data = JSON.parse(cachedData);
                return data;
            } catch {
                return cachedData;
            }
        }
        return null;
    }

    public async set(query: string, data: Record<string, any>, EX?: string) {
        const cachedData = JSON.stringify(data);
        try {
            await this.cache.set(query, cachedData, {
                EX: parseInt(CACHE_EXPIRY ?? EX ?? '60')
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export const cache = Redis.getInstance();
