/**
 * Ranking: overall points, then all head-to-head results between teams
 * tied on points, then overall goal difference and goals scored.
 * Every played fixture is included, including repeated meetings.
 */
export function sortStandingsByHeadToHead(teams, matches) {
  const groups = new Map();
  for (const team of teams) {
    if (!groups.has(team.points)) groups.set(team.points, []);
    groups.get(team.points).push(team);
  }

  const overallTieBreak = (a, b) =>
    b.goalDiff - a.goalDiff ||
    b.goalsFor - a.goalsFor ||
    String(a.name ?? a.id).localeCompare(String(b.name ?? b.id), 'ru');

  return [...groups.keys()].sort((a, b) => b - a).flatMap((points) => {
    const group = groups.get(points);
    if (group.length < 2) return group;

    const ids = new Set(group.map((team) => String(team.id)));
    const headToHead = new Map(group.map((team) => [String(team.id), {
      points: 0, goalsFor: 0, goalsAgainst: 0,
    }]));

    for (const match of matches) {
      if (!match.isPlayed) continue;
      const homeId = String(match.homeTeamId);
      const awayId = String(match.awayTeamId);
      if (!ids.has(homeId) || !ids.has(awayId)) continue;
      const homeGoals = Number(match.homeGoals);
      const awayGoals = Number(match.awayGoals);
      if (!Number.isFinite(homeGoals) || !Number.isFinite(awayGoals)) continue;
      const home = headToHead.get(homeId);
      const away = headToHead.get(awayId);
      home.goalsFor += homeGoals;
      home.goalsAgainst += awayGoals;
      away.goalsFor += awayGoals;
      away.goalsAgainst += homeGoals;
      if (homeGoals > awayGoals) home.points += 3;
      else if (homeGoals < awayGoals) away.points += 3;
      else { home.points += 1; away.points += 1; }
    }

    return group.sort((a, b) => {
      const hA = headToHead.get(String(a.id));
      const hB = headToHead.get(String(b.id));
      return hB.points - hA.points ||
        (hB.goalsFor - hB.goalsAgainst) - (hA.goalsFor - hA.goalsAgainst) ||
        hB.goalsFor - hA.goalsFor ||
        overallTieBreak(a, b);
    });
  });
}
