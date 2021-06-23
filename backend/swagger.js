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
      $start: "20210621 18:00",
      end: "20210621 20:00",
      $title: "練球",
      $place: "場一",
      attendance: ["60d2cbeb9a8b913f2ef10193"],
      notes: "早點到！",
    },
    CreateEvent: [
      {
        $start: "20210621 18:00",
        end: "20210621 20:00",
        $title: "練球",
        $place: "場一",
        notes: "早點到！",
      },
    ],
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./routes/api/user.js",
  "./routes/api/home/calendar.js",
  "./routes/api/practice.js",
];

swaggerAutogen()(outputFile, endpointsFiles, doc);
