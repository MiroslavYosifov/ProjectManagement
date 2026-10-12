export class SeededRandom {
    private state: number;

    constructor(seed: number) {
        this.state = seed >>> 0;
    }

    static fromState(state: number): SeededRandom {
        const random = new SeededRandom(0);
        random.state = state >>> 0;
        return random;
    }

    getState(): number {
        return this.state;
    }

    next(): number {
        this.state = (this.state + 0x6d2b79f5) >>> 0;
        let t = this.state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    int(min: number, max: number): number {
        return min + Math.floor(this.next() * (max - min + 1));
    }
}
