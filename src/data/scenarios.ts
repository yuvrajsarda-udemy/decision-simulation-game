// This file is now deprecated. Use scenarioManager instead.
// Keeping for backward compatibility during transition

import { getCurrentScenario } from './scenarioManager';

// Re-export scenarios from current scenario for backward compatibility
export const scenarios = getCurrentScenario().scenarios;