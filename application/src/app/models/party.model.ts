export enum Parties {
  cdu = 'CDU',
  csu = 'CSU',
  spd = 'SPD',
  fdp = 'FDP',
  gruene = 'Die Grünen',
  linke = 'Die Linke',
  afd = 'AfD'
}

export enum PartyColors {
  cdu = '#000000',
  csu = '#000000',
  spd = '#E3000F',
  fdp = '#ffff00',
  gruene = '#46962b',
  linke = '#BE3075',
  afd = '#009ee0'
}

export function  getColorForParty(party: string): string {
  switch (party) {
    case Parties.afd: return PartyColors.afd;
    case Parties.cdu: return PartyColors.cdu;
    case Parties.csu: return PartyColors.csu;
    case Parties.fdp: return PartyColors.fdp;
    case Parties.gruene: return PartyColors.gruene;
    case Parties.linke: return PartyColors.linke;
    case Parties.spd: return PartyColors.spd;
  }
}
