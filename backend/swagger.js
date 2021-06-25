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
    // by default: empty Array
    {
      name: "User", // Tag name
      description: "使用者 router", // Tag description
    },
    {
      name: "Home",
      description: "首頁 router",
    },
    // { ... }
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
    Posts: [{ $ref: "#/definitions/Video" }],
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./routes/api/user.js",
  "./routes/api/home/calendar.js",
  "./routes/api/practice.js",
];

swaggerAutogen()(outputFile, endpointsFiles, doc);
