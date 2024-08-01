function normal(mu: number, sigma: number) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * sigma + mu;
}

export class Stock {
  name: string;
  id: string;
  data: number[];

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
    this.data = [50];
  }

  currentPrice() {
    if (this.data.length === 0) return 0;
    return this.data[this.data.length - 1];
  }

  generate(ticks: number, impact: "up" | "down") {
    const newData = Array.from({ length: ticks }).map(() => 0);
    let mu = 0;
    switch (impact) {
      case "up":
        mu = 3;
        break;
      case "down":
        mu = -3;
        break;
    }

    if (this.data.length === 0) newData[0] = 50;
    else newData[0] = this.data[this.data.length - 1];

    for (let i = 1; i < ticks; ++i) {
      newData[i] = newData[i - 1] + normal(mu, 3);
    }
    this.data = this.data.concat(newData);
  }
}
