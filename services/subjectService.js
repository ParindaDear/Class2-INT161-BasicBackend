const repo = require('../repositories/subjectRepository');

module.exports = {
    getAllSubjects: function () {
        return repo.getSubjects();
    },
    findById: function (id) {
        subject = repo.getSubject(id);
        if (!subject) {
            throw new Error(404, `Subject not found for ID ${id}`).status = 404;
        }
        return subject;
    },
    addSubject: function(subject) {
        if (newSubject.id===undefined || newSubject===null || newSubject.id===""){
            throw new Error(400, `Bad request, Missing id`).status = 400;
        }
        if (repo.getSubject(newSubject.id)) {
            throw new Error(400, json("Bad Request: Duplicate 'id' field"));

        }
        return repo.addSubject(subject);
    },
    updateSubject: function(id, subject) {},
    removeSubject: function(id) {}
}