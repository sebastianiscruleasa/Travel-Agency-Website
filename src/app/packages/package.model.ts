export class Package {
  public buyerName: string;
  public buyerEmail: string;
  constructor(
    public image: string,
    public continent: string,
    public city: string,
    public price: number,
    public period: string,
    public hotel: string,
    public people: number,
    public food: string,
    public oldPrice?: number,
    public description?: string,
    public sold?: number
  ) {
    this.buyerName = '';
    this.buyerEmail = '';
  }
}
