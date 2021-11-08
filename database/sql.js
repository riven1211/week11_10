import mysql from "mysql2";

//데이터베이스 연결
const pool = mysql.createPool(
    // precess.env 사용자의 환경에 포함된 객체를 반환함
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'week10',
        password: '1234',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

// async / await 사용
const promisePool = pool.promise();

// select querys
export const selectSql = {
    getUsers : async()=> {
        //await 사용시, 뒤의 모든 내용 값을 받은 후 실행되는 것이 아닌,
        // await 함수 자체를 반환 해야, 받아오는 메인 함수 쪾에도 await 사용시 효과가 남
        const [rows] = await promisePool.query(`select * from user`);        
        return rows
    },
    getDepartment : async () => {
        const [rows] = await promisePool.query(`select * from department`);  
        return rows
    }, 
    getUniversity : async () => {
        const [rows] = await promisePool.query(`select * from university`);  
        return rows
    }, 
}



// delete query
export const deleteSql ={   
    deleteDepartment : async (data1) => {
        console.log(`deleteSql.deleteDepartment:`,data1.Dnumber);
        const sql_1 = `delete from department where Dnumber = "${data1.Dnumber}" `;
       
        // "&{ 데이터.number}" 를 통하여 값을 불러올수 있음.
        await promisePool.query(sql_1);
    },
    
    deleteUniversity : async (data2) => {
        console.log(`deleteSql.deleteUniversity:`,data2.Univ_number);
        const sql_2 = `delete from University where Univ_number = "${data2.Univ_number}" `;
       
        // "&{ 데이터.number}" 를 통하여 값을 불러올수 있음.
        await promisePool.query(sql_2);
    },
}
