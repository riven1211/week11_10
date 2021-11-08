//import를 통하여 사용할 명령어를 실행
//import [직접 정의] from "모듈 이름"
import express from "express";
import logger from "morgan";
import path from "path";

//import 이름 from "현재 파일 기준 경로"
import loginRouter from "../routes/login";
// home
// 현재 week8 > src폴더 내 index.js 여기서 
// ../  -- week8 으로 이동
// ../routes -- week8 > routes 으로 이동
import selectRouter from "../routes/select";
// 선택하는 기능
import deleteRouter from "../routes/delete";
// 삭제하는 기능

const PORT = 3000;
// 3000port 사용 (변하지않음)
const app = express();
// app.use는 global middleware를 만들수 있게함.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')
// 어떤 파일 (hbs)를 페이지 내에서 view할 것인가. (보여지는 부분)

app.use(logger("dev"));
// logger를 사용할 것이다.

app.use('/', loginRouter);
// /즉 홈 화면,
app.use('/select', selectRouter);
// /select입력시 selectRouter 함수로 넘겨줌
app.use('/delete', deleteRouter);

 app.listen(PORT, () => {
     console.log(`Example app listening at http://localhost:${PORT}`)
 }) 
 // listen을 통하여 서버를 실행, Router 선언이 끝 난후!