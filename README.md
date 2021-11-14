# 2021-02-database

## week10 실습 
*************
## 1. 웹에서 select, delete 명령어 사용

## 2. 라우터 구성 
+ **'/' : 홈 화면 (로그인화면)** <br/>
+    '/select' : 조회 화면 <br/>
+    '/delete' : 데이터 삭제 회면 <br/>

## 3. week10내 임의 테이블 생성
> mysql 상에서 department, university, user 테이블 생성
    
**<span style="color:red">PK : 빨간색</span><br/>**

 **1) Department 테이블**
dname|<span style="color:red">dnumber</span>|
---|---|
전기공학과|<span style="color:red">1</span>|
전자공학과|<span style="color:red">2</span>|
정보통신공학과|<span style="color:red">3</span>|
컴퓨터공학과|<span style="color:red">4</span>|

 **2) University 테이블**
Univ_name|<span style="color:red">Univ_number</span>|
---|---|
인하대학교|<span style="color:red">10</span>|
국민대학교|<span style="color:red">20</span>|
한양대학교|<span style="color:red">30</span>|
고려대학교|<span style="color:red">40</span>|

 **3) User 테이블**
<span style="color:red">Idr</span>|Password|Role|
---|---|---|
<span style="color:red">admin</span>|admin1234|admin
<span style="color:red">test</span>|test1234|test

 

## 4. Select 기능 구현
>**week10/routes/select.js**
<pre>
<code>
router.get('/', async function(req, res){
    const department = await selectSql.getDepartment();
    const university = await selectSql.getUniversity();


    res.render('select',{
        title : 'IT 공대',
        title2 : '대학교 이름',
        department,
        university
    });
});
</code>
</pre>


## 5. Delete 기능 구현
>**week10/routes/delete.js**
<pre>
<code>
import express from "express";
import { selectSql, deleteSql} from "../database/sql";

const router = express.Router();

//기존 입력 값 블러오기 
// async await 함수는 자체적으로 promise 반환
router.get('/', async (req, res) => {
    const department = await selectSql.getDepartment();
    const university = await selectSql.getUniversity();

    res.render('delete',{
        title: "학과 List",
        title2: "대학교 List",
        department,
        university
    });
});


router.post('/', async (req, res) =>{
    console.log('delete router:',req.body.delBtn);
    const data1 = {
        Dnumber: req.body.delBtn,         
    }
    await deleteSql.deleteDepartment(data1); 

    const data2 = {        
        Univ_number: req.body.delBtn,  
    }
    await deleteSql.deleteUniversity(data2); 

    res.redirect('/delete');  //다이렉트할 주소와 응답을 함께보낸다.
}); 


module.exports = router;
</code>
</pre>

****
## 추가) sql.js파일에서 delete query의 where문 수정
>**week10/database/sql.js**
<pre>
<code>
import express from "express";
import { selectSql, deleteSql} from "../database/sql";

const router = express.Router();

//기존 입력 값 블러오기 
// async await 함수는 자체적으로 promise 반환
router.get('/', async (req, res) => {
    const department = await selectSql.getDepartment();
    const university = await selectSql.getUniversity();

    res.render('delete',{
        title: "학과 List",
        title2: "대학교 List",
        department,
        university
    });
});

<span style="color:red">
router.post('/', async (req, res) =>{
    console.log('delete router:',req.body.delBtn);
    const data1 = {
        Dnumber: req.body.delBtn,         
    }
    await deleteSql.deleteDepartment(data1); 

    const data2 = {        
        Univ_number: req.body.delBtn,  
    }
    await deleteSql.deleteUniversity(data2); 

    res.redirect('/delete');  //다이렉트할 주소와 응답을 함께보낸다.
}); 
</span>

module.exports = router;
</code>
</pre>


