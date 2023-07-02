const mapping: Record<string, string> = {
  'finance-profiles': 'finance_profile',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
