export class Party {
  name: string;
  openess: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  color: string;
  slug: string;

  constructor(jsonObject: any) {
    this.name = jsonObject.name;
    this.openess = jsonObject.openess;
    this.conscientiousness = jsonObject.conscientiousness;
    this.extraversion = jsonObject.extraversion;
    this.agreeableness = jsonObject.agreeableness;
    this.neuroticism = jsonObject.neuroticism;
    this.setCompanySlug();
  }

  private setCompanySlug(): void {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '');
  }
}
