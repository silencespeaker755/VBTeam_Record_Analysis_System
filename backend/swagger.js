import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0", // by default: "1.0.0"
    title: "VBTeam_Record_Analysis_System API_DOC", // by default: ""
    description: "API_DOC for VBTeam_Record_Analysis_System", // by default: ""
  },
  host: "localhost:5000", // by default: "localhost:3000"
  basePath: "", // by default: "/"
  schemes: [], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    {
      name: "User",
      description: "使用者 router",
    },
    {
      name: "Home",
      description: "首頁 router",
    },
    {
      name: "Practice",
      description: "練習頁 router",
    },
    {
      name: "Match",
      description: "比賽頁 router",
    },
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {
    User: {
      $_id: "60d2cbeb9a8b913f2ef10193",
      $name: "謝心默",
      $email: "monofika@gmail.com",
      $password: "$jdaspfipjorlnfjdsod3r3vc",
    },
    Event: {
      $_id: "60d0b2011e44bec4e4be3a52",
      $start: "2021-06-21T18:00:00",
      end: "2021-06-21T20:00:00",
      $title: "練球",
      $place: "場一",
      attendance: ["60d2cbeb9a8b913f2ef10193"],
      notes: "早點到！",
    },
    Events: [
      {
        $_id: "60d0b2011e44bec4e4be3a52",
        $start: "2021-06-21T18:00:00",
        end: "2021-06-21T20:00:00",
        $title: "練球",
        $place: "場一",
        attendance: ["60d2cbeb9a8b913f2ef10193"],
        notes: "早點到！",
      },
    ],
    CreateEvent: {
      $event: {
        $start: "2021-06-21T18:00:00",
        end: "2021-06-21T20:00:00",
        $title: "練球",
        $place: "場一",
        notes: "早點到！",
      },
      $userId: "60d2cbeb9a8b913f2ef10193",
    },
    UpdateEvent: {
      $event: {
        $_id: "60d0b2011e44bec4e4be3a52",
        $start: "2021-06-21T18:00:00",
        end: "2021-06-21T20:00:00",
        $title: "練球",
        $place: "場一",
        notes: "早點到！",
      },
      $userId: "60d2cbeb9a8b913f2ef10193",
    },
    Video: {
      $_id: "0d0b2011e44bec4e4be3a52",
      $url: "https://www.youtube.com/watch?v=nqdCDPOHej8&ab_channel=VolleyballWorld",
      $title: "6/24 練球影片",
      description: "猛！！！",
      $uploader: "60d2cbeb9a8b913f2ef10193",
      $uploadTime: "2021-06-22T03:12:54",
    },
    Article: {
      $_id: "0d0b2011e44bec4e4be3a52",
      $title: "6/24 練球筆記",
      $content: "腳動起來！",
      $uploader: "60d2cbeb9a8b913f2ef10193",
      $uploadTime: "2021-06-23T22:15:55",
    },
    UploadPost: {
      $post: {
        $title: "6/24 練球筆記",
        $content: "腳動起來！",
        $uploadTime: "2021-06-23T22:15:55",
      },
      $userId: "60d2cbeb9a8b913f2ef10193",
    },
    UpdatePost: {
      $post: {
        $_id: "60d619a8840ea7a2a66d43a3",
        $title: "~~~~~~~6/24 練球筆記",
        $content: "~~~~~~~腳動起來！",
        $uploadTime: "2021-06-23T22:15:55",
      },
      $userId: "60d2cbeb9a8b913f2ef10193",
    },
    Posts: [{ $ref: "#/definitions/Article" }],
    Record: {
      $_id: "60d619a88da34eda2a6ebc41",
      $type: "2020大資盃",
      $team: "台大資工",
      $opponent: "淡江資工",
      $date: "2020-09-24",
      sets: [],
    },
    Records: [{ $ref: "#/definitions/Record" }],
    CreateRecord: {
      $record: {
        $type: "2020大資盃",
        $team: "台大資工",
        $opponent: "淡江資工",
        $date: "2020-09-24",
      },
      $userId: "60d08f760211c9a4925218a0",
    },
    UpdateRecord: {
      $record: {
        $_id: "60d619a88da34eda2a6ebc41",
        $type: "2020大資盃",
        $team: "台大資工",
        $opponent: "淡江資工",
        $date: "2020-09-24",
        sets: [
          {
            _id: "60d619a88da34eda2a6ebc41",
            $number: 1,
            $teamScore: 25,
            $opponentScore: 16,
            data: [
              {
                _id: "60d619a88da34eda2a6ebc41",
                name: "謝心默",
                player: { $ref: "#/definitions/User" },
                passesOrSets: { $good: 1, $ok: 2, $bad: 3 },
                serveReceptions: { $good: 1, $ok: 2, $bad: 3 },
                attacks: { $times: 3, $success: 2, $fail: 1 },
                drops: { $times: 3, $success: 2, $fail: 1 },
                serves: { $times: 3, $ace: 2, $fail: 1 },
                blocks: { $success: 1, $effective: 2, $fail: 3 },
                faults: { $times: 1, $types: ["觸網"] },
                notes: "好強",
              },
            ],
          },
        ],
      },
      $userId: "60d08f760211c9a4925218a0",
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./routes/api/user.js",
  "./routes/api/home/calendar.js",
  "./routes/api/practice/posts.js",
  "./routes/api/match/records.js",
];

swaggerAutogen()(outputFile, endpointsFiles, doc);
