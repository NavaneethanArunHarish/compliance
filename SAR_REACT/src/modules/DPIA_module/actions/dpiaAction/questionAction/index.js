import CreateQuestion from './createQuestion';
import getQuestion from './getQuestion';
import updateQuestion from './updateQuestion';
import updateAnswer from './updateAnswer';
import getQuestionById from  './getQuestionById';
import getQuesBySecId from './getQuesBySecId';
import deleteQuestion from './deleteQuestion';
import saveAnswer from './saveAnswer';
import getAnswerByQuesId from './getAnswerByQuesId';
import uploadAnswerAttachment from './uploadAnswerAttachment';
import getAttachment from './getAttachment';
import addNotes from './addNotes';
import getNotes from './getNotes';
import sendMail from './sendMail';
import assignQuestion from './assignQuestion';
import fetchDelegatedQues from './fetchDelegatedQues';

export default{
    CreateQuestion,
    getQuestion,
    updateQuestion,
    updateAnswer,
    deleteQuestion,
    getQuestionById,
    getQuesBySecId,
    saveAnswer,
    getAnswerByQuesId,
    uploadAnswerAttachment,
    getAttachment,
    addNotes,
    getNotes,
    sendMail,
    assignQuestion,
    fetchDelegatedQues
}