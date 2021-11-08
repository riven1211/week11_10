import express from "express";
// express내 Router()를 사용할 것이기 때문에 import 해줌
import { selectSql } from "../database/sql";
// { }는 사용자가 만드는 모듈을 의미

const router = express.Router();
//기본적으로 get함수는 req,res를 가짐
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

module.exports = router;