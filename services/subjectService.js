const repo = require('../repositories/subjectRepository');

function validateSubjectBody(body) {
    if (!body || Object.keys(body).length === 0) {
        const err = new Error('Bad Request: empty body');
        err.status = 400;
        throw err;
    }
    const { code, title, credit } = body;
    if (!code || typeof code !== 'string') {
        const err = new Error('Bad Request: subject_code is required');
        err.status = 400;
        throw err;
    }
    if (!title || typeof title !== 'string') {
        const err = new Error('Bad Request: subject title is required');
        err.status = 400;
        throw err;
    }
    if (credit === undefined || credit ===
        null || isNaN(Number(credit))) {
        const err = new Error('Bad Request:credit must be a number');
        err.status = 400;
        throw err;
    }
}

module.exports = {
    getAllSubjects: async function () {
        const subjects = await repo.findAll();
        return subjects;
    },
    getSubjectById: async function (id) {
        const subject = await repo.findById(id);
        if (!subject) {
            const err = new Error(`Subject not found for ID ${id}`);
            err.code = 'NOT_FOUND';
            err.status = 404;
            throw err;
        }
        return subject;
    },
    addSubject: async function (newSubject) {
        validateSubjectBody(newSubject);
        // Enforce unique subject_code handled by DB unique constraint; let error bubble up to controller
        const created = await repo.save(newSubject);
        return created;
    },
    updateSubject: async function (id, subject) {
        validateSubjectBody(subject);
        subject.id = id;
        const updated = await repo.update(subject);
        if (!updated) {
            const err = new Error(`Subject not found for ID ${id}`);
            err.status = 404;
            throw err;
        }
        return updated;
    },
}