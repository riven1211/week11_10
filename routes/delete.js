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