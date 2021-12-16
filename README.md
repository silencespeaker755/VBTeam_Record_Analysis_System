# [109-2] Web Programming Final

## (Group 25) VolleyballClubHouse 系排維護系統

#### 一個提供給系排球隊紀錄球隊練習&比賽狀況的網站，支援使用者註冊、認證，紀錄練球時間、選擇是否參與，和上傳文章、影片、分析比賽數據等功能。

### 分工

- 前端：劉宇超
  sign in&up, Match, Practice, Detail, Profile, Analysis 前端頁面、串接 API
- 後端：謝心默
  Set up backend structure & implement most of the APIs with connection to DB
- 全端：洪佳生
  sign in&up connection, authentication page, eamil system, calendar, user list, my records, records, table, pages loading prepcocessing, log out, all modals and some api in backend.

### 程式架構

![](https://i.imgur.com/9llP0qw.png)

### 頁面架構

![](https://i.imgur.com/rkbOg6A.png)

### 功能

#### 註冊/登入

- 註冊：錯誤提示 Email has been used
- 驗證：寄驗證碼至信箱
- 登入：錯誤提示 User not exit,Wrong password
- 在未驗證或登入情況下會跳轉回對應頁面

#### Menu Bar

- 左上角 search 能在 home 首頁輸入日期後跳轉至相應的日期

#### 上傳練球影片&筆記

- posts 切換影片、文章、所有
- post 只有本人才能修改、刪除
- 在 posts 對該篇 post 點擊 more 能夠進入該 post 的 detail
- 在 detail 能夠刪除、修改內容，右邊列表點擊後能跳轉到其他 post 的詳細頁面

#### 練球行事曆(Admin) & 標示練球是否會到

- Admin 能夠新增、刪除事件
- 新增事件後 會出現一枝筆 點擊後能簽到 再次點擊會取消簽到
- 點擊日期格上的事件會跳出事件詳細資訊 事件的 note 會標註開始、結束的時間、地點、參加成員
- 右上的工具列可以切換日、週、月
- 左上的工具列可以根據右上工具的時間單位進行顯示時間的增減

#### UserList

- 能夠在此搜尋、查看所有成員清單
- 點擊能夠查看該名成員的 profile
- Admin 能在此將其他 User 設為 Admin

#### Profile

- 只有本人能夠修改
- 能夠修改名字、生日、位置、背號、自我介紹

#### Match

- 會出現兩個 buttons 分別導向 Records 或 Analysis

#### Records

- Admin 能在此新增比賽 (點擊右下的按鈕)
- 進入該比賽後能夠編輯該場比賽的數據 table (點擊右下按鈕)
- 接著根據介面可以新增 table row、刪除 table、更新 table
- 快速點擊兩下任意 row 的背號欄位可以將底下的新增改為刪除 此時點擊會刪除該 row

#### My Records (Only for admin)

- Admin 能在此檢視自己上傳的比賽數據
- Admin 也可以在此新增比賽 (點擊右下的按鈕) 同上
- 並且只有在這裡才能刪除自己上傳的比賽數據

#### Analysis

- 能夠選擇隊伍分析他的場數局數的勝敗
- 右下的按鈕會顯示已記錄的球員數據

#### 通知(小鈴鐺)

- 若有其他用戶上傳文章、影片、新增事件、數據，會在下次登入時顯示上傳者以及上傳時間
- 點擊後會列出事件點擊該事件能夠跳轉至相應的文章、影片、數據
- 按下 clear 會將歷史的通知都刪除

### 使用

- 創帳號後一開始都是無 Admin，localhost 端測試
  =>需要去 mongoDB 手動將帳號的 isAdmin 改成 true
- 我們提供 depoly 的 Admin 帳戶
  =>
       帳號: admin@gmail.com
       密碼: admin

P.S. >> 會這樣是因為我們認為在 client 端不應該有一個方法可以讓自己成為 admin，因此我們假設一開始這個系統在發佈時就存在 Admin 了

- 上傳影片的部分必須去 youtube 影片下面點擊分享-鑲嵌，將 youtube embed 網址貼上，否則影片無法正常顯示
  ![](https://i.imgur.com/w5op7En.png)

### Routes

- 首頁(登入頁面) `/`
- 行事曆(主頁面) `/home`
  - 個人頁面 `/home/{username}-{userid}`
    - 個人資料 `/api/user/users/{userId}`
  - 練球頁面 `/home/practice`
    - 上傳練習影片&文章 `/home/practice/uploads`
  - 比賽頁面 `/home/game`
    - 比賽數據頁面 `/home/match/analysis`
    - 比賽影片頁面 `/home/match/videos` - 上傳比賽影片&文章 `/home/match/video/uploads`

### APIs

> [name=謝心默] 參考 localhost:5000/api-doc/

### Github

- https://github.com/silencespeaker755/VBTeam_Record_Analysis_System.git
- momo1106github
- sabalone87

### References

- [https://www.facebook.com/groups/NTURicWebProg](https://www.facebook.com/groups/NTURicWebProg/permalink/1316934498654467/)
- https://www.youtube.com/watch?v=V39sOBvUUBg&ab_channel=%E6%A5%8A%E7%B5%9C%E9%9B%AF
- FullCalendar https://fullcalendar.io/
- Facebook Group API https://developers.facebook.com/docs/groups-api/common-uses?locale=zh_TW
- bcrypt https://ithelp.ithome.com.tw/articles/10196477
- https://softwareontheroad.com/ideal-nodejs-project-structure/#service

### Facebook Post

#### [109-2] Web Programming Final

##### (Group 25) VolleyballClubHouse

- Demo 影片連結
- 描述這個服務在做什麼
  - 一個提供給系排球隊紀錄球隊練習&比賽狀況的網站，支援使用者註冊、認證，紀錄練球時間、選擇是否參與，和上傳文章、影片、比賽紀錄表等功能。
- Deployed 連結 不公開
- 使用/操作方式 (含伺服器端以及使用者端)
- 使用與參考之框架/模組/原始碼
  - Frontend
    - react.js, jquery, material-ui, react-query, axios, moment, immer, react-table, eslint
  - Backend
    - node.js, express, dotenv, nodemon, mongoose
  - Database
    - mongoDB
- 使用之第三方套件、框架、程式碼
  - Frontend
    - fullcalendar
  - Backend
    - bcyrpt, swagger, nodemailer, crypto
- 專題製作心得
  - 謝心默: 這學期最認真修的一門課，整個學期花了超多時間在作業上，總算是對前後端有稍微的瞭解了，真心覺得架網站是一件有趣但累人的事情。這次專題我主要負責後端的部分，也藉此學到了如何規劃 api 的架構，並體會到有些地方沒有跟前端好好溝通的後果。除此之外，在 databse 的部分踩了幾個雷也讓我對 mongoDB 有了更進一步的認識。我們這組開始動工的時間有點晚，大家最後幾天都是沒日沒夜的刻。因為自己同時還有另一份 final project 在進行，沒有辦法把所有時間都畫在這個 project 上面，因此非常感謝前端的兩位幫忙打理好頁面的呈現和弄好 deployment。雖然偶爾還是有意見不合的時候，但很高興最後有成功弄出一個滿完整的成品。
  - 劉宇超: 在這次專案中我負責前端的部分，React.js 我從這門課才第一次接觸到，從一開始連 Todo List 都要做好幾個小時到現在已經能與組員合作完成一個專案了。在這次專案裡，做了一些以前從沒有做過的前端功能像小鈴鐺等，剛開始串 API 也是什麼都不會，很感謝我的組員耐心的教導我，做到後面已經十分熟練，而建了很多前端頁面之後對 React.js 有了更深刻的了解，在最後一周我幾乎每天做 8 小時以上，也體會到爆肝的生活，最後做出成品，自己使用的那一刻是最感動的。
  - 洪佳生：在這次專案中我每個部分都有參與，由於 project 開始時間較晚的關係，在組員不在的時候為了避免進度趕不上我會負責把那部分補起來，以前就寫過很多 react 了，在這次的 project 中，我覺得學到最多的地方是 Deploy，其他沒什麼新知識，也謝謝組員在各個細節上不斷的要求以及大家的配合，雖然組員可能有時候時間無法配合，但也不會因此就擺出隨便的態度，依然積極尋求改進，也謝謝這次 project 讓我有機會練習到 Deploy 並學習相關知識。
