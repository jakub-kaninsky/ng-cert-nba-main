
/**
 * Defines existing conferences. Key is for UI, value is for filtering
 */
export enum Conference {
  Western = 'West',
  Eastern = 'East'
}

/**
 * Defines existing divisions
 */
export enum Division {
  Atlantic = 'Atlantic',
  Central = 'Central',
  Southeast = 'Southeast',
  Northwest = 'Northwest',
  Pacific = 'Pacific',
  Southwest = 'Southwest'
}

/**
 * Defines which divisions belong to which conference
 */
export const divisionsMap = new Map<Conference,Division[]>([
  [Conference.Western,[Division.Northwest,Division.Pacific,Division.Southwest]],
  [Conference.Eastern,[Division.Atlantic,Division.Central,Division.Southeast]]
])

/**
 * Interface for filtering teams based on conference and division
 */
export interface TeamFilter {
  conference: Conference | null;
  division: Division | null;
}

/**
 * Defines options for selecting the number of days. The first number is the default
 */
export const numbersOfDays = [6, 12, 20];
