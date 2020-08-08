import Polygon, { Point, PointVector } from './index';

interface samplePoint {
  points: Array<Point>;
  anwser: number;
}

const samplePoints: Array<samplePoint> = [
  {
    // Regular Heptagon
    points: [
      { x: 1.2, y: 4.1 },
      { x: 2.8, y: 5.7 },
      { x: 5.1, y: 5.8 },
      { x: 6.7, y: 4.2 },
      { x: 6.8, y: 1.9 },
      { x: 5.2, y: 0.3 },
      { x: 2.9, y: 0.2 },
      { x: 1.3, y: 1.8 },
    ],
    anwser: 25,
  },
  {
    // Regular triangle
    points: [
      { x: 1.0, y: 2.5 },
      { x: 5.1, y: 5.8 },
      { x: 5.9, y: 0.7 },
    ],
    anwser: 12,
  },
  {
    // Concave pentagon
    points: [
      { x: 1.7, y: 4.9 },
      { x: 3.6, y: 2.3 },
      { x: 7.0, y: 2.8 },
      { x: 4.8, y: 0.1 },
      { x: 1.5, y: 1.4 },
    ],
    anwser: 10,
  },
  {
    // Concave hexagon
    points: [
      { x: -6.1, y: -1.4 },
      { x: -4.3, y: 2.5 },
      { x: -1.1, y: 7.6 },
      { x: -1.3, y: 4.9 },
      { x: 3.4, y: 5.1 },
      { x: 1.5, y: 3.2 },
      { x: -6.1, y: -1.4 },
    ],
    anwser: 25,
  },
];

describe('Polygon', () => {
  test('Calculates angle correctly', () => {
    const vec: PointVector = {
      point: { x: 0, y: 0 },
      x: 4.9,
      y: -5.8,
    };
    const poly = new Polygon(samplePoints[0].points);
    const res = poly.calcVecAngle(vec);
    expect(res).toEqual(50);
  });

  test('Has an area', () => {
    const poly = new Polygon(samplePoints[0].points);
    expect(poly.area).toBeDefined();
  });
  describe.each(samplePoints)(
    'Calculates area correctly',
    (samplePoint: samplePoint) => {
      test(`returns ${samplePoint.anwser}`, () => {
        const poly = new Polygon(samplePoint.points);
        expect(poly.area).toEqual(samplePoint.anwser);
      });
    },
  );
  test('Returns -1 when the polygon is not a possible shape', () => {
    const notPossiblePoints = [
      { x: 5.09, y: 5.8 },
      { x: 1.68, y: 4.9 },
      { x: 1.48, y: 1.38 },
      { x: 4.76, y: 0.1 },
      { x: 1.34, y: 3.13 },
    ];
    const poly = new Polygon(notPossiblePoints);
    expect(poly.area).toEqual(-1);
  });
  test('Returns -1 when the polygon intersects itself', () => {
    const otherNotPossiblePoints = [
      { x: 2.49, y: 5.59 },
      { x: 5.09, y: 5.8 },
      { x: 1.03, y: 3.44 },
      { x: 1.81, y: 0.95 },
      { x: 4.23, y: 0.01 },
      { x: 6.16, y: 5.41 },
      { x: 6.86, y: 3.89 },
    ];
    const p2 = new Polygon(otherNotPossiblePoints);
    expect(p2.area).toEqual(-1);
  });
});
