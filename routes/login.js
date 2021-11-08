import express from "express";
import { selectSql } from "../database/sql";
// insert, select와 관련된 쿼리 함수를 import

const router = express.Router();
//express내 router 함수를 사용

// 라이터 이후 원하는 uri 경로를 받을 수 있게함
router.get('/',(req, res) => {
   res.render('login');
});

router.post('/',async(req, res) => {  
    const vars = req.body;
    const users = await selectSql.getUsers();
    let whoAmI = ``   //let 값을 바꿀수 있음. const는 못바꿈
    let checkLogin = false; // 처음에는 로그인 하지않았으므로 false

   // for(let i=0;i<users.length;i++){
   //      if(vars.id === user[i].id && vars.paswword === user[i].password){
   // ;}
   
   users.map((user) => { //login 된 아디리를 확인
       if(vars.id === user.Id && vars.password === user.Password){
           checkLogin = true; // 로그인아이디와 비밀번호가 저장되어있는 user정보와 같을경우 
                               // checkLoing에 true를 저장
           if(vars.id === `admin`){  // vas.id가 admin과 같을경우
               whoAmI = `admin`; // whoaMI 에 admin 저장
           } else { // 그렇지 않다면
               whoAmI = `users`; // whoAmI에 users 저장
           }
       }
   }) //for루프랑 비슷함.
    console.log(`whoAmI : `, whoAmI);

    if(checkLogin && whoAmI === `admin`){ // CheckLogin후 whoAmI가 admin이라면
        res.redirect(`/delete`);  // home/delete로 넘겨줌
    } else if(checkLogin && whoAmI === `users`){ // CheckLogin후 whoAmI가 users이라면
         res.redirect(`/select`); // home/select로 넘겨줌
    }else{ // CheckLogin후 whoAmI가 admin과 users가 아니라면
        res.send("<script>alert('로그인 실패.'); location.href='/';</script>")
    }

})

module.exports = router;