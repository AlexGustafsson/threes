export interface Offset {
  top: number,
  left: number
}

export interface Size {
  width: number,
  height: number
}

export abstract class Shape {
  offset: Offset
  size: Size

  constructor(offset: Offset, size: Size) {
    this.offset = offset;
    this.size = size;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}


export class Polygon extends Shape {
  points: Offset[];

  constructor(...points: Offset[]) {
    const min = {
      left: Number.MAX_VALUE,
      top: Number.MAX_VALUE
    };

    const max = {
      left: -Number.MAX_VALUE,
      top: -Number.MAX_VALUE
    };

    for (let i = 0; i < points.length; i++) {
      min.left = Math.min(min.left, points[i].left);
      min.top = Math.min(min.top, points[i].top);

      max.left = Math.max(max.left, points[i].left);
      max.top = Math.max(max.top, points[i].top);
    }

    super(min, {width: max.left - min.left, height: max.top - min.top});
    this.points = points;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.moveTo(this.points[0].left, this.points[0].top);
    for (let i = 1; i < this.points.length; i++)
      ctx.lineTo(this.points[i].left, this.points[i].top);
  }
}

export class Rectangle extends Polygon {
  constructor(offset: Offset, size: Size) {
    super(
      {left: offset.left, top: offset.top}, // Top left corner
      {left: offset.left + size.width, top: offset.top}, // Top right corner
      {left: offset.left + size.width, top: offset.top + size.height}, // Bottom right corner
      {left: offset.left, top: offset.top + size.height}, // Bottom left corner
    );
  }
}

export class Hexagon extends Polygon {
  radius: number

  constructor(offset: Offset, radius: number) {
    const width = 2 * radius;
    const height = Math.sqrt(3) * radius;

    super(
      {left: offset.left, top: offset.top + height / 2}, // Left corner
      {left: offset.left + width / 4, top: offset.top}, // Top left corner
      {left: offset.left + width - width / 4, top: offset.top}, // Top right corner
      {left: offset.left + width, top: offset.top + height / 2}, // Right corner
      {left: offset.left + width - width / 4, top: offset.top + height}, // Bottom right corner
      {left: offset.left + width / 4, top: offset.top + height}, // Bottom left corner
    );

    this.radius = radius;
  }

  get center(): Offset {
    return {left: this.offset.left + this.size.width / 2, top: this.offset.top + this.size.height / 2};
  }
}

export class Arch extends Shape {
  startPoint: Offset
  controlPoint: Offset
  endPoint: Offset

  constructor(startPoint: Offset, endPoint: Offset, controlPoint: Offset) {
    super({left: 0, top: 0}, {width: 0, height: 0});

    this.startPoint = startPoint;
    this.controlPoint = controlPoint;
    this.endPoint = endPoint;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.moveTo(this.startPoint.left, this.startPoint.top);
    ctx.bezierCurveTo(this.controlPoint.left, this.controlPoint.top, this.endPoint.left, this.endPoint.top, this.endPoint.left, this.endPoint.top);
  }
}

export class Circle extends Shape {
  radius: number

  constructor(offset: Offset, radius: number) {
    super(offset, {width: 2 * radius, height: 2 * radius});
    this.radius = radius;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.arc(this.offset.left, this.offset.top, this.radius, 0, 2 * Math.PI);
  }
}
