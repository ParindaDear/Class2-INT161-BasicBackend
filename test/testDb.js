const conn = require("../config/pool");

async function getAllSubjects() {
    const [result] = await conn.query('SELECT * FROM subjects');
    console.log(result);
}

async function getSubjectById(id) {
    console.log('Search for id:' + id);
    console.log('------------------------');
    const oneRow = await conn.query('SELECT * FROM subjects WHERE id = ?', [id]);
    console.log(oneRow);
    console.log('------------------------');
    console.log(oneRow[0][0]);
}

async function addSubject(subject) {
    //preparing data to be inserted
    const added = await conn.query("INSERT INTO subjects (subject_code," +
        "subject_title, credit) VALUES (?, ?, ?)",
        [subject.code, subject.title, subject.credit]);
    if (added[0].insertId > 0) {
        console.log("Added successfully");
        console.log(added);
    }
}

async function updateSubject(id, subject) {
    const updated = await conn.query("UPDATE subjects SET subject_code = ?, " +
        "subject_title = ?, credit = ? WHERE id = ?",
        [subject.code, subject.title, subject.credit, id]);
    console.log(updated);
    if (updated[0].affectedRows > 0) {
        console.log("Updated successfully");
    } else {
        console.log("No record updated");
    }
}

async function removeSubject(id) {
    const removed = await conn.query("DELETE FROM subjects WHERE id = ?", [id]);
    console.log(removed);
    if (removed[0].affectedRows > 0) {
        console.log("Removed successfully");
    } else {
        console.log("No record removed");
    }
}

(async () => {
    try {
        await removeSubject(19);
        // await updateSubject(19, {code: 'INT-900', title: 'XXXXXXX', credit: 1});
        // await addSubject({ code: 'INT-909', title: 'SQL for Data Science', credit: 3});
        // await getSubjectById(99);
        // await getAllSubjects();
    } catch (err) {
        console.error(err);
    } finally {
        // If this is a standalone test script, close the pool
        await conn.end();
    }
})();
