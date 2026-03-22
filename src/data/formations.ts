export const FORMATIONS = [
    {
        "id": 1,
        "name": 433,
        "detail": "A",
        "description": "4-3-3 A"
    },
    {
        "id": 2,
        "name": 433,
        "detail": "B",
        "description": "4-3-3 B"
    },
    {
        "id": 3,
        "name": 451,
        "detail": "A",
        "description": "4-5-1"
    },
    {
        "id": 4,
        "name": 451,
        "detail": "B",
        "description": "4-2-3-1"
    },
    {
        "id": 5,
        "name": 442,
        "detail": "A",
        "description": "4-4-2 A"
    },
    {
        "id": 6,
        "name": 442,
        "detail": "B",
        "description": "4-4-2 B"
    },
    {
        "id": 7,
        "name": 325,
        "detail": "A",
        "description": "3-2-5"
    },
    {
        "id": 8,
        "name": 325,
        "detail": "B",
        "description": "3-2-3-2"
    },
    {
        "id": 9,
        "name": 334,
        "detail": "A",
        "description": "3-3-4 A"
    },
    {
        "id": 10,
        "name": 334,
        "detail": "B",
        "description": "3-3-4 B"
    },
    {
        "id": 11,
        "name": 343,
        "detail": "A",
        "description": "3-4-3 A"
    },
    {
        "id": 12,
        "name": 343,
        "detail": "B",
        "description": "3-4-3 B"
    },
    {
        "id": 13,
        "name": 352,
        "detail": "A",
        "description": "3-3-2-2"
    },
    {
        "id": 14,
        "name": 352,
        "detail": "B",
        "description": "3-5-2"
    },
    {
        "id": 15,
        "name": 424,
        "detail": "A",
        "description": "4-2-4 A"
    },
    {
        "id": 16,
        "name": 424,
        "detail": "B",
        "description": "4-2-4 B"
    },
    {
        "id": 17,
        "name": 523,
        "detail": "A",
        "description": "5-2-3 A"
    },
    {
        "id": 18,
        "name": 523,
        "detail": "B",
        "description": "5-2-3 B"
    },
    {
        "id": 19,
        "name": 532,
        "detail": "A",
        "description": "5-3-2"
    },
    {
        "id": 20,
        "name": 532,
        "detail": "B",
        "description": "5-3-1-1"
    },
    {
        "id": 21,
        "name": 541,
        "detail": "A",
        "description": "5-4-1 A"
    },
    {
        "id": 22,
        "name": 541,
        "detail": "B",
        "description": "5-4-1 B"
    },
    {
        "id": 23,
        "name": 631,
        "detail": "A",
        "description": "6-3-1 A"
    },
    {
        "id": 24,
        "name": 631,
        "detail": "B",
        "description": "6-3-1 B"
    }
]

export type FormationName = typeof FORMATIONS[number]["name"];

export const FormationNames = FORMATIONS.map((f) => f.name);
