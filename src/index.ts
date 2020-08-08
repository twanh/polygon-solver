export interface Point {
  x: number;
  y: number;
}

export interface PointVector {
  point: Point;
  x: number;
  y: number;
}

class Polygon {
  points: Array<Point>;
  constructor(points: Array<Point>) {
    this.points = points;
  }

  calcPointsArea(p1: Point, p2: Point): number {
    const height: number = (p2.y + p1.y) / 2;
    const width: number = p2.x - p1.x;
    return height * width;
  }

  calcVecAngle(vec: PointVector): number {
    const a2 = Math.pow(vec.x, 2);
    const b2 = Math.pow(vec.y, 2);
    // console.log({ a2, b2 });
    const c = Number(Math.sqrt(a2 + b2).toFixed(2));
    // console.log({ c });
    let angle = Math.round(Math.asin(vec.y / c) * (180 / Math.PI));
    if (angle < 0) {
      angle = angle * -1;
    }
    return angle;
  }

  get area(): number {
    // if (this.hasIntersection()) return -1;
    let curPoint: Point;
    const areas: Array<number> = [];
    for (curPoint of this.points) {
      // Check if the current point is inside the polygon and therefor creates an intersection
      // if (this.isPointInside(curPoint)) return -1;
      // if (this.pointInPoly(curPoint)) return -1;
      // Can there be duplicate points?? --> If so, which point do we get back.
      const nextIndx: number = this.points.indexOf(curPoint) + 1;
      let currentArea: number;
      if (nextIndx < this.points.length) {
        const nextPoint: Point = this.points[nextIndx];
        currentArea = this.calcPointsArea(curPoint, nextPoint);
      } else {
        // If all points have been looped-trough we do still need to get the area of the last/first element (line)
        currentArea = this.calcPointsArea(curPoint, this.points[0]);
      }
      areas.push(currentArea);
    }

    const total: number = areas.reduce((a, b) => a + b);

    if (total < 0) return -1;

    return Math.round(total);
  }
}

export default Polygon;
