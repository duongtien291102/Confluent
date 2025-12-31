import type { StatCard } from '../models';
import { mockKpiStats } from '../data';

export const dashboardService = {
    async getStats(): Promise<StatCard[]> {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return mockKpiStats as unknown as StatCard[];
    },
};
