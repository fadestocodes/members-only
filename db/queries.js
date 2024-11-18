const pool = require('./pool');

async function getAllUsernames(){
    const {rows} = await pool.query(`SELECT username FROM members_only`);
    return rows;
};

async function storeData(firstName, lastName, username, password){
    await pool.query(`INSERT INTO members_only (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`, [firstName, lastName, username, password]);
};

async function updateStatus (userId){
    await pool.query(`UPDATE members_only SET membership_status = 'vip' WHERE user_id = $1`, [userId]);
};

async function getUser(username){
    const {rows} = await pool.query(`SELECT * FROM members_only WHERE username = $1 `, [username]);
    return rows;
};

async function addMessage( username, messageContent, userId ){
    await pool.query(`INSERT INTO member_only_messages (username, message_content, date_added, user_id) VALUES ($1,$2,DEFAULT,$3)`, [username, messageContent, userId])
};

async function getAllMessages(){
    const {rows} = await pool.query(`SELECT * FROM member_only_messages`);
    return rows;
}

module.exports = { getAllUsernames, storeData, updateStatus, getUser, addMessage, getAllMessages };