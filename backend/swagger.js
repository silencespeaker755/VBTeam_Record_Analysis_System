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
    Records: [
      {
        $_id: "60d619a88da34eda2a6ebc41",
        $type: "2020大資盃",
        $team: "台大資工",
        $opponent: "淡江資工",
        $date: "2020-09-24",
      },
    ],
    createRecord: {
      $record: {
        $type: "2020大資盃",
        $team: "台大資工",
        $opponent: "淡江資工",
        $date: "2020-09-24",
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
